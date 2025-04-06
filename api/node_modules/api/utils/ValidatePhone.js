function validatePhone(phoneNumber) {
  const phoneRegex = /^(97|98)\d{8}$/;
  return phoneRegex.test(phoneNumber);
}
export default validatePhone;
