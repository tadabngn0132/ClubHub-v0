import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faFileLines,
  faFileExcel,
  faFilePdf,
  faFile,
  faSearch,
  faPlus,
  faSpinner,
  faChevronRight,
  faChevronDown,
  faTableColumns,
  faList,
  faArrowLeft,
  faExternalLinkAlt,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {
  listFolders,
  listFilesInFolder,
  resetGoogleDriveError,
} from "../../../store/slices/googleDriveSlice";
import {
  createDocFromTemplate,
  resetGoogleDocsError,
} from "../../../store/slices/googleDocsSlice";
import {
  createSheetFromTemplateAsync,
  resetGoogleSheetsError,
} from "../../../store/slices/googleSheetsSlice";
import DocTemplateModal from "../../../components/main/internal/DocTemplateModal";
import FileViewerModal from "../../../components/main/internal/FileViewerModal";

// ─── helpers ──────────────────────────────────────────────────────────────────

const EXT_MAP = {
  "application/vnd.google-apps.document": {
    icon: faFileLines,
    color: "text-blue-400",
    label: "Doc",
  },
  "application/vnd.google-apps.spreadsheet": {
    icon: faFileExcel,
    color: "text-emerald-400",
    label: "Sheet",
  },
  "application/pdf": { icon: faFilePdf, color: "text-rose-400", label: "PDF" },
};
const getFileType = (mimeType) =>
  EXT_MAP[mimeType] || { icon: faFile, color: "text-slate-400", label: "File" };

const formatSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (str) => {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ─── folder tree item ─────────────────────────────────────────────────────────

const FolderItem = ({ folder, depth = 0, selectedId, onSelect, children }) => {
  const [open, setOpen] = useState(false);
  const isSelected = selectedId === folder.id;
  const hasChildren = children && children.length > 0;

  return (
    <div>
      <button
        onClick={() => {
          setOpen((v) => !v);
          onSelect(folder);
        }}
        className={`group flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm transition
          ${
            isSelected
              ? "bg-[#db3f7a]/15 text-pink-200"
              : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          }`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {hasChildren ? (
          <FontAwesomeIcon
            icon={open ? faChevronDown : faChevronRight}
            className="text-[10px] text-slate-500 shrink-0"
          />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <FontAwesomeIcon
          icon={open ? faFolderOpen : faFolder}
          className={`text-sm shrink-0 ${isSelected ? "text-pink-300" : "text-amber-400"}`}
        />
        <span className="truncate">{folder.name}</span>
      </button>

      {open && hasChildren && (
        <div>
          {children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── file row ─────────────────────────────────────────────────────────────────

const FileRow = ({ file, viewMode, onOpen }) => {
  const { icon, color, label } = getFileType(file.mimeType);

  if (viewMode === "grid") {
    return (
      <button
        onClick={() => onOpen(file)}
        className="group flex flex-col gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/65 p-4 text-left transition hover:border-slate-600 hover:bg-slate-800/70"
      >
        <div className="flex items-center justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800`}
          >
            <FontAwesomeIcon icon={icon} className={`text-lg ${color}`} />
          </div>
          <span className="text-[10px] text-slate-500">{label}</span>
        </div>
        <p className="text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-white">
          {file.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatDate(file.modifiedTime)}
        </p>
      </button>
    );
  }

  return (
    <tr
      onClick={() => onOpen(file)}
      className="group cursor-pointer border-b border-slate-800/60 hover:bg-slate-800/40"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={icon} className={`text-base ${color}`} />
          <span className="text-sm text-slate-200 group-hover:text-white">
            {file.name}
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-xs text-slate-500">{label}</td>
      <td className="py-3 px-4 text-xs text-slate-500">
        {formatDate(file.modifiedTime)}
      </td>
      <td className="py-3 px-4 text-xs text-slate-500">
        {formatSize(file.size)}
      </td>
      <td className="py-3 px-4">
        <a
          href={file.webViewLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-slate-500 hover:text-pink-300 transition"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
        </a>
      </td>
    </tr>
  );
};

// ─── main component ───────────────────────────────────────────────────────────

const DocumentsPage = () => {
  const dispatch = useDispatch();

  const {
    folders,
    files,
    isLoading: driveLoading,
    error: driveError,
  } = useSelector((s) => s.googleDrive);
  const { isLoading: docsLoading, error: docsError } = useSelector(
    (s) => s.googleDocs,
  );
  const { isLoading: sheetsLoading, error: sheetsError } = useSelector(
    (s) => s.googleSheets,
  );

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" | "grid"
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [viewerFile, setViewerFile] = useState(null);
  const [folderHistory, setFolderHistory] = useState([]);

  // initial load
  useEffect(() => {
    dispatch(listFolders());
  }, [dispatch]);

  // load files when folder selected
  useEffect(() => {
    if (selectedFolder?.id) {
      dispatch(listFilesInFolder(selectedFolder.id));
    }
  }, [dispatch, selectedFolder]);

  // error handling
  useEffect(() => {
    if (driveError) {
      toast.error(driveError);
      dispatch(resetGoogleDriveError());
    }
  }, [driveError, dispatch]);
  useEffect(() => {
    if (docsError) {
      toast.error(docsError);
      dispatch(resetGoogleDocsError());
    }
  }, [docsError, dispatch]);
  useEffect(() => {
    if (sheetsError) {
      toast.error(sheetsError);
      dispatch(resetGoogleSheetsError());
    }
  }, [sheetsError, dispatch]);

  const handleSelectFolder = (folder) => {
    if (selectedFolder?.id !== folder.id) {
      setFolderHistory((h) => (selectedFolder ? [...h, selectedFolder] : h));
    }
    setSelectedFolder(folder);
    setSearchQuery("");
  };

  const handleBack = () => {
    const prev = folderHistory[folderHistory.length - 1];
    setFolderHistory((h) => h.slice(0, -1));
    if (prev) {
      setSelectedFolder(prev);
      dispatch(listFilesInFolder(prev.id));
    } else {
      setSelectedFolder(null);
    }
  };

  const handleCreateFromTemplate = async ({ type, templateId, title }) => {
    try {
      if (type === "doc") {
        await dispatch(
          createDocFromTemplate({
            templateId,
            title,
            folderId: selectedFolder?.id,
          }),
        ).unwrap();
        toast.success("Document created");
      } else {
        await dispatch(
          createSheetFromTemplateAsync({
            templateId,
            title,
            folderId: selectedFolder?.id,
          }),
        ).unwrap();
        toast.success("Spreadsheet created");
      }
      setTemplateModalOpen(false);
      if (selectedFolder?.id) dispatch(listFilesInFolder(selectedFolder.id));
    } catch {
      // errors handled via redux
    }
  };

  const filteredFiles = useMemo(() => {
    const list = Array.isArray(files) ? files : [];
    if (!searchQuery.trim()) return list;
    return list.filter((f) =>
      f.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [files, searchQuery]);

  const isAnyLoading = driveLoading || docsLoading || sheetsLoading;

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 overflow-hidden rounded-2xl border border-slate-700/60">
      {/* ── Sidebar ─────────────────────────────── */}
      <div className="flex w-56 shrink-0 flex-col gap-2 border-r border-slate-700/60 bg-slate-900/80 p-3 overflow-y-auto">
        <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Folders
        </p>

        {driveLoading && !folders?.length ? (
          <div className="flex items-center justify-center py-8">
            <FontAwesomeIcon icon={faSpinner} spin className="text-slate-500" />
          </div>
        ) : !folders?.length ? (
          <p className="px-2 text-xs text-slate-600">No folders found</p>
        ) : (
          (Array.isArray(folders) ? folders : []).map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              selectedId={selectedFolder?.id}
              onSelect={handleSelectFolder}
              children={folder.children}
            />
          ))
        )}
      </div>

      {/* ── Main content ────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 bg-slate-900/50">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-slate-700/60 px-4 py-3">
          {folderHistory.length > 0 && (
            <button
              onClick={handleBack}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            </button>
          )}

          <div className="flex items-center gap-2 text-sm text-slate-400">
            {folderHistory.map((f, i) => (
              <span key={f.id} className="flex items-center gap-1">
                <span
                  className="text-slate-600 hover:text-slate-300 cursor-pointer"
                  onClick={() => {
                    setFolderHistory((h) => h.slice(0, i + 1));
                    setSelectedFolder(f);
                    dispatch(listFilesInFolder(f.id));
                  }}
                >
                  {f.name}
                </span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[10px] text-slate-600"
                />
              </span>
            ))}
            <span className="font-medium text-slate-200">
              {selectedFolder?.name || "All folders"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* search */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500"
              />
              <input
                type="text"
                placeholder="Search files…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-800 py-1.5 pl-8 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-[#db3f7a]/60 focus:ring-1 focus:ring-[#db3f7a]/30 w-44"
              />
            </div>

            {/* view toggle */}
            <div className="flex rounded-xl border border-slate-700 overflow-hidden">
              {[
                { key: "list", icon: faList },
                { key: "grid", icon: faTableColumns },
              ].map(({ key, icon }) => (
                <button
                  key={key}
                  onClick={() => setViewMode(key)}
                  className={`px-2.5 py-1.5 text-sm transition ${viewMode === key ? "bg-slate-700 text-slate-100" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <FontAwesomeIcon icon={icon} />
                </button>
              ))}
            </div>

            {/* create from template */}
            {selectedFolder && (
              <button
                onClick={() => setTemplateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#db3f7a] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#c8366e]"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                New
              </button>
            )}
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto p-4">
          {!selectedFolder ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-2xl text-amber-400"
                />
              </div>
              <p className="text-slate-300 font-medium">Select a folder</p>
              <p className="mt-1 text-sm text-slate-500">
                Choose a folder from the sidebar to browse files
              </p>
            </div>
          ) : isAnyLoading ? (
            <div className="flex h-40 items-center justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-xl text-slate-500"
              />
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-center">
              <p className="text-slate-400 font-medium">No files found</p>
              <p className="mt-1 text-xs text-slate-600">
                {searchQuery
                  ? "Try a different search term"
                  : "This folder is empty"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredFiles.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  viewMode="grid"
                  onOpen={setViewerFile}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-700/60 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/60 bg-slate-800/40">
                    <th className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Name
                    </th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Type
                    </th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Modified
                    </th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Size
                    </th>
                    <th className="py-2.5 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <FileRow
                      key={file.id}
                      file={file}
                      viewMode="list"
                      onOpen={setViewerFile}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ──────────────────────────────── */}
      {templateModalOpen && (
        <DocTemplateModal
          isOpen={templateModalOpen}
          onClose={() => setTemplateModalOpen(false)}
          onSubmit={handleCreateFromTemplate}
          folderId={selectedFolder?.id}
        />
      )}

      {viewerFile && (
        <FileViewerModal
          isOpen={!!viewerFile}
          file={viewerFile}
          onClose={() => setViewerFile(null)}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
