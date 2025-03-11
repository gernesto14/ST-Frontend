import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    termsOfServiceLink: "https://example.com/terms-of-service",
    privacyPolicyLink: "https://example.com/privacy-policy",
    recipeList: [
      EmailPasswordReact.init(
        //
        {
          signInAndUpFeature: {
            signUpForm: {
              formFields: [
                {
                  id: "first_name",
                  label: "First Name",
                  placeholder: "First name",
                },
                {
                  id: "last_name",
                  label: "Last Name",
                  placeholder: "Last Name",
                },
              ],
            },
          },
        }
        //
      ),
      SessionReact.init({
        // https://supertokens.com/docs/post-authentication/session-management/switch-between-cookies-and-header-authentication
        tokenTransferMethod: "header", //"header" or "cookie"
      }),
      EmailVerification.init({
        mode: "OPTIONAL", // "REQUIRED", // or "OPTIONAL"
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
