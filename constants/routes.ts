export const PORTFOLIO_ROUTES = {
  INVESTED: "invested",
  BAG: "bag",
} as const;

export type PortfolioRouteType =
  (typeof PORTFOLIO_ROUTES)[keyof typeof PORTFOLIO_ROUTES];
