"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
  inStock: boolean
}

interface OrderSummaryProps {
  cartItems: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

export function OrderSummary({ cartItems, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <>
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
    </>
  )
}
