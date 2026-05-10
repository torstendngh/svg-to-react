import { describe, expect, it } from "vitest";
import { formatCode } from "@/lib/format-code";

const MESSY_JSX = `const Icon=(props)=>(<svg {...props}><circle cx="12" cy="12" r="10" /></svg>);export default Icon;`;

const MESSY_TSX = `import{SVGProps}from"react";const Icon=(props:SVGProps<SVGSVGElement>)=>(<svg {...props}><circle cx="12" cy="12" r="10" /></svg>);export default Icon;`;

describe("formatCode", () => {
  it("formats JSX and returns a string", async () => {
    const result = await formatCode(MESSY_JSX, "jsx");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("formats TSX and returns a string", async () => {
    const result = await formatCode(MESSY_TSX, "tsx");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("adds a trailing newline", async () => {
    const result = await formatCode(MESSY_JSX, "jsx");
    expect(result.endsWith("\n")).toBe(true);
  });

  it("expands single-line code into multiple lines", async () => {
    const result = await formatCode(MESSY_JSX, "jsx");
    expect(result.split("\n").length).toBeGreaterThan(1);
  });

  it("preserves the component name in JSX output", async () => {
    const result = await formatCode(MESSY_JSX, "jsx");
    expect(result).toContain("Icon");
    expect(result).toContain("export default Icon");
  });

  it("preserves the SVGProps type annotation in TSX output", async () => {
    const result = await formatCode(MESSY_TSX, "tsx");
    expect(result).toContain("SVGProps");
  });
});
