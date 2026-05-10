"use client";

import AppHeader from "@/components/app-header";
import EditorPanel from "@/components/editor-panel";
import CheckIcon from "@/components/icons/check-icon";
import ColorIcon from "@/components/icons/color-icon";
import LoadIcon from "@/components/icons/load-icon";
import WarningIcon from "@/components/icons/warning-icon";
import { useConverter } from "@/hooks/use-converter";
import { downloadFile } from "@/lib/download-file";
import { readClipboard } from "@/lib/read-clipboard";
import { useState } from "react";

const SvgConverter = () => {
  const [filename, setFilename] = useState("");
  const [outputLocked, setOutputLocked] = useState(true);

  const {
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
  } = useConverter(filename);

  const handlePaste = async () => {
    const text = await readClipboard();
    setSvgCode(text);
  };

  const handleDownload = () => downloadFile(outputCode, filename, format);

  const svgStatus = !svgCode.trim() ? null : error ? (
    <span className="flex items-center gap-1 text-xs text-rose-400 font-medium bg-rose-950 px-1 py-0.5 pr-1.5 rounded-2xl">
      <WarningIcon className="size-3.5" />
      Invalid SVG
    </span>
  ) : (
    <span className="flex items-center gap-1 text-xs text-emerald-500 bg-emerald-900 px-1 py-0.5 pr-1.5 rounded-2xl">
      <CheckIcon className="size-3.5" />
      Valid SVG
    </span>
  );

  const outputActions = (
    <>
      {isLoading && <LoadIcon className="size-3.5 text-zinc-600 animate-spin" />}
      <button
        onClick={() => setReplaceColors((c) => !c)}
        className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-300 cursor-pointer"
      >
        <ColorIcon className="size-3.5" />
        {replaceColors ? "currentColor" : "Keep Colors"}
      </button>
    </>
  );

  return (
    <main className="flex-1 flex gap-2 flex-col overflow-hidden m-2">
      <AppHeader
        filename={filename}
        format={format}
        onFilenameChange={setFilename}
        onFormatChange={setFormat}
        onPaste={handlePaste}
        onDownload={handleDownload}
      />
      <div className="flex flex-1 overflow-hidden gap-2">
        <EditorPanel
          title="SVG Input"
          language="xml"
          value={svgCode}
          onChange={(v) => setSvgCode(v ?? "")}
          onCopy={() => navigator.clipboard.writeText(svgCode)}
          actions={svgStatus}
        />
        <EditorPanel
          title="React Output"
          language={format === "tsx" ? "typescript" : "javascript"}
          value={outputCode}
          onChange={(v) => setOutputCode(v ?? "")}
          onCopy={() => navigator.clipboard.writeText(outputCode)}
          locked={outputLocked}
          onToggleLock={() => setOutputLocked((l) => !l)}
          actions={outputActions}
        />
      </div>
    </main>
  );
};

export default SvgConverter;
