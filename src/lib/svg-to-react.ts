const ATTR_MAP: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  colspan: "colSpan",
  rowspan: "rowSpan",
  "xlink:href": "href",
  "xlink:title": "title",
  "xml:space": "xmlSpace",
  "xml:lang": "xmlLang",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
  "font-size": "fontSize",
  "font-family": "fontFamily",
  "font-weight": "fontWeight",
  "text-anchor": "textAnchor",
  "letter-spacing": "letterSpacing",
  "word-spacing": "wordSpacing",
  "pointer-events": "pointerEvents",
  "shape-rendering": "shapeRendering",
  "color-interpolation": "colorInterpolation",
  "color-rendering": "colorRendering",
  "image-rendering": "imageRendering",
  "marker-start": "markerStart",
  "marker-mid": "markerMid",
  "marker-end": "markerEnd",
  "clip-path": "clipPath",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
};

const COLOR_ATTRS = new Set([
  "fill",
  "stroke",
  "color",
  "stop-color",
  "flood-color",
  "lighting-color",
]);

const COLOR_KEEP = new Set([
  "none",
  "transparent",
  "currentcolor",
  "inherit",
  "initial",
  "unset",
]);

const toReactAttr = (name: string): string => {
  if (ATTR_MAP[name]) return ATTR_MAP[name];
  if (name.includes("-")) {
    return name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
  }
  return name;
};

const styleStringToObject = (style: string): string => {
  const entries = style
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [prop, ...rest] = s.split(":");
      const key = prop.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      const value = rest.join(":").trim();
      return `${key}: "${value}"`;
    });
  return `{{ ${entries.join(", ")} }}`;
};

const normalizeColor = (attrName: string, value: string): string => {
  if (!COLOR_ATTRS.has(attrName)) return value;
  if (COLOR_KEEP.has(value.toLowerCase())) return value;
  if (value.startsWith("url(")) return value;
  return "currentColor";
};

const attrsToJsx = (el: Element, replaceColors: boolean, extra: string[] = []): string => {
  const parts: string[] = [];
  for (const attr of Array.from(el.attributes)) {
    if (attr.name === "xmlns:xlink" || attr.name === "xmlns") continue;
    const reactName = toReactAttr(attr.name);
    const raw = replaceColors ? normalizeColor(attr.name, attr.value) : attr.value;
    const value = attr.name === "style" ? styleStringToObject(attr.value) : `"${raw}"`;
    parts.push(`${reactName}=${value}`);
  }
  return [...parts, ...extra].join(" ");
};

const convertChildren = (el: Element, indent: number, replaceColors: boolean): string =>
  Array.from(el.childNodes)
    .map((child) => convertNode(child, indent, replaceColors))
    .filter(Boolean)
    .join("\n");

const convertNode = (node: Node, indent: number, replaceColors: boolean): string => {
  const pad = "  ".repeat(indent);

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    return text ? `${pad}${text}` : "";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  const attrs = attrsToJsx(el, replaceColors);
  const attrStr = attrs ? ` ${attrs}` : "";
  const children = convertChildren(el, indent + 1, replaceColors);

  if (!children) return `${pad}<${tag}${attrStr} />`;

  return `${pad}<${tag}${attrStr}>\n${children}\n${pad}</${tag}>`;
};

export const svgToReact = (
  svg: string,
  componentName: string,
  format: "tsx" | "jsx",
  replaceColors: boolean,
): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error("Invalid SVG");

  const svgEl = doc.documentElement;
  const rootAttrs = attrsToJsx(svgEl, replaceColors, ["{...props}"]);
  const rootAttrStr = rootAttrs ? ` ${rootAttrs}` : " {...props}";
  const children = convertChildren(svgEl, 2, replaceColors);
  const innerJsx = children
    ? `  <svg${rootAttrStr}>\n${children}\n  </svg>`
    : `  <svg${rootAttrStr} />`;

  if (format === "jsx") {
    return `const ${componentName} = (props) => (
${innerJsx}
);

export default ${componentName};
`;
  }

  return `import { SVGProps } from "react";

const ${componentName} = (props: SVGProps<SVGSVGElement>) => (
${innerJsx}
);

export default ${componentName};
`;
};
