import { describe, expect, it } from "vitest";
import { cn } from "@/lib/tailwind-utils";

describe("cn", () => {
  it("returns a single class unchanged", () => {
    expect(cn("p-4")).toBe("p-4");
  });

  it("joins multiple classes", () => {
    expect(cn("p-4", "m-2")).toBe("p-4 m-2");
  });

  it("resolves Tailwind conflicts, keeping the last value", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("ignores falsy values", () => {
    expect(cn("p-4", false, undefined, null, "m-2")).toBe("p-4 m-2");
  });

  it("handles conditional classes", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
    expect(cn("base", !active && "active")).toBe("base");
  });

  it("returns an empty string when given no truthy arguments", () => {
    expect(cn(false, undefined)).toBe("");
  });
});
