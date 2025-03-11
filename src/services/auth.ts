import {
  signUp,
  signIn,
  doesEmailExist,
} from "supertokens-web-js/recipe/emailpassword";

export async function signUpClicked(email: string, password: string) {
  try {
    let response = await signUp({
      formFields: [
        { id: "email", value: email },
        { id: "password", value: password },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        window.alert(formField.error);
      });
    } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
      window.alert(response.reason);
    } else {
      window.location.href = "/homepage";
    }
  } catch (err: any) {
    window.alert(
      err.isSuperTokensGeneralError
        ? err.message
        : "Oops! Something went wrong."
    );
  }
}

export async function checkEmail(email: string) {
  try {
    let response = await doesEmailExist({ email });
    if (response.doesExist) {
      window.alert("Email already exists. Please sign in instead");
    }
  } catch (err: any) {
    window.alert(
      err.isSuperTokensGeneralError
        ? err.message
        : "Oops! Something went wrong."
    );
  }
}
