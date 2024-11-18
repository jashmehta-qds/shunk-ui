import axios from "@/shared/axios";
import { ChartResponse, Strategy } from "@/constants/leaderboard";
import { TimeFrame } from "@/shared/DataTable/typings";

export const fetchStrategyDetails = async (id: string) => {
    const response = await axios<Strategy>({
        url: `https://api.shunk.io/bag/${id}`,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        method: "GET",
    });

    return response;
}

export const fetchChartData = async (bagName: string, timeframe: TimeFrame) => {
    const response = await axios<ChartResponse>({
        url: `https://api.shunk.io/chart/${bagName}/${timeframe}`,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        method: "GET",
    });

    return response;
}