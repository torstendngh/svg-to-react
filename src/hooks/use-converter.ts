"use client";

import { formatCode } from "@/lib/format-code";
import { toComponentName } from "@/lib/to-component-name";
import { svgToReact } from "@/lib/svg-to-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Format = "tsx" | "jsx";

interface ConverterState {
  svgCode: string;
  outputCode: string;
  format: Format;
  replaceColors: boolean;
  isLoading: boolean;
  error: string | null;
  setSvgCode: (code: string) => void;
  setOutputCode: (code: string) => void;
  setFormat: (format: Format) => void;
  setReplaceColors: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const useConverter = (filename: string): ConverterState => {
  const [svgCode, setSvgCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [format, setFormat] = useState<Format>("tsx");
  const [replaceColors, setReplaceColors] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const regenerate = useCallback(
    async (svg: string, name: string, fmt: Format, colors: boolean) => {
      if (!svg.trim()) {
        setOutputCode("");
        setError(null);
        return;
      }
      setIsLoading(true);
      try {
        const raw = svgToReact(svg, toComponentName(name), fmt, colors);
        const formatted = await formatCode(raw, fmt);
        setOutputCode(formatted);
        setError(null);
      } catch (err) {
        setOutputCode("");
        setError(err instanceof Error ? err.message : "Conversion failed");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(
      () => regenerate(svgCode, filename, format, replaceColors),
      300,
    );
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [svgCode, filename, format, replaceColors, regenerate]);

  return {
    svgCode,
    outputCode,
    format,
    replaceColors,
    isLoading,
    error,
    setSvgCode,
    setOutputCode,
    setFormat,
    setReplaceColors,
  };
};
