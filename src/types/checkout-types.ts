export interface PersonalInfo {
  firstName: string
  lastName: string
  dni: string
  email: string
  phone: string
  address: string
  department: string
  province: string
  district: string
  postalCode: string
}

export type PaymentMethod = "card" | "yape"

export interface CardInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  cardType: string
}

export interface YapeInfo {
  phoneNumber: string
  otpCode: string
}
