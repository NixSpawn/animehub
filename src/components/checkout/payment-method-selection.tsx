"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { PaymentMethod } from "@/types/checkout-types"

interface PaymentMethodSelectionProps {
  selectedMethod: PaymentMethod
  onSelect: (method: PaymentMethod) => void
  onBack: () => void
}

export function PaymentMethodSelection({ selectedMethod, onSelect, onBack }: PaymentMethodSelectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSelect(selectedMethod)
  }

  return (
    <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <CreditCard className="h-5 w-5 text-purple-300" />
          Método de Pago
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup value={selectedMethod} onValueChange={(value) => onSelect(value as PaymentMethod)}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg bg-slate-800/80 border-purple-400/30 group hover:shadow-xl transition-all duration-300">
              <RadioGroupItem value="yape" id="yape" className="text-purple-400" />
              <Label
                htmlFor="yape"
                className="flex items-center gap-3 cursor-pointer flex-1 text-white group-hover:text-purple-200"
              >
                <div className="w-8 h-8 bg-purple-900 rounded flex items-center justify-center">
                  <Image src="/img/logo/yape.jpg" alt="Yape" width={40} height={40} className="object-contain" />
                </div>
                <div>
                  <div className="font-semibold">Yape</div>
                  <div className="text-sm text-gray-300">Pago instantáneo con tu celular</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg bg-slate-800/80 border-purple-400/30 group hover:shadow-xl transition-all duration-300">
              <RadioGroupItem value="card" id="card" className="text-purple-400" />
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
                  <div className="font-semibold">Tarjeta de Crédito/Débito</div>
                  <div className="text-sm text-gray-300">Visa, Mastercard, American Express</div>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-purple-400/50 text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Continuar
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
