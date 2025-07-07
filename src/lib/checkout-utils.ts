export function detectCardType(cardNumber: string): string {
  const number = cardNumber.replace(/\s/g, "")

  if (/^4/.test(number)) {
    return "visa"
  } else if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
    return "mastercard"
  } else if (/^3[47]/.test(number)) {
    return "amex"
  }

  return ""
}

export function formatCardNumber(value: string): string {
  const number = value.replace(/\s/g, "")
  const formatted = number.replace(/(.{4})/g, "$1 ")
  return formatted.trim()
}

export function formatExpiryDate(value: string): string {
  const number = value.replace(/\D/g, "")
  if (number.length >= 2) {
    return `${number.slice(0, 2)}/${number.slice(2, 4)}`
  }
  return number
}
