export default function FormatNumber(num) {
    num = Math.abs(Number(num))
    const billions = num/1.0e+9
    const millions = num/1.0e+6
    const thousands = num/1.0e+3
    return num >= 1.0e+9 && billions >= 100  ? Math.round(billions)  + "B"
         : num >= 1.0e+9 && billions >= 10   ? billions.toFixed(1)   + "B"
         : num >= 1.0e+9                     ? billions.toFixed(2)   + "B"
         : num >= 1.0e+6 && millions >= 100  ? Math.round(millions)  + "M"
         : num >= 1.0e+6 && millions >= 10   ? millions.toFixed(1)   + "M"
         : num >= 1.0e+6                     ? millions.toFixed(2)   + "M"
         : num.toFixed()
  }