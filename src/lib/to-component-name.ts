export const toComponentName = (filename: string): string => {
  const base = filename.replace(/\.(svg|tsx?|jsx?)$/i, "");
  return (
    base
      .split(/[-_\s]+/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("") || "MyIcon"
  );
};
