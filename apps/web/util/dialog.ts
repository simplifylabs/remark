import { hideSnackbar, showSnackbar } from "@web/actions/dialog";
import Registry from "@web/registry";

export type level = "SUCCESS" | "ERROR";

export class Snackbar {
  static success(text: string) {
    Registry.store.dispatch(
      showSnackbar({
        text: text,
        type: "SNACKBAR",
        level: "SUCCESS",
      }) as any
    );
  }

  static error(text: string) {
    Registry.store.dispatch(
      showSnackbar({
        text: text,
        type: "SNACKBAR",
        level: "ERROR",
      }) as any
    );
  }

  static hide(id: string) {
    Registry.store.dispatch(hideSnackbar(id) as any);
  }
}

export class Toast {
  static success(text: string) {
    Registry.store.dispatch(
      showSnackbar({
        text: text,
        type: "TOAST",
        level: "SUCCESS",
      }) as any
    );
  }

  static error(text: string) {
    Registry.store.dispatch(
      showSnackbar({
        text: text,
        type: "TOAST",
        level: "ERROR",
      }) as any
    );
  }

  static hide(id: string) {
    Registry.store.dispatch(hideSnackbar(id) as any);
  }
}
