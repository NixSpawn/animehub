"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, ArrowRight } from "lucide-react"
import { ayacuchoData } from "@/lib/ayacucho-data"
import { PersonalInfo } from "@/types/checkout-types"

interface PersonalInfoFormProps {
  initialData: PersonalInfo
  onSubmit: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ initialData, onSubmit }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialData)
  const [availableProvinces, setAvailableProvinces] = useState<string[]>([])
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])

  const handleDepartmentChange = (department: string) => {
    setFormData({ ...formData, department, province: "", district: "" })
    const provinces = Object.keys(ayacuchoData.provinces)
    setAvailableProvinces(provinces)
    setAvailableDistricts([])
  }

  const handleProvinceChange = (province: string) => {
    setFormData({ ...formData, province, district: "" })
    const districts = ayacuchoData.provinces[province as keyof typeof ayacuchoData.provinces] || []
    setAvailableDistricts(districts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.dni &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.department &&
      formData.province &&
      formData.district
    )
  }

  return (
    <Card className="py-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="h-5 w-5 text-purple-300" />
          Información Personal y de Envío
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                Nombre *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dni" className="text-white">
              DNI *
            </Label>
            <Input
              id="dni"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              placeholder="12345678"
              maxLength={8}
              className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
              required
            />
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Av. Principal 123, Dpto. 456"
              className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-white">
                Departamento *
              </Label>
              <Select onValueChange={handleDepartmentChange} value={formData.department}>
                <SelectTrigger className="bg-slate-800/50 text-white border-purple-400/30">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                  <SelectItem value="ayacucho">Ayacucho</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="province" className="text-white">
                Provincia *
              </Label>
              <Select onValueChange={handleProvinceChange} value={formData.province} disabled={!formData.department}>
                <SelectTrigger className="bg-slate-800/50 text-white border-purple-400/30">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                  {availableProvinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="district" className="text-white">
                Distrito *
              </Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, district: value })}
                value={formData.district}
                disabled={!formData.province}
              >
                <SelectTrigger className="bg-slate-800/50 text-white border-purple-400/30">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                  {availableDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
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
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="05001"
                className="bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar al Método de Pago
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
