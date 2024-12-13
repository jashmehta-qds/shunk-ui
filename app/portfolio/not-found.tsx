import { PORTFOLIO_ROUTES } from "@/constants/routes";
import { AssetsImg } from "@/public";
import Image from "next/image";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 text-lg">
          This portfolio route doesn&#39;t exist. Please choose one of the
          following options:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href={`/portfolio/${PORTFOLIO_ROUTES.INVESTED}`}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          >
            <Image
              src={AssetsImg.ic_dollar}
              alt="dollar"
              width={24}
              height={24}
              className="w-5 h-5 mr-2"
            />
            Go to Investor&#39;s
          </Link>

          <Link
            href={`/portfolio/${PORTFOLIO_ROUTES.BAG}`}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center"
          >
            <Image
              src={AssetsImg.ic_suitcase}
              alt="dollar"
              width={24}
              height={24}
              className="w-5 h-5 mr-2"
            />
            Go to Creator&#39;s
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
