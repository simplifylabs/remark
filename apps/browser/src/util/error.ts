import User from "@browser/util/user";
import { Toast } from "@browser/util/dialog";
import { Server, Res } from "@browser/util/api";

export default class Error {
  static async parse(res: Res) {
    if (res === null) {
      if (Server.isOnline) Server.notifyOffline();
      return this.maintenance();
    }

    if (!Server.isOnline) Server.notifyOnline();
    if (res.success) return res;
    switch (res.body.error) {
      case "VALIDATION_ERROR":
        return this.error(res.body.message || "Validation Error");
      case "EMAIL_NOT_AVAILABLE":
        return this.error("This email is already in use");
      case "USERNAME_NOT_AVAILABLE":
        return this.error("This username is already in use");
      case "WRONG_EMAIL_OR_PASSWORD":
        return this.error("Wrong email or password");
      case "EMAIL_NOT_FOUND":
        return this.error("This email doesn't exist");
      case "OAUTH_USED":
        return this.error("Please continue with Google instead");
      case "WRONG_TOKEN":
        return this.error("This link is invalid");
      case "TOKEN_EXPIRED":
        return this.error("This link is already expired");
      case "RATE_LIMIT_EXCEEDED":
        return this.error("Calm Down! Rate Limit exceeded");
      case "POST_NOT_FOUND":
        return this.error("Post not found");
      case "ACCESS_FORBIDDEN":
        return this.error("Access forbidden");
      case "NO_FILE_SPECIFIED":
        return this.error("No file specified");
      case "PROCESS_IMAGE_ERROR":
        return this.error("Error processing Image");
      case "UPDATE_MISSING":
        return this.error("No Update specified");
      case "EMAIL_NOT_MODIFIABLE":
        return this.error("Cannot update email");
      case "INVALID_ID_TOKEN":
        return this.error("Failed to login with Google");
      case "USER_NOT_FOUND":
        return User.logout();
      case "INVALID_REFRESH_TOKEN":
        return User.logout();
      case "ACCESS_TOKEN_INVALID":
        return await this.refresh(res);
      default:
        return res;
    }
  }

  static handle(res: Res) {
    if (res.error) return Toast.error(res.error);
    Toast.error("Something unexpected happened!");
  }

  static async refresh(res: Res) {
    if (res.resent) return User.logout();

    const refresh = await User.refresh();
    if (!refresh.success) return res;

    const resent = await this.parse(await res.resend());
    return resent;
  }

  static success() {
    return { success: true };
  }

  static error(message: string) {
    return { success: false, error: message };
  }

  static maintenance() {
    return { success: false, redirect: "/maintenance", offline: true };
  }
}
