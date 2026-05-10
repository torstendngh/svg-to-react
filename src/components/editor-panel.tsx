"use client";

import CodeEditor from "@/components/code-editor";
import CopyIcon from "@/components/icons/copy-icon";
import LockIcon from "@/components/icons/lock-icon";
import UnlockedIcon from "@/components/icons/unlocked-icon";
import { cn } from "@/lib/tailwind-utils";
import { ReactNode } from "react";

interface EditorPanelProps {
  title: string;
  language: string;
  value: string;
  onChange?: (value: string | undefined) => void;
  onCopy?: () => void;
  readOnly?: boolean;
  locked?: boolean;
  onToggleLock?: () => void;
  actions?: ReactNode;
  error?: string | null;
  className?: string;
}

const EditorPanel = ({
  title,
  language,
  value,
  onChange,
  onCopy,
  readOnly,
  locked,
  onToggleLock,
  actions,
  error,
  className,
}: EditorPanelProps) => (
  <div
    className={cn(
      "flex flex-col flex-1 overflow-hidden border-zinc-800 border rounded-md bg-zinc-900",
      className,
    )}
  >
    <div className="h-8 px-3 flex items-center justify-between border-b border-zinc-800">
      <span className="text-xs text-zinc-600 select-none">
        {title}
      </span>
      <div className="flex items-center gap-3">
        {actions}

        {onToggleLock !== undefined && (
          <button
            onClick={onToggleLock}
            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-300 cursor-pointer "
          >
            {locked ? (
              <>
                <LockIcon className="size-3.5" />
                Read Only
              </>
            ) : (
              <>
                <UnlockedIcon className="size-3.5" />
                Editable
              </>
            )}
          </button>
        )}
        {onCopy && (
          <button
            onClick={onCopy}
            className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-300 cursor-pointer"
          >
            <CopyIcon className="size-3.5" />
            Copy
          </button>
        )}
      </div>
    </div>
    {error && (
      <div className="px-3 py-2 text-xs text-red-400 bg-red-950/40 border-b border-red-900/50 font-mono">
        {error}
      </div>
    )}
    <div className="flex-1">
      <CodeEditor
        language={language}
        value={value}
        onChange={onChange}
        readOnly={readOnly ?? locked}
      />
    </div>
  </div>
);

export default EditorPanel;
