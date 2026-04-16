import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faExternalLinkAlt,
  faDownload,
  faFileLines,
  faFileExcel,
  faFilePdf,
  faFile,
  faSpinner,
  faTriangleExclamation,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";

// ─── helpers ──────────────────────────────────────────────────────────────────

const MIME_CONFIG = {
  "application/vnd.google-apps.document": {
    icon: faFileLines,
    iconClass: "text-blue-400",
    bgClass: "bg-blue-500/15",
    borderClass: "border-blue-500/30",
    label: "Google Doc",
    // Google Docs preview embed URL
    embedUrl: (fileId) =>
      `https://docs.google.com/document/d/${fileId}/preview`,
    canEmbed: true,
  },
  "application/vnd.google-apps.spreadsheet": {
    icon: faFileExcel,
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-500/15",
    borderClass: "border-emerald-500/30",
    label: "Google Sheet",
    embedUrl: (fileId) =>
      `https://docs.google.com/spreadsheets/d/${fileId}/preview`,
    canEmbed: true,
  },
  "application/pdf": {
    icon: faFilePdf,
    iconClass: "text-rose-400",
    bgClass: "bg-rose-500/15",
    borderClass: "border-rose-500/30",
    label: "PDF",
    // Google Drive viewer for PDFs
    embedUrl: (fileId) => `https://drive.google.com/file/d/${fileId}/preview`,
    canEmbed: true,
  },
};

const getMimeConfig = (mimeType) =>
  MIME_CONFIG[mimeType] || {
    icon: faFile,
    iconClass: "text-slate-400",
    bgClass: "bg-slate-500/15",
    borderClass: "border-slate-500/30",
    label: "File",
    embedUrl: null,
    canEmbed: false,
  };

const formatDate = (str) => {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatSize = (bytes) => {
  if (!bytes) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── no-preview fallback ──────────────────────────────────────────────────────

const NoPreview = ({ file, config }) => (
  <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-8">
    <div
      className={`flex h-20 w-20 items-center justify-center rounded-2xl border ${config.bgClass} ${config.borderClass}`}
    >
      <FontAwesomeIcon
        icon={config.icon}
        className={`text-4xl ${config.iconClass}`}
      />
    </div>
    <div>
      <p className="text-slate-300 font-medium">Preview không khả dụng</p>
      <p className="mt-1 text-sm text-slate-500">
        Loại file này không hỗ trợ xem trước trong trình duyệt
      </p>
    </div>
    <a
      href={file.webViewLink}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-[#db3f7a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c8366e]"
    >
      <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
      Mở trong Google Drive
    </a>
  </div>
);

// ─── main ─────────────────────────────────────────────────────────────────────

/**
 * FileViewerModal
 *
 * Props:
 *   isOpen   — boolean
 *   onClose  — () => void
 *   file     — {
 *                id, name, mimeType,
 *                webViewLink,       // URL mở trên Google Drive
 *                modifiedTime?,     // ISO date string
 *                size?,             // bytes
 *                owners?,           // array of { displayName }
 *              }
 */
const FileViewerModal = ({ isOpen, onClose, file }) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // reset khi file thay đổi
  useEffect(() => {
    setIframeLoading(true);
    setIframeError(false);
  }, [file?.id]);

  if (!isOpen || !file) return null;

  const config = getMimeConfig(file.mimeType);
  const embedUrl = config.canEmbed && file.id ? config.embedUrl(file.id) : null;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-all`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl transition-all
          ${expanded ? "w-full h-full max-w-none" : "w-full max-w-4xl h-[85vh]"}`}
      >
        {/* ── Header ───────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-3.5 shrink-0">
          {/* file icon */}
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${config.bgClass} ${config.borderClass}`}
          >
            <FontAwesomeIcon
              icon={config.icon}
              className={`text-sm ${config.iconClass}`}
            />
          </div>

          {/* file name + type */}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-slate-100">
              {file.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[11px] font-medium ${config.iconClass}`}>
                {config.label}
              </span>
              {file.modifiedTime && (
                <span className="text-[11px] text-slate-500">
                  · Sửa lần cuối {formatDate(file.modifiedTime)}
                </span>
              )}
              {formatSize(file.size) && (
                <span className="text-[11px] text-slate-500">
                  · {formatSize(file.size)}
                </span>
              )}
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center gap-1 shrink-0">
            {/* expand/compress */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
              title={expanded ? "Thu nhỏ" : "Toàn màn hình"}
            >
              <FontAwesomeIcon
                icon={expanded ? faCompress : faExpand}
                className="text-sm"
              />
            </button>

            {/* open in drive */}
            {file.webViewLink && (
              <a
                href={file.webViewLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                title="Mở trong Google Drive"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
              </a>
            )}

            {/* download link (nếu backend cung cấp downloadUrl) */}
            {file.downloadUrl && (
              <a
                href={file.downloadUrl}
                download={file.name}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                title="Tải xuống"
              >
                <FontAwesomeIcon icon={faDownload} className="text-sm" />
              </a>
            )}

            {/* close */}
            <button
              onClick={onClose}
              className="ml-1 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
              title="Đóng"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* ── Viewer body ───────────────────────────── */}
        <div className="relative flex-1 min-h-0 bg-slate-950 rounded-b-2xl overflow-hidden">
          {embedUrl ? (
            <>
              {/* loading overlay */}
              {iframeLoading && !iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950 z-10">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-2xl text-slate-500"
                  />
                  <p className="text-sm text-slate-500">Đang tải preview...</p>
                </div>
              )}

              {/* error overlay */}
              {iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950 z-10 p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/15">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="text-2xl text-amber-300"
                    />
                  </div>
                  <div>
                    <p className="text-slate-300 font-medium">
                      Không tải được preview
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      File có thể bị hạn chế quyền truy cập hoặc chưa được chia
                      sẻ
                    </p>
                  </div>
                  {file.webViewLink && (
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#db3f7a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c8366e]"
                    >
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="text-xs"
                      />
                      Mở trong Google Drive
                    </a>
                  )}
                </div>
              )}

              <iframe
                src={embedUrl}
                title={file.name}
                className="w-full h-full border-0"
                onLoad={() => setIframeLoading(false)}
                onError={() => {
                  setIframeLoading(false);
                  setIframeError(true);
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </>
          ) : (
            <NoPreview file={file} config={config} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewerModal;
