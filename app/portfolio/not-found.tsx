import { PORTFOLIO_ROUTES } from "@/constants/routes";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 text-lg">
          This portfolio route doesn't exist. Please choose one of the following
          options:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href={`/portfolio/${PORTFOLIO_ROUTES.INVESTED}`}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Go to Investor's
          </Link>

          <Link
            href={`/portfolio/${PORTFOLIO_ROUTES.BAG}`}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Go to Creator's
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
