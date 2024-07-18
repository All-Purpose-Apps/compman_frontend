export function validatePhoneNumber(phone) {
  const phoneRegex = /^[0-9]{9}$/; // Simple regex for 10 digit phone number
  return phoneRegex.test(phone);
}
