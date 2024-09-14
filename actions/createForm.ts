import { CoinData } from "@/actionTypings/createForm";
import axios from "@/shared/axios";

export const coinDataList = async () => {
  const response = await axios<CoinData[]>({
    url: "https://shunk-service-production.up.railway.app/tokens",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    method: "GET",
  });

  return response.data;
};
