function validateName(name) {
  const nameRegex = /^[A-Z a-z]{3,}$/;
  return nameRegex.test(name);
}
export default validateName;
