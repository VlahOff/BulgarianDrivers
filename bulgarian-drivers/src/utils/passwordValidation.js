export const validatePassword = (password) => {
  const emailReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return emailReg.test(password.trim());
};