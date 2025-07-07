"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, ArrowLeft, Sparkles, Smartphone } from "lucide-react"
import Image from "next/image"
import { YapeInfo } from "@/types/checkout-types"

interface YapePaymentFormProps {
  initialData: YapeInfo
  onSubmit: (data: YapeInfo) => void
  onBack: () => void
  total: number
}

export function YapePaymentForm({ initialData, onSubmit, onBack, total }: YapePaymentFormProps) {
  const [formData, setFormData] = useState<YapeInfo>(initialData)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSubmit(formData)
  }

  const isFormValid = () => {
    return formData.phoneNumber.length === 9 && formData.otpCode.length === 6
  }

  return (
    <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-purple-900 rounded flex items-center justify-center">
            <Image src="/img/logo/yape.jpg" alt="Yape" width={32} height={32} className="object-contain" />
          </div>
          Pago con Yape
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Instrucciones */}
          <div className="text-sm text-gray-300 bg-purple-500/20 p-4 rounded border border-purple-500/30">
            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Instrucciones para pagar:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Abre tu app de Yape</li>
                  <li>Ve a la sección <strong>Código de seguridad</strong> o <strong>OTP</strong> </li>
                  <li>Copia el código temporal de 6 dígitos</li>
                  <li>Ingresa tu número y el código aquí</li>
                  <li>El monto a pagar será S/ {total.toFixed(2)}</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Número de teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-white">
              Número de Celular *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="999999999"
                maxLength={9}
                className="pl-10 bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                required
              />
            </div>
            <p className="text-sm text-gray-300">Ingresa tu número de celular registrado en Yape</p>
          </div>

          {/* Código OTP */}
          <div className="space-y-2">
            <Label htmlFor="otpCode" className="text-white">
              Código de Seguridad (OTP) *
            </Label>
            <Input
              id="otpCode"
              value={formData.otpCode}
              onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
              placeholder="123456"
              maxLength={6}
              className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm text-center text-2xl tracking-widest font-mono"
              required
            />
            <p className="text-sm text-gray-300">Código temporal de 6 dígitos que aparece en tu app de Yape</p>
          </div>

          {/* Información adicional */}
          <div className="text-sm text-blue-300 bg-blue-500/20 p-3 rounded border border-blue-500/30">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Importante:</strong> El código OTP cambia cada cierto tiempo. Asegúrate de usar el código más
                reciente que aparece en tu app de Yape.
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-purple-400/50 text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm bg-transparent"
              disabled={isProcessing}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>Procesando Pago...</>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Confirmar Pago S/ {total.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
