import {
  hideSnackbar,
  IButton,
  removeModal,
  showModal,
  showSnackbar,
} from "@browser/actions/dialog";

import Registry from "@browser/state/registry";

export type level = "SUCCESS" | "ERROR";

class ID {
  static generate() {
    return Math.random().toString(16);
  }
}

export class Snackbar {
  static success(text: string) {
    const id = ID.generate();
    Registry.store.dispatch(
      showSnackbar({
        id,
        text: text,
        type: "SNACKBAR",
        level: "SUCCESS",
      }) as any
    );
    return id;
  }

  static error(text: string) {
    const id = ID.generate();
    Registry.store.dispatch(
      showSnackbar({
        id,
        text: text,
        type: "SNACKBAR",
        level: "ERROR",
      }) as any
    );
    return id;
  }

  static hide(id: string) {
    Registry.store.dispatch(hideSnackbar(id) as any);
  }
}

export class Toast {
  static success(text: string) {
    const id = ID.generate();
    Registry.store.dispatch(
      showSnackbar({
        id,
        text: text,
        type: "TOAST",
        level: "SUCCESS",
      }) as any
    );
    return id;
  }

  static error(text: string) {
    const id = ID.generate();
    Registry.store.dispatch(
      showSnackbar({
        id,
        text: text,
        type: "TOAST",
        level: "ERROR",
      }) as any
    );
    return id;
  }

  static hide(id: string) {
    Registry.store.dispatch(hideSnackbar(id) as any);
  }
}

export class Modal {
  static show(title: string, text: string, buttons: IButton[]) {
    const id = ID.generate();
    Registry.store.dispatch(
      showModal({
        id,
        title: title,
        text: text,
        buttons: buttons,
      }) as any
    );
    return id;
  }

  static remove(id: string) {
    Registry.store.dispatch(removeModal(id) as any);
  }
}
