import { describe, expect, it } from "vitest";
import { svgToReact } from "@/lib/svg-to-react";

const SIMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="#ff0000" />
</svg>`;

const NO_COLOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 22h20L12 2z" fill="none" stroke="currentColor" />
</svg>`;

describe("svgToReact", () => {
  it("generates a TSX component with SVGProps import", () => {
    const result = svgToReact(SIMPLE_SVG, "MyIcon", "tsx", false);
    expect(result).toContain('import { SVGProps } from "react"');
    expect(result).toContain("SVGProps<SVGSVGElement>");
    expect(result).toContain("export default MyIcon");
  });

  it("generates a JSX component without SVGProps import", () => {
    const result = svgToReact(SIMPLE_SVG, "MyIcon", "jsx", false);
    expect(result).not.toContain("import");
    expect(result).toContain("const MyIcon = (props) =>");
    expect(result).toContain("export default MyIcon");
  });

  it("uses the provided component name", () => {
    const result = svgToReact(SIMPLE_SVG, "ArrowRight", "tsx", false);
    expect(result).toContain("const ArrowRight");
    expect(result).toContain("export default ArrowRight");
  });

  it("replaces concrete fill colors with currentColor when replaceColors is true", () => {
    const result = svgToReact(SIMPLE_SVG, "MyIcon", "tsx", true);
    expect(result).toContain('fill="currentColor"');
    expect(result).not.toContain('fill="#ff0000"');
  });

  it("keeps fill colors when replaceColors is false", () => {
    const result = svgToReact(SIMPLE_SVG, "MyIcon", "tsx", false);
    expect(result).toContain('fill="#ff0000"');
  });

  it('preserves fill="none" even when replaceColors is true', () => {
    const result = svgToReact(NO_COLOR_SVG, "MyIcon", "tsx", true);
    expect(result).toContain('fill="none"');
  });

  it('preserves stroke="currentColor" as-is when replaceColors is true', () => {
    const result = svgToReact(NO_COLOR_SVG, "MyIcon", "tsx", true);
    expect(result).toContain('stroke="currentColor"');
  });

  it("maps kebab-case SVG attributes to camelCase React props", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line stroke-width="2" stroke-linecap="round" />
</svg>`;
    const result = svgToReact(svg, "MyIcon", "tsx", false);
    expect(result).toContain("strokeWidth");
    expect(result).toContain("strokeLinecap");
  });

  it("spreads {...props} onto the root svg element", () => {
    const result = svgToReact(SIMPLE_SVG, "MyIcon", "tsx", false);
    expect(result).toContain("{...props}");
  });

  it("throws for invalid SVG markup", () => {
    expect(() => svgToReact("<not-valid-svg>", "MyIcon", "tsx", false)).toThrow("Invalid SVG");
  });
});
