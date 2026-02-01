import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Services } from "@/components/layout/Services";
<<<<<<< /Users/ejikeudeze/naija-eazy-pay/frontend/app/page.tsx
=======
import { WhoWeHelp } from "@/components/layout/WhoWeHelp";
>>>>>>> /Users/ejikeudeze/.windsurf/worktrees/naija-eazy-pay/naija-eazy-pay-624eef15/frontend/app/page.tsx
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
<<<<<<< /Users/ejikeudeze/naija-eazy-pay/frontend/app/page.tsx
=======
        <WhoWeHelp />
>>>>>>> /Users/ejikeudeze/.windsurf/worktrees/naija-eazy-pay/naija-eazy-pay-624eef15/frontend/app/page.tsx
      </main>
      <Footer />
    </div>
  );
}
