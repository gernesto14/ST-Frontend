'use client';

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { useRouter } from "next/navigation";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

type Action =
  | "SUCCESS"
  | "PASSWORD_RESET_SUCCESSFUL"
  | "RESET_PASSWORD_EMAIL_SENT"
  | "TO_AUTH"
  | "SUCCESS";

interface Context {
  action: Action;
  createdNewSession?: boolean;
  isNewRecipeUser?: boolean;
  user?: { id: string };
}

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    // enableDebugLogs: true,
    appInfo,
    disableAuthRoute: false,
    termsOfServiceLink: "https://example.com/terms-of-service",
    privacyPolicyLink: "https://example.com/privacy-policy",


    getRedirectionURL: async (context) => {
      console.log("getRedirectionURL Context: ", context);

      if (context.action === "TO_AUTH") {
        if (context.showSignIn === false) {
          console.log("User signed up, redirecting to sign-in");
          return "/auth?show=sign-in";
        }
        return "/auth";
      } else if (context.action === "SUCCESS" && context.newSessionCreated) {
        console.log("User logged in");
        return "/about";
      }

      // If `context.action` is not part of the expected values, return default
      console.log("Default redirection");
      return "/auth";
    },

    /////////////////////////////////////////////
    recipeList: [
      SessionReact.init({
        // https://supertokens.com/docs/post-authentication/session-management/switch-between-cookies-and-header-authentication
        tokenTransferMethod: "header", //"header" or "cookie"
      }),
      EmailPassword.init({
        //
        // onHandleEvent: (context: Context) => {
        //   console.log("onHandleEvent Context: ", context);
        //   if (context.action === "PASSWORD_RESET_SUCCESSFUL") {
        //   } else if (context.action === "RESET_PASSWORD_EMAIL_SENT") {
        //   } else if (context.action === "SUCCESS") {
        //     if (context.createdNewSession) {
        //       console.log("User logged in: ", context.user.id);
        //     } else if (context.isNewRecipeUser) {
        //       console.log("User signed up: ", context.user.id);
        //     }
        //   }
        // },
        onHandleEvent: (context: Context) => {
          console.log("onHandleEvent Context: ", context);
          if (context.action === "PASSWORD_RESET_SUCCESSFUL") {
          } else if (context.action === "RESET_PASSWORD_EMAIL_SENT") {
          } else if (context.action === "SUCCESS") {
            if (context.createdNewSession) {
              console.log("User logged in: ", context.user?.id);
            } else if (context.isNewRecipeUser) {
              console.log("User signed up: ", context.user?.id);
            }
          }
        },
        // Form Fields
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "access_code",
                label: "Access Code",
                placeholder: "DEMO",
              },
            ],
          },
        },
      }),

      EmailVerification.init({
        mode: "REQUIRED", // "REQUIRED", // or "OPTIONAL"
      }),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  };
};
