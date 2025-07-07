"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CheckoutHeaderProps {
  currentStep: number
}

export function CheckoutHeader({ currentStep }: CheckoutHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Información Personal"
      case 2:
        return "Método de Pago"
      case 3:
        return "Confirmar Pago"
      default:
        return "Finalizar Compra"
    }
  }

  return (
    <section className="relative py-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/30 to-pink-900/50"></div>
      <div className="container mx-auto px-4 relative">
        <div
          className={`flex items-center gap-4 transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
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
                {getStepTitle()}
              </span>
            </h1>
            <p className="text-gray-300">Paso {currentStep} de 3 - Completa tu pedido de forma segura</p>
          </div>
        </div>
      </div>
    </section>
  )
}
