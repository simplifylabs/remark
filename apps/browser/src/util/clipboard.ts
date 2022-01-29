export default class Clipboard {
  static copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  static event(body: { [key: string]: any }) {
    if (!navigator || !navigator.clipboard || !navigator.clipboard.writeText)
      return { success: false };
    this.copy(body.text);
    return { success: true };
  }
}
