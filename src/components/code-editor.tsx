"use client";

import { Editor, type BeforeMount } from "@monaco-editor/react";

const handleBeforeMount: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("aurora", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "4f4f7a", fontStyle: "italic" },
      { token: "keyword", foreground: "a78bfa" },
      { token: "keyword.operator", foreground: "818cf8" },
      { token: "string", foreground: "f472b6" },
      { token: "string.escape", foreground: "e879f9" },
      { token: "number", foreground: "818cf8" },
      { token: "delimiter", foreground: "6b6b9a" },
      { token: "delimiter.bracket", foreground: "818cf8" },
      { token: "type", foreground: "c084fc" },
      { token: "type.identifier", foreground: "c084fc" },
      { token: "entity.name.type", foreground: "e879f9" },
      { token: "tag", foreground: "f472b6" },
      { token: "tag.id", foreground: "f472b6" },
      { token: "tag.class", foreground: "f472b6" },
      { token: "attribute.name", foreground: "a78bfa" },
      { token: "attribute.value", foreground: "f472b6" },
      { token: "metatag", foreground: "818cf8" },
      { token: "metatag.content", foreground: "f472b6" },
      { token: "variable", foreground: "e2e8f0" },
      { token: "variable.predefined", foreground: "c084fc" },
      { token: "identifier", foreground: "e2e8f0" },
      { token: "entity.name.function", foreground: "c4b5fd" },
      { token: "support.function", foreground: "c4b5fd" },
      { token: "constant", foreground: "818cf8" },
      { token: "constant.language", foreground: "a78bfa" },
      { token: "regexp", foreground: "f472b6" },
      { token: "operator", foreground: "818cf8" },
    ],
    colors: {
      "editor.background": "#18181b",
      "editor.foreground": "#e2e8f0",
      "editorLineNumber.foreground": "#52525b",
      "editorLineNumber.activeForeground": "#a1a1aa",
      "editor.lineHighlightBackground": "#27272a",
      "editor.selectionBackground": "#312e8160",
      "editor.inactiveSelectionBackground": "#312e8130",
      "editorIndentGuide.background1": "#2a2a45",
      "editorIndentGuide.activeBackground1": "#4c4c7a",
      "editorCursor.foreground": "#f472b6",
      "editorWidget.background": "#1e1e2e",
      "editorWidget.border": "#312e81",
      "editorSuggestWidget.background": "#1e1e2e",
      "editorSuggestWidget.border": "#312e81",
      "editorSuggestWidget.selectedBackground": "#312e8180",
      "editorSuggestWidget.highlightForeground": "#f472b6",
      "input.background": "#1e1e2e",
      "input.border": "#312e81",
      "focusBorder": "#6366f1",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": "#312e8140",
      "scrollbarSlider.hoverBackground": "#4338ca60",
      "scrollbarSlider.activeBackground": "#6366f180",
    },
  });
};

interface CodeEditorProps {
  value?: string;
  defaultValue?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor = ({
  value,
  defaultValue,
  language = "javascript",
  onChange,
  readOnly = false,
}: CodeEditorProps) => {
  return (
    <Editor
      height="100%"
      theme="aurora"
      beforeMount={handleBeforeMount}
      language={language}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        readOnly,
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 13,
        lineHeight: 22,
        padding: { top: 16, bottom: 16 },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        renderLineHighlight: "line",
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
      }}
    />
  );
};

export default CodeEditor;
