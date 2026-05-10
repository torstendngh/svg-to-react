export const readClipboard = (): Promise<string> =>
  navigator.clipboard.readText();
