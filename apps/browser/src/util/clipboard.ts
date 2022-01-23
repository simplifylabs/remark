export default class Clipboard {
  static copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  static event(text: string) {
    if (!navigator || !navigator.clipboard || !navigator.clipboard.writeText)
      return { success: false };
    this.copy(text);
    return { success: true };
  }
}
