"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CreditCard,  
  Shield,
  CheckCircle,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PagoPage() {
  const [paymentMethod, setPaymentMethod] = useState("yape");
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    phoneNumber: "",
  });
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

  const cartItems = [
    {
      id: 1,
      name: "Figura Naruto Uzumaki Sage Mode",
      price: 89.99,
      quantity: 1,
      image: "/img/featured/img1.jpg",
    },
    {
      id: 2,
      name: "Manga Attack on Titan Vol. 1-10",
      price: 149.99,
      quantity: 1,
      image: "/img/featured/img2.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
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
            className={`max-w-2xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-purple-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                ¡Pedido Confirmado!
              </h1>

              <p className="text-gray-300 mb-6">
                Tu pedido ha sido procesado exitosamente. Recibirás un correo de
                confirmación con los detalles del seguimiento.
              </p>

              <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-purple-500/20">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <span className="text-gray-500">Número de Pedido:</span>
                    <div className="font-semibold text-white">
                      #AH-2024-001234
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Pagado:</span>
                    <div className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      S/ {total.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Método de Pago:</span>
                    <div className="font-semibold text-white capitalize">
                      {paymentMethod}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Tiempo de Entrega:</span>
                    <div className="font-semibold text-white">
                      3-5 días hábiles
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Link href="/mis-pedidos">Ver Estado del Pedido</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-400/50 bg- text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/tienda">Continuar Comprando</Link>
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

      {/* Header Section */}
      <section className="relative py-6">
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
              <Link href="/carrito">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Carrito
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
                  Finalizar Compra
                </span>
              </h1>
              <p className="text-gray-300">
                Completa tu pedido de forma segura
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div
            className={`lg:col-span-2 space-y-6 animate-fade-in-up delay-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5 text-purple-300" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        Nombre *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Apellido *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Correo Electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Teléfono *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="999 999 999"
                        className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Dirección Completa *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Av. Principal 123, Dpto. 456"
                      className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">
                        Ciudad *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, city: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-800/50 text-white border-purple-400/30">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                          <SelectItem value="lima">Lima</SelectItem>
                          <SelectItem value="arequipa">Arequipa</SelectItem>
                          <SelectItem value="cusco">Cusco</SelectItem>
                          <SelectItem value="trujillo">Trujillo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-white">
                        Distrito *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, district: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-800/50 text-white border-purple-400/30">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                          <SelectItem value="miraflores">Miraflores</SelectItem>
                          <SelectItem value="san-isidro">San Isidro</SelectItem>
                          <SelectItem value="surco">Surco</SelectItem>
                          <SelectItem value="la-molina">La Molina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-white">
                        Código Postal
                      </Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value,
                          })
                        }
                        placeholder="15001"
                        className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CreditCard className="h-5 w-5 text-purple-300" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg bg-slate-800/80 border-purple-400/30 group hover:shadow-xl transition-all duration-300">
                      <RadioGroupItem
                        value="yape"
                        id="yape"
                        className="text-purple-400"
                      />
                      <Label
                        htmlFor="yape"
                        className="flex items-center gap-3 cursor-pointer flex-1 text-white group-hover:text-purple-200"
                      >
                        <div className="w-8 h-8 bg-purple-900 rounded flex items-center justify-center">
                          <Image
                            src="/img/logo/yape.jpg"
                            alt="Yape"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">Yape</div>
                          <div className="text-sm text-gray-300">
                            Pago instantáneo con tu celular
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg bg-slate-800/80 border-purple-400/30 group hover:shadow-xl transition-all duration-300">
                      <RadioGroupItem
                        value="plin"
                        id="plin"
                        className="text-purple-400"
                      />
                      <Label
                        htmlFor="plin"
                        className="flex items-center gap-3 cursor-pointer flex-1 text-white group-hover:text-purple-200"
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <Image
                            src="/img/logo/plin.png"
                            alt="Plin"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">Plin</div>
                          <div className="text-sm text-gray-300">
                            Transferencia inmediata
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg bg-slate-800/80 border-purple-400/30 group hover:shadow-xl transition-all duration-300">
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="text-purple-400"
                      />
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-3 cursor-pointer flex-1 text-white group-hover:text-purple-200"
                      >
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                          <Image
                            src="/img/logo/tarjeta.jpg"
                            alt="Tarjeta de Crédito/Débito"
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">
                            Tarjeta de Crédito/Débito
                          </div>
                          <div className="text-sm text-gray-300">
                            Visa, Mastercard - Procesado por Mercado Pago
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Payment Details */}
                  {(paymentMethod === "yape" || paymentMethod === "plin") && (
                    <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg border border-purple-500/20">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-white">
                          Número de Celular *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
                          <Input
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phoneNumber: e.target.value,
                              })
                            }
                            placeholder="999 999 999"
                            className="pl-10 bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 bg-purple-500/20 p-3 rounded border border-purple-500/30">
                        <strong>Instrucciones:</strong>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>
                            Abre tu app de{" "}
                            {paymentMethod === "yape" ? "Yape" : "Plin"}
                          </li>
                          <li>Escanea el código QR que aparecerá</li>
                          <li>Confirma el pago por S/ {total.toFixed(2)}</li>
                          <li>Toma captura del comprobante</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg border border-purple-500/20">
                      <div className="space-y-2">
                        <Label htmlFor="cardName" className="text-white">
                          Nombre en la Tarjeta *
                        </Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardName: e.target.value,
                            })
                          }
                          placeholder="Como aparece en tu tarjeta"
                          className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-white">
                          Número de Tarjeta *
                        </Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardNumber: e.target.value,
                            })
                          }
                          placeholder="1234 5678 9012 3456"
                          className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate" className="text-white">
                            Fecha de Vencimiento *
                          </Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                expiryDate: e.target.value,
                              })
                            }
                            placeholder="MM/AA"
                            className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-white">
                            CVV *
                          </Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) =>
                              setFormData({ ...formData, cvv: e.target.value })
                            }
                            placeholder="123"
                            className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Shield className="h-4 w-4 text-green-400" />
                        Procesado de forma segura por Mercado Pago
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Confirmar Pedido - S/ {total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div
            className={`space-y-6 animate-fade-in-up delay-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-white">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-3 group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-purple-600 to-pink-600">
                        {item.quantity}
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2 text-white group-hover:text-purple-200 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                        S/ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator className="bg-purple-500/30" />

                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>S/ {shipping.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-purple-500/30" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="font-medium">Compra 100% Segura</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1">
                    <p>• Encriptación SSL de 256 bits</p>
                    <p>• Datos protegidos según PCI DSS</p>
                    <p>• Garantía de devolución de dinero</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
