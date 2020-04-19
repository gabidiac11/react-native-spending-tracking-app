export const filterTextAsNumber = text => {
    const indexOfDot = text.indexOf(".");
    let textNumber = "";
    const nr_reg_expr = /^[0-9]*$/;
    for (let i = 0; i < text.length; i++) {
      if (indexOfDot === i || nr_reg_expr.test(text[i])) {
        textNumber += text[i];
      }
    }
    return textNumber;
};
export const generateFloatNumberAndTextNumber = (text) => {
    const textNumber = filterTextAsNumber(text);
    const indexOfDot = textNumber.indexOf(".");
    let floatNumber = 0;
    if (indexOfDot === 0) {
      floatNumber = Number("0." + textNumber.slice(1, floatNumber.length) || 0);
    } else {
      floatNumber = Number(textNumber || 0);
    }
    return {floatNumber, textNumber};
}
export const reduceNumberMatisse = (number, digits = 2) => {
  let tenth = 1;
  for(let i = 0; i < digits; i++){
    tenth *= 10;
  }
  return Math.floor(number * tenth)/tenth;
}