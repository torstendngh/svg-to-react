export const downloadFile = (content: string, filename: string, format: string): void => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.replace(/\.[jt]sx?$/i, "") || "component"}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
};
