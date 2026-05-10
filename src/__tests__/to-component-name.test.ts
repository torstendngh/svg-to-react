import { describe, expect, it } from "vitest";
import { toComponentName } from "@/lib/to-component-name";

describe("toComponentName", () => {
  it("converts kebab-case to PascalCase", () => {
    expect(toComponentName("my-icon")).toBe("MyIcon");
  });

  it("converts snake_case to PascalCase", () => {
    expect(toComponentName("my_icon")).toBe("MyIcon");
  });

  it("converts space-separated words to PascalCase", () => {
    expect(toComponentName("my icon")).toBe("MyIcon");
  });

  it("strips svg extension", () => {
    expect(toComponentName("my-icon.svg")).toBe("MyIcon");
  });

  it("strips tsx extension", () => {
    expect(toComponentName("my-icon.tsx")).toBe("MyIcon");
  });

  it("strips jsx extension", () => {
    expect(toComponentName("my-icon.jsx")).toBe("MyIcon");
  });

  it("handles a single word", () => {
    expect(toComponentName("icon")).toBe("Icon");
  });

  it("returns MyIcon for an empty string", () => {
    expect(toComponentName("")).toBe("MyIcon");
  });

  it("handles multiple separators in a row", () => {
    expect(toComponentName("my--icon")).toBe("MyIcon");
  });

  it("handles already PascalCase input", () => {
    expect(toComponentName("MyIcon")).toBe("MyIcon");
  });
});
