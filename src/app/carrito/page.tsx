"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Lock,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Figura Naruto Uzumaki Sage Mode",
      price: 89.99,
      quantity: 1,
      image: "/img/featured/img1.jpg",
      category: "Figuras",
      inStock: true,
    },
    {
      id: 2,
      name: "Manga Attack on Titan Vol. 1-10",
      price: 149.99,
      quantity: 1,
      image: "/img/featured/img2.jpg",
      category: "Mangas",
      inStock: true,
    },
    {
      id: 3,
      name: "Hoodie Dragon Ball Z Goku",
      price: 59.99,
      quantity: 2,
      image: "/img/featured/img3.jpg",
      category: "Ropa",
      inStock: false,
    },
  ]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  // Simulamos que el usuario no está logueado
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Mouse Follower Effect */}
        <div
          className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        <Header />

        <div className="container mx-auto px-4 py-16">
          <div
            className={`max-w-md mx-auto text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-purple-500/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-purple-300" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                Inicia Sesión para Ver tu Carrito
              </h2>

              <p className="text-gray-300 mb-8">
                Para acceder a tu carrito de compras y realizar pedidos,
                necesitas iniciar sesión en tu cuenta.
              </p>

              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-400/50 text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/registro">Crear Cuenta Nueva</Link>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-500/20">
                <Button
                  asChild
                  variant="ghost"
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                >
                  <Link href="/tienda">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continuar Comprando
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 & Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Effect */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <Header />

      {/* Header Section */}
      <section className="relative py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/30 to-pink-900/50"></div>
        <div className="container mx-auto px-4 relative">
          <div
            className={`flex items-center gap-4 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
            >
              <Link href="/tienda">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuar Comprando
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
                  Carrito de Compras
                </span>
              </h1>
              <p className="text-gray-300">
                {cartItems.length} productos en tu carrito
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {cartItems.length === 0 ? (
          <div
            className={`text-center py-16 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-300 mb-8">
              ¡Descubre nuestros increíbles productos anime y llena tu carrito!
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <Link href="/tienda">
                <Sparkles className="mr-2 h-5 w-5" />
                Explorar Productos
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div
              className={`lg:col-span-2 space-y-4 animate-fade-in-up delay-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <ShoppingBag className="h-5 w-5 text-purple-300" />
                    Productos en tu Carrito
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex gap-4 p-4 border rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-400/30 group hover:shadow-xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <Badge
                              variant="destructive"
                              className="text-xs bg-red-500 hover:bg-red-600"
                            >
                              Sin Stock
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-white group-hover:text-purple-200 transition-colors duration-300">
                              {item.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="text-xs mt-1 bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 || !item.inStock}
                              className="border-purple-400/50 text-black hover:text-white hover:bg-purple-500/20 hover:border-purple-400"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              className="w-20 text-center bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400"
                              disabled={!item.inStock}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={!item.inStock}
                              className="border-purple-400/50 text-black hover:text-white hover:bg-purple-500/20 hover:border-purple-400"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              S/ {(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              S/ {item.price.toFixed(2)} c/u
                            </div>
                          </div>
                        </div>

                        {!item.inStock && (
                          <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-sm text-red-300">
                            Este producto no está disponible temporalmente
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div
              className={`space-y-6 animate-fade-in-up delay-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white">
                    Resumen del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartItems.length} productos)</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Envío</span>
                    <span
                      className={
                        shipping === 0 ? "text-green-400 font-semibold" : ""
                      }
                    >
                      {shipping === 0 ? "GRATIS" : `S/ ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-gray-300 bg-purple-500/20 p-3 rounded-lg border border-purple-500/30">
                      ✨ Envío gratis en compras mayores a S/ 100
                    </div>
                  )}

                  <Separator className="bg-purple-500/30" />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    disabled={cartItems.some((item) => !item.inStock)}
                  >
                    <Link href="/pago">
                      <Lock className="h-4 w-4 mr-2" />
                      Proceder al Pago
                    </Link>
                  </Button>

                  {cartItems.some((item) => !item.inStock) && (
                    <p className="text-sm text-red-400 text-center">
                      Algunos productos no están disponibles
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Lock className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-semibold text-white">
                        Compra Segura
                      </div>
                      <div>Tus datos están protegidos con encriptación SSL</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
