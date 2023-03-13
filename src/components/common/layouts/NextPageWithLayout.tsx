import type { NextPage } from "next";
import type { ComponentType, ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
