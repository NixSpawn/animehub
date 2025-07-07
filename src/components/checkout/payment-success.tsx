"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { PaymentMethod, PersonalInfo } from "@/types/checkout-types"

interface PaymentSuccessProps {
  personalInfo: PersonalInfo
  paymentMethod: PaymentMethod
  total: number
  orderNumber: string
}

export function PaymentSuccess({ personalInfo, paymentMethod, total, orderNumber }: PaymentSuccessProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {/* Mouse Follower Effect */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="container mx-auto px-4 py-16">
        <div
          className={`max-w-2xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-purple-500/20">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">¡Pago Realizado con Éxito!</h1>
            <p className="text-gray-300 mb-6">
              Tu pago ha sido procesado exitosamente. Recibirás un correo de confirmación con los detalles del pedido.
            </p>
            <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-purple-500/20">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <span className="text-gray-500">Número de Pedido:</span>
                  <div className="font-semibold text-white">#{orderNumber}</div>
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
                    {paymentMethod === "card" ? "Tarjeta" : "Yape"}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Tiempo de Entrega:</span>
                  <div className="font-semibold text-white">3-5 días hábiles</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20">
                <div className="text-left">
                  <span className="text-gray-500">Envío a:</span>
                  <div className="font-semibold text-white">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </div>
                  <div className="text-sm text-gray-300">
                    {personalInfo.address}, {personalInfo.district}, {personalInfo.province}
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
                className="w-full border-purple-400/50 text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Link href="/tienda">Continuar Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
