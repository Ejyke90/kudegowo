'use client';

import { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Calendar, 
  ShoppingCart,
  Clock,
  AlertCircle,
  Plus,
  Minus,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  isDemoMode,
  getDemoChildren,
  DEMO_WEEKLY_MENU,
  DEMO_MEAL_ORDERS,
} from '@/lib/demo-data';

interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  schoolId: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  allergens: string[];
  available: boolean;
}

interface DayMenu {
  dayOfWeek: number;
  items: MenuItem[];
}

interface MealOrder {
  _id: string;
  childId: string;
  orderDate: string;
  items: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  status: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function MealsPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [menu, setMenu] = useState<DayMenu[]>([]);
  const [orders, setOrders] = useState<MealOrder[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [orderDate, setOrderDate] = useState<Date>(new Date());

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchMenu();
      fetchOrders();
    }
  }, [selectedChild]);

  const fetchChildren = async () => {
    // Use demo data if in demo mode
    if (isDemoMode()) {
      const demoChildren = getDemoChildren().map(c => ({
        _id: c._id,
        firstName: c.firstName,
        lastName: c.lastName,
        schoolId: c.schoolId,
      }));
      setChildren(demoChildren);
      if (demoChildren.length > 0) {
        setSelectedChild(demoChildren[0]._id);
      }
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/children`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setChildren(data.data);
        if (data.data.length > 0) {
          setSelectedChild(data.data[0]._id);
        }
      }
    } catch (error) {
      console.error('Fetch children error:', error);
    }
  };

  const fetchMenu = async () => {
    setIsLoading(true);
    
    // Use demo data if in demo mode
    if (isDemoMode()) {
      setMenu(DEMO_WEEKLY_MENU);
      setIsLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const child = children.find(c => c._id === selectedChild);
      if (!child) return;

      const res = await fetch(`${API_URL}/menus/school/${child.schoolId}/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setMenu(data.data.days || []);
      }
    } catch (error) {
      console.error('Fetch menu error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    // Use demo data if in demo mode
    if (isDemoMode() && selectedChild) {
      setOrders(DEMO_MEAL_ORDERS[selectedChild] || []);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/meal-orders/child/${selectedChild}?limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.status && data.data) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => 
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => 
          i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter(i => i._id !== itemId);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0 || !selectedChild) return;

    try {
      const token = localStorage.getItem('token');
      const child = children.find(c => c._id === selectedChild);
      
      const res = await fetch(`${API_URL}/meal-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          childId: selectedChild,
          schoolId: child?.schoolId,
          orderDate: orderDate.toISOString(),
          items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      
      if (data.status) {
        setCart([]);
        setShowCart(false);
        fetchOrders();
        alert('Order placed successfully!');
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Place order error:', error);
      alert('Failed to place order');
    }
  };

  const dayMenu = menu.find(d => d.dayOfWeek === selectedDay);
  const selectedChildData = children.find(c => c._id === selectedChild);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading && menu.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meal Management</h1>
          <p className="text-gray-600">Pre-order meals and manage dietary preferences</p>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="relative flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <ShoppingCart className="w-5 h-5" />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {children.map(child => (
            <button
              key={child._id}
              onClick={() => setSelectedChild(child._id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedChild === child._id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {child.firstName} {child.lastName}
            </button>
          ))}
        </div>
      )}

      {/* Day Selector */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedDay(prev => (prev === 0 ? 6 : prev - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {DAYS[day]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedDay(prev => (prev === 6 ? 0 : prev + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dayMenu?.items.filter(item => item.available).map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {item.category}
                </span>
              </div>
              
              {item.allergens.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-amber-600 mb-3">
                  <AlertCircle className="w-3 h-3" />
                  <span>Contains: {item.allergens.join(', ')}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-emerald-600">
                  ₦{item.price.toLocaleString()}
                </span>
                
                {cart.find(i => i._id === item._id) ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">
                      {cart.find(i => i._id === item._id)?.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {(!dayMenu || dayMenu.items.length === 0) && (
          <div className="col-span-full bg-white rounded-xl shadow-sm border p-12 text-center">
            <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Menu Available</h3>
            <p className="text-gray-600">No menu items for {DAYS[selectedDay]}</p>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">
                    {new Date(order.orderDate).toLocaleDateString('en-NG', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{order.totalAmount.toLocaleString()}</div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No orders yet</p>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item._id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          ₦{item.price.toLocaleString()} × {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Date
                    </label>
                    <input
                      type="date"
                      value={orderDate.toISOString().split('T')[0]}
                      onChange={(e) => setOrderDate(new Date(e.target.value))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="px-6 py-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">₦{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
