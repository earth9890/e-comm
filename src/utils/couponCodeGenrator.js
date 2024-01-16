export const generateCouponCode = (username, discountAmount) => {
  let couponCode = "";
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let chars = 0; chars < 3; chars++) {
    let index = Math.floor(Math.random() * str.length);
    couponCode += str[index];
  }
  return `${couponCode}${discountAmount}OFF`;
};
