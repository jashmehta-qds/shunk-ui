import { ContractInfo } from "@/components/CreateForm/CoinList";
import { Item } from "@/components/PercentageDistributor";
import { useEffect, useState } from "react";

const useByobValidation = (
  step: number,
  itemsContent: Item[],
  contractContent: ContractInfo
) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    let valid = false;
    if (contractContent)
      switch (step) {
        case 1:
          valid = !!contractContent.name && !!contractContent.code;
          break;
        case 2:
          const { mngtFees, perfFees, etryFees, exitFees } =
            contractContent?.fees;
          valid =
            mngtFees >= 0 &&
            perfFees >= 0 &&
            etryFees >= 0 &&
            exitFees >= 0 &&
            [mngtFees, perfFees, etryFees, exitFees].every(
              (fee) => typeof fee === "number" && !isNaN(fee)
            );
          break;
        case 3:
          const totalPercentage = itemsContent.reduce(
            (sum, item) => sum + item.percentage,
            0
          );
          valid = totalPercentage === 100;
          break;
        default:
          valid = false;
      }

    setIsValid(valid);
  }, [contractContent, step, itemsContent]);

  return { isValid };
};

export default useByobValidation;
