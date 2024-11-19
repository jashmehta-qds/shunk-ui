"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PORTFOLIO_ROUTES } from "@/constants/routes";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-bold text-red-600">
          Something went wrong!
        </h2>

        <p className="text-gray-600 text-lg">
          We encountered an error while loading this page. You can try:
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try again
          </button>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                router.push(`/portfolio/${PORTFOLIO_ROUTES.INVESTED}`)
              }
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
            >
              Go to Invested
            </button>

            <button
              onClick={() => router.push(`/portfolio/${PORTFOLIO_ROUTES.BAG}`)}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
            >
              Go to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
