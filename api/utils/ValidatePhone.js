function validatePhone(phoneNumber) {
  const phoneRegex = /^(04|08)\d{8}$/;
  return phoneRegex.test(phoneNumber);
}
export default validatePhone;
