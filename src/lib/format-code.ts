import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserTypescript from "prettier/plugins/typescript";

const BASE_OPTIONS = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5" as const,
  printWidth: 80,
};

export const formatCode = async (code: string, format: "tsx" | "jsx"): Promise<string> => {
  if (format === "jsx") {
    return prettier.format(code, {
      ...BASE_OPTIONS,
      parser: "babel",
      plugins: [parserBabel, parserEstree],
    });
  }
  return prettier.format(code, {
    ...BASE_OPTIONS,
    parser: "typescript",
    plugins: [parserEstree, parserTypescript],
  });
};
