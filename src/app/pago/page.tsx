"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PersonalInfoForm } from "@/components/checkout/personal-info-form"
import { PaymentMethodSelection } from "@/components/checkout/payment-method-selection"
import { CardPaymentForm } from "@/components/checkout/card-payment-form"
import { YapePaymentForm } from "@/components/checkout/yape-payment-form"
import { PaymentSuccess } from "@/components/checkout/payment-success"
import { OrderSummary } from "@/components/checkout/order-summary"
import { CheckoutBackground } from "@/components/checkout/checkout-background"
import { CheckoutHeader } from "@/components/checkout/checkout-header"
import { CardInfo, PaymentMethod, PersonalInfo, YapeInfo } from "@/types/checkout-types"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    dni: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    province: "",
    district: "",
    postalCode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    cardType: "",
  })

  const [yapeInfo, setYapeInfo] = useState<YapeInfo>({
    phoneNumber: "",
    otpCode: "",
  })

  const cartItems = [
    {
      id: 1,
      name: "Llavero de Anime",
      price: 0.99,
      quantity: 1,
      image: "/img/featured/img1.jpg",
      category: "Figuras",
      inStock: true,
    },
    {
      id: 2,
      name: "Pegatina goku ssj",
      price: 1.01,
      quantity: 1,
      image: "/img/featured/img5.jpg",
      category: "Mangas",
      inStock: true,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const handlePersonalInfoSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data)
    setCurrentStep(2)
  }

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method)
    setCurrentStep(3)
  }

  const handleCardPaymentSubmit = (data: CardInfo) => {
    setCardInfo(data)
    setCurrentStep(4)
  }

  const handleYapePaymentSubmit = (data: YapeInfo) => {
    setYapeInfo(data)
    setCurrentStep(4)
  }

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm initialData={personalInfo} onSubmit={handlePersonalInfoSubmit} />
      case 2:
        return (
          <PaymentMethodSelection
            selectedMethod={paymentMethod}
            onSelect={handlePaymentMethodSelect}
            onBack={handleBackStep}
          />
        )
      case 3:
        return paymentMethod === "card" ? (
          <CardPaymentForm
            initialData={cardInfo}
            onSubmit={handleCardPaymentSubmit}
            onBack={handleBackStep}
            total={total}
          />
        ) : (
          <YapePaymentForm
            initialData={yapeInfo}
            onSubmit={handleYapePaymentSubmit}
            onBack={handleBackStep}
            total={total}
          />
        )
      case 4:
        return (
          <PaymentSuccess
            personalInfo={personalInfo}
            paymentMethod={paymentMethod}
            total={total}
            orderNumber="AH-2024-001234"
          />
        )
      default:
        return null
    }
  }

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <CheckoutBackground />
        <Header />
        {renderCurrentStep()}
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <CheckoutBackground />
      <Header />
      <CheckoutHeader currentStep={currentStep} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">{renderCurrentStep()}</div>
          <div className="space-y-6">
            <OrderSummary cartItems={cartItems} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
