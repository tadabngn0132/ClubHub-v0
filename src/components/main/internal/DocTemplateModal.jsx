import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFileLines,
  faFileExcel,
  faChevronRight,
  faSpinner,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchGoogleDocTemplates,
  fetchGoogleSheetTemplates,
} from "../../../store/slices/googleDriveSlice";

// ─── sub-components ───────────────────────────────────────────────────────────

const TypeTab = ({ active, icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition
      ${
        active
          ? `${color.bg} ${color.text} border ${color.border}`
          : "text-slate-400 hover:text-slate-200"
      }`}
  >
    <FontAwesomeIcon icon={icon} className="text-sm" />
    {label}
  </button>
);

const TemplateCard = ({ template, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full rounded-xl border px-4 py-3 text-left transition
      ${
        selected
          ? "border-[#db3f7a]/50 bg-[#db3f7a]/10"
          : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800"
      }`}
  >
    <div className="flex items-center justify-between">
      <p
        className={`text-sm font-medium ${selected ? "text-pink-200" : "text-slate-200"}`}
      >
        {template.name || template.label}
      </p>
      {selected && (
        <span className="h-4 w-4 rounded-full bg-[#db3f7a] flex items-center justify-center">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[8px] text-white"
          />
        </span>
      )}
    </div>
    <p className="mt-0.5 text-xs text-slate-500">
      {template.description || template.mimeType}
    </p>
  </button>
);

// ─── main ─────────────────────────────────────────────────────────────────────

/**
 * DocTemplateModal
 *
 * Props:
 *   isOpen    — boolean
 *   onClose   — () => void
 *   folderId  — string | null  (Google Drive folder to create file in)
 *   onSubmit  — ({ type: 'doc'|'sheet', templateId: string, title: string }) => Promise<void>
 *   isLoading — boolean (optional, tao dùng internal state nếu không truyền)
 */
const DocTemplateModal = ({
  isOpen,
  onClose,
  folderId,
  onSubmit,
  isLoading: externalLoading,
}) => {
  const dispatch = useDispatch();
  const {
    googleDocTemplates,
    googleSheetTemplates,
    isLoading: reduxLoading,
    folders,
  } = useSelector((state) => state.googleDrive);

  const [type, setType] = useState("doc");
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [targetFolderId, setTargetFolderId] = useState(folderId || "root");
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch templates when modal opens
  useEffect(() => {
    if (isOpen && !googleDocTemplates.length) {
      dispatch(fetchGoogleDocTemplates());
    }
    if (isOpen && !googleSheetTemplates.length) {
      dispatch(fetchGoogleSheetTemplates());
    }
  }, [
    isOpen,
    dispatch,
    googleDocTemplates.length,
    googleSheetTemplates.length,
  ]);

  const isLoading = externalLoading ?? internalLoading ?? reduxLoading;
  const templates = type === "doc" ? googleDocTemplates : googleSheetTemplates;

  const handleClose = () => {
    if (isLoading || internalLoading) return;
    setType("doc");
    setSelectedId(null);
    setTitle("");
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!selectedId) {
      setError("Vui lòng chọn template");
      return;
    }
    if (!title.trim()) {
      setError("Vui lòng nhập tên file");
      return;
    }
    setError("");
    setInternalLoading(true);
    try {
      await onSubmit({
        type,
        templateId: selectedId,
        title: title.trim(),
        folderId: targetFolderId,
      });
      handleClose();
    } catch (err) {
      setError(err?.message || "Có lỗi xảy ra, thử lại sau");
    } finally {
      setInternalLoading(false);
    }
  };

  const handleTypeSwitch = (t) => {
    setType(t);
    setSelectedId(null);
    setError("");
  };

  if (!isOpen) return null;

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#db3f7a]/30 bg-[#db3f7a]/15">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-pink-300 text-sm"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">
                Tạo file mới
              </p>
              {folderId && (
                <p className="text-xs text-slate-500">
                  Lưu vào folder hiện tại
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 overflow-y-auto p-5">
          {/* Type tabs */}
          <div className="flex gap-2 rounded-xl bg-slate-800/50 p-1">
            <TypeTab
              active={type === "doc"}
              icon={faFileLines}
              label="Google Doc"
              color={{
                bg: "bg-blue-500/15",
                text: "text-blue-300",
                border: "border-blue-500/30",
              }}
              onClick={() => handleTypeSwitch("doc")}
            />
            <TypeTab
              active={type === "sheet"}
              icon={faFileExcel}
              label="Google Sheet"
              color={{
                bg: "bg-emerald-500/15",
                text: "text-emerald-300",
                border: "border-emerald-500/30",
              }}
              onClick={() => handleTypeSwitch("sheet")}
            />
          </div>

          {/* Template list */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Chọn template
            </p>
            <div className="flex flex-col gap-2 min-h-32">
              {reduxLoading ? (
                <div className="flex items-center justify-center py-8">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-slate-500"
                  />
                </div>
              ) : templates.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-xs text-slate-500">
                    Không có template nào
                  </p>
                </div>
              ) : (
                templates.map((t) => (
                  <TemplateCard
                    key={t.id}
                    template={t}
                    selected={selectedId === t.id}
                    onClick={() => {
                      setSelectedId(t.id);
                      setError("");
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tên file
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder={`Ví dụ: ${type === "doc" ? "Meeting Notes 2025-04" : "Budget Q2 2025"}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-[#db3f7a]/60 focus:ring-1 focus:ring-[#db3f7a]/30"
            />
          </div>

          {/* Folder picker */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Lưu vào
            </label>
            <select
              value={targetFolderId}
              onChange={(e) => setTargetFolderId(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none"
            >
              <option value="root">My Drive</option>
              {(Array.isArray(folders) ? folders : []).map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-slate-800 px-5 py-4">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-40"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !selectedId || !title.trim()}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#db3f7a] py-2.5 text-sm font-semibold text-white transition hover:bg-[#c8366e] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="text-xs" />
                Đang tạo...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                Tạo file
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocTemplateModal;
