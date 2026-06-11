import { useState, useRef, useCallback } from "react";
import { Bold, Italic, Code, List, Type, Eye, Edit3, Heading1, Heading2, Terminal } from "lucide-react";

interface RichStatementEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function parseMarkdown(text: string): string {
  if (!text) return "";

  let html = text
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks (``` ... ```)
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;font-family:monospace;font-size:13px;color:#94d8f7;overflow-x:auto;margin:8px 0;">${code.trim()}</pre>`;
  });

  // Inline code `...`
  html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:5px;padding:1px 6px;font-family:monospace;font-size:13px;color:#94d8f7;">$1</code>');

  // H1 ## heading
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.7);margin:16px 0 6px;letter-spacing:0.05em;text-transform:uppercase;">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:16px;font-weight:600;color:#a5b4fc;margin:18px 0 8px;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:4px;">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:19px;font-weight:700;color:#fff;margin:0 0 10px;letter-spacing:-0.01em;">$1</h1>');

  // Bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:600;color:#e2e8f0;">$1</strong>');

  // Italic *text*
  html = html.replace(/\*(.+?)\*/g, '<em style="font-style:italic;color:#cbd5e1;">$1</em>');

  // Horizontal rule ---
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:16px 0;"/>');

  // Bullet lists - item
  html = html.replace(/^[-*] (.+)$/gm, '<li style="color:rgba(255,255,255,0.75);margin:3px 0;padding-left:4px;">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/gs, (match) => {
    return `<ul style="list-style:disc;padding-left:20px;margin:8px 0;">${match}</ul>`;
  });

  // Numbered lists  1. item
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="color:rgba(255,255,255,0.75);margin:3px 0;padding-left:4px;">$1</li>');

  // Constraint/Note lines starting with >
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote style="border-left:3px solid #6366f1;background:rgba(99,102,241,0.07);padding:8px 12px;border-radius:0 8px 8px 0;color:rgba(255,255,255,0.7);margin:8px 0;font-size:13.5px;">$1</blockquote>');

  // Double newline → paragraph break
  html = html.replace(/\n\n+/g, '</p><p style="margin:0 0 8px;color:rgba(255,255,255,0.78);line-height:1.7;font-size:14px;">');

  // Single newline → <br>
  html = html.replace(/\n/g, "<br/>");

  // Wrap non-block content in a paragraph
  if (!html.startsWith("<h") && !html.startsWith("<ul") && !html.startsWith("<pre") && !html.startsWith("<hr")) {
    html = `<p style="margin:0 0 8px;color:rgba(255,255,255,0.78);line-height:1.7;font-size:14px;">${html}</p>`;
  }

  return html;
}

const TOOLBAR_ACTIONS = [
  {
    icon: Heading1,
    label: "H1",
    title: "Heading 1",
    wrap: ["# ", ""],
    newline: true,
  },
  {
    icon: Heading2,
    label: "H2",
    title: "Heading 2",
    wrap: ["## ", ""],
    newline: true,
  },
  {
    icon: Bold,
    label: "B",
    title: "Bold",
    wrap: ["**", "**"],
    newline: false,
  },
  {
    icon: Italic,
    label: "I",
    title: "Italic",
    wrap: ["*", "*"],
    newline: false,
  },
  {
    icon: Code,
    label: "Code",
    title: "Inline Code",
    wrap: ["`", "`"],
    newline: false,
  },
  {
    icon: Terminal,
    label: "Block",
    title: "Code Block",
    wrap: ["```\n", "\n```"],
    newline: true,
  },
  {
    icon: List,
    label: "List",
    title: "Bullet List",
    wrap: ["- ", ""],
    newline: true,
  },
  {
    icon: Type,
    label: "Note",
    title: "Note / Constraint",
    wrap: ["> ", ""],
    newline: true,
  },
];

export function RichStatementEditor({ value, onChange }: RichStatementEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = useCallback(
    (wrap: string[], newline: boolean) => {
      const ta = textareaRef.current;
      if (!ta) return;

      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = value.slice(start, end);
      const before = value.slice(0, start);
      const after = value.slice(end);

      const prefix = newline && before && !before.endsWith("\n") ? "\n" : "";
      const suffix = newline ? "\n" : "";

      const inserted = `${prefix}${wrap[0]}${selected}${wrap[1]}${suffix}`;
      const newVal = before + inserted + after;
      onChange(newVal);

      // restore cursor
      requestAnimationFrame(() => {
        ta.focus();
        const newCursor = start + prefix.length + wrap[0].length + selected.length + wrap[1].length + suffix.length;
        ta.setSelectionRange(newCursor, newCursor);
      });
    },
    [value, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab → indent
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const newVal = value.slice(0, start) + "  " + value.slice(ta.selectionEnd);
      onChange(newVal);
      requestAnimationFrame(() => ta.setSelectionRange(start + 2, start + 2));
    }

    // Enter → auto-continue list
    if (e.key === "Enter") {
      const ta = e.currentTarget;
      const pos = ta.selectionStart;
      const lineStart = value.lastIndexOf("\n", pos - 1) + 1;
      const currentLine = value.slice(lineStart, pos);
      const bulletMatch = currentLine.match(/^([-*] |\d+\. |> )/);
      if (bulletMatch) {
        e.preventDefault();
        const continuation = "\n" + bulletMatch[1];
        const newVal = value.slice(0, pos) + continuation + value.slice(pos);
        onChange(newVal);
        requestAnimationFrame(() => {
          ta.setSelectionRange(pos + continuation.length, pos + continuation.length);
        });
      }
    }
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgb(59,130,246)";
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.10)";
        }
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          padding: "8px 10px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          flexWrap: "wrap",
        }}
      >
        {TOOLBAR_ACTIONS.map((action) => (
          <button
            key={action.title}
            type="button"
            title={action.title}
            onClick={() => applyFormat(action.wrap, action.newline)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "28px",
              minWidth: "28px",
              padding: "0 6px",
              borderRadius: "6px",
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 600,
              transition: "background 0.15s, color 0.15s",
              gap: "3px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <action.icon size={13} />
          </button>
        ))}

        {/* Separator */}
        <div
          style={{
            width: "1px",
            height: "18px",
            background: "rgba(255,255,255,0.08)",
            margin: "0 4px",
          }}
        />

        {/* Write / Preview toggle */}
        {(["write", "preview"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              height: "28px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "none",
              background: mode === m ? "rgba(99,102,241,0.2)" : "transparent",
              color: mode === m ? "#a5b4fc" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 600,
              transition: "all 0.15s",
              letterSpacing: "0.03em",
            }}
          >
            {m === "write" ? <Edit3 size={12} /> : <Eye size={12} />}
            {m === "write" ? "Write" : "Preview"}
          </button>
        ))}
      </div>

      {/* Editor / Preview */}
      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`# Problem Title\n\nWrite your problem statement here...\n\n## Constraints\n- 1 ≤ n ≤ 10^5\n\n> Note: Array elements can be negative`}
          style={{
            display: "block",
            width: "100%",
            minHeight: "180px",
            resize: "vertical",
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "14px 16px",
            color: "rgba(255,255,255,0.85)",
            fontSize: "13.5px",
            lineHeight: "1.75",
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <div
          style={{
            minHeight: "180px",
            padding: "14px 16px",
            overflowY: "auto",
          }}
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(value) || '<p style="color:rgba(255,255,255,0.25);font-size:14px;font-style:italic;">Nothing to preview yet...</p>',
          }}
        />
      )}

      {/* Footer hint */}
      <div
        style={{
          padding: "5px 14px 7px",
          fontSize: "11px",
          color: "rgba(255,255,255,0.2)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          gap: "16px",
        }}
      >
        <span># H1 &nbsp; ## H2 &nbsp; **bold** &nbsp; *italic* &nbsp; `code` &nbsp; - list &nbsp; &gt; note</span>
      </div>
    </div>
  );
}