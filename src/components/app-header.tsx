"use client";

import Button from "@/components/button";
import { cn } from "@/lib/tailwind-utils";
import DownloadIcon from "./icons/download-icon";
import ChevronDownIcon from "./icons/chevron-down-icon";
import PasteIcon from "./icons/paste-icon";
import ArrowRightIcon from "./icons/arrow-right-icon";
import LogoIcon from "./icons/logo-icon";

interface AppHeaderProps {
  filename: string;
  format: "tsx" | "jsx";
  onFilenameChange: (value: string) => void;
  onFormatChange: (format: "tsx" | "jsx") => void;
  onPaste: () => void;
  onDownload: () => void;
}

const AppHeader = ({
  filename,
  format,
  onFilenameChange,
  onFormatChange,
  onPaste,
  onDownload,
}: AppHeaderProps) => (
  <header className="shrink-0 flex items-center gap-2">

    <div className="text-indigo-400 flex items-center justify-center">
      <LogoIcon/>
    </div>

    <div className="h-8 border border-zinc-800 pl-2 pr-3 relative flex items-center gap-1.5 bg-zinc-900 rounded-md text-zinc-500 hover:text-zinc-50 hover:bg-zinc-800 shrink-0 cursor-pointer select-none">
      <span className="pointer-events-none flex items-center gap-1 font-medium">
        <span>SVG</span>
        <ArrowRightIcon className="size-4" />
        <span>{format.toUpperCase()}</span>
      </span>
      <ChevronDownIcon className="size-3.5 pointer-events-none" />
      <select
        value={format}
        onChange={(e) => onFormatChange(e.target.value as "tsx" | "jsx")}
        className="absolute inset-0 opacity-0 cursor-pointer w-full"
      >
        <option value="tsx">TSX</option>
        <option value="jsx">JSX</option>
      </select>
    </div>

    <input
      type="text"
      value={filename}
      onChange={(e) => onFilenameChange(e.target.value)}
      placeholder="icon-name"
      className={cn(
        "h-8 px-3 flex-1 min-w-0 rounded-md bg-zinc-900",
        "text-zinc-500 placeholder:text-zinc-600 border border-zinc-800",
        "focus:outline-none focus:text-zinc-50",
      )}
    />

    <Button onClick={onPaste}>
      <PasteIcon className="size-4" />
      Paste SVG
    </Button>
    <Button variant="primary" onClick={onDownload}>
      <DownloadIcon className="size-4" />
      Export
    </Button>
  </header>
);

export default AppHeader;
