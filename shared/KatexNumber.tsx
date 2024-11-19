import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

import "@/app/globals.css";

const KatexNumber = ({ price }) => {
  // Convert the price to scientific notation
  const [mantissa, exponent] = price.toExponential().split("e-");
  const significantDigits = mantissa.split(".")[1]?.slice(0, 4); // First 4 digits
  const subscriptValue = parseInt(exponent) - 1; // Adjust for subscript

  // Format as "0.0₇ 1234"
  const formattedPrice = `0.0_{${subscriptValue}}\\ ${significantDigits}`;

  return <InlineMath math={formattedPrice} />;
};

export default KatexNumber;
