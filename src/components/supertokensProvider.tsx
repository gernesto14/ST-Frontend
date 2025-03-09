// disable lint
/* eslint-disable */

"use client";
import React from "react";
import { SuperTokensWrapper } from "supertokens-auth-react";
import SuperTokensReact from "supertokens-auth-react";
import { frontendConfig, setRouter } from "../config/frontend";
import { usePathname, useRouter } from "next/navigation";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  setRouter(useRouter(), usePathname() || window.location.pathname);
  if (
    canHandleRoute([
      /* Other pre built UI */ EmailPasswordPreBuiltUI,
      EmailVerificationPreBuiltUI,
    ])
  ) {
    return getRoutingComponent([
      EmailPasswordPreBuiltUI,
      /* Other pre built UI */ EmailVerificationPreBuiltUI,
    ]);
  }
  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
