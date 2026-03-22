import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from '../users/schemas/user.schema';
import { UserRole } from '../common/enums';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ tokens: TokenPair; user: Partial<UserDocument> }> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      ...dto,
      email: dto.email.toLowerCase(),
      password: hashedPassword,
      role: UserRole.PARENT,
    });

    const tokens = this.generateTokens(user);
    const { password: _, ...userObj } = user.toObject();
    return { tokens, user: userObj };
  }

  async login(dto: LoginDto): Promise<{ tokens: TokenPair; user: Partial<UserDocument> }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.generateTokens(user);
    const { password: _, ...userObj } = user.toObject();
    return { tokens, user: userObj };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET || 'default-secret-change-me',
      });
      const user = await this.usersService.findById(payload.sub);
      const accessToken = this.jwtService.sign(
        { sub: user._id.toString(), role: user.role },
        { expiresIn: 900 },
      );
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(user: UserDocument): TokenPair {
    const payload = { sub: user._id.toString(), role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 900,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: 604800,
    });
    return { accessToken, refreshToken };
  }
}
