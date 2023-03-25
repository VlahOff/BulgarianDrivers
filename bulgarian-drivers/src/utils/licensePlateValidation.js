export const validateLicensePlate = (number) => {
  const licensePlateReg = /^[A-Z]{1,2}[0-9]{4}[A-Z]{2}$/;
  return licensePlateReg.test(number.trim());
};