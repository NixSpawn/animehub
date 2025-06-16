"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Lock } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Figura Naruto Uzumaki Sage Mode",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      category: "Figuras",
      inStock: true,
    },
    {
      id: 2,
      name: "Manga Attack on Titan Vol. 1-10",
      price: 149.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      category: "Mangas",
      inStock: true,
    },
    {
      id: 3,
      name: "Hoodie Dragon Ball Z Goku",
      price: 59.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      category: "Ropa",
      inStock: false,
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  // Simulamos que el usuario no está logueado
  const isLoggedIn = true

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-purple-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Inicia Sesión para Ver tu Carrito</h2>

              <p className="text-gray-600 mb-8">
                Para acceder a tu carrito de compras y realizar pedidos, necesitas iniciar sesión en tu cuenta.
              </p>

              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/registro">Crear Cuenta Nueva</Link>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700">
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/tienda">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuar Comprando
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
              <p className="text-gray-600">{cartItems.length} productos en tu carrito</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">¡Descubre nuestros increíbles productos anime y llena tu carrito!</p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/tienda">Explorar Productos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Productos en tu Carrito
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <Badge variant="destructive" className="text-xs">
                              Sin Stock
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || !item.inStock}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-20 text-center"
                              disabled={!item.inStock}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-purple-600">
                              S/ {(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">S/ {item.price.toFixed(2)} c/u</div>
                          </div>
                        </div>

                        {!item.inStock && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
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
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} productos)</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "GRATIS" : `S/ ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      💡 Envío gratis en compras mayores a S/ 100
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">S/ {total.toFixed(2)}</span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={cartItems.some((item) => !item.inStock)}
                  >
                    <Link href="/pago">
                      <Lock className="h-4 w-4 mr-2" />
                      Proceder al Pago
                    </Link>
                  </Button>

                  {cartItems.some((item) => !item.inStock) && (
                    <p className="text-sm text-red-600 text-center">Algunos productos no están disponibles</p>
                  )}
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Lock className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Compra Segura</div>
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
  )
}
