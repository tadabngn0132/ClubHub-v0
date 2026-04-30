import { useEffect, useState, useMemo, useCallback } from "react";
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

// ─── constants ─────────────────────────────────────────────────────────────────

const FILE_TYPE_MAP = {
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
  "application/pdf": {
    icon: faFilePdf,
    color: "text-rose-400",
    label: "PDF",
  },
};

const DEFAULT_FILE_TYPE = {
  icon: faFile,
  color: "text-slate-400",
  label: "File",
};

const VIEW_MODES = {
  LIST: "list",
  GRID: "grid",
};

// ─── helpers ──────────────────────────────────────────────────────────────────

const getFileType = (mimeType) => FILE_TYPE_MAP[mimeType] || DEFAULT_FILE_TYPE;

const formatFileSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatFileDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ─── sub-components ───────────────────────────────────────────────────────────

const FolderItem = ({ folder, depth = 0, selectedId, onSelect, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedId === folder.id;
  const hasChildren = children && children.length > 0;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectFolder = () => {
    onSelect(folder);
  };

  const handleNavigateToFolder = () => {
    if (!isOpen && hasChildren) {
      handleToggle();
    } else {
      handleSelectFolder();
    }
  };

  const handleFolderClick = () => {
    handleSelectFolder();
    if (hasChildren) {
      handleToggle();
    }
  };

  return (
    <div>
      <button
        onClick={handleFolderClick}
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
            icon={isOpen ? faChevronDown : faChevronRight}
            className="text-[10px] text-slate-500 shrink-0"
          />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <FontAwesomeIcon
          icon={isOpen ? faFolderOpen : faFolder}
          className={`text-sm shrink-0 ${isSelected ? "text-pink-300" : "text-amber-400"}`}
        />
        <span className="truncate">{folder.name}</span>
      </button>

      {isOpen && hasChildren && (
        <div>
          {children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              children={child.children}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileRow = ({ file, viewMode, onOpen }) => {
  const { icon, color, label } = getFileType(file.mimeType);

  const handleClick = () => {
    onOpen(file);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  if (viewMode === VIEW_MODES.GRID) {
    return (
      <button
        onClick={handleClick}
        className="group flex flex-col gap-2 rounded-2xl border border-slate-700/60 bg-slate-900/65 p-4 text-left transition hover:border-slate-600 hover:bg-slate-800/70"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">
            <FontAwesomeIcon icon={icon} className={`text-lg ${color}`} />
          </div>
          <span className="text-[10px] text-slate-500">{label}</span>
        </div>
        <p className="text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-white">
          {file.name}
        </p>
        <p className="text-xs text-slate-500">
          {formatFileDate(file.modifiedTime)}
        </p>
      </button>
    );
  }

  return (
    <tr
      onClick={handleClick}
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
        {formatFileDate(file.modifiedTime)}
      </td>
      <td className="py-3 px-4 text-xs text-slate-500">
        {formatFileSize(file.size)}
      </td>
      <td className="py-3 px-4">
        <a
          href={file.webViewLink}
          target="_blank"
          rel="noreferrer"
          onClick={handleLinkClick}
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

  // Redux selectors
  const {
    folders,
    files: filesByFolder,
    isLoading: driveLoading,
    error: driveError,
  } = useSelector((state) => state.googleDrive);
  const { isLoading: docsLoading, error: docsError } = useSelector(
    (state) => state.googleDocs,
  );
  const { isLoading: sheetsLoading, error: sheetsError } = useSelector(
    (state) => state.googleSheets,
  );

  // Local state
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODES.LIST);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderBreadcrumb, setFolderBreadcrumb] = useState([]);

  // Get current folder files
  const currentFiles = useMemo(() => {
    if (!selectedFolder?.id || !filesByFolder?.[selectedFolder.id]) {
      return [];
    }
    return filesByFolder[selectedFolder.id];
  }, [selectedFolder, filesByFolder]);

  // Filter files by search
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentFiles;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return currentFiles.filter((file) =>
      file.name?.toLowerCase().includes(lowerCaseQuery),
    );
  }, [currentFiles, searchQuery]);

  // Check if any operation is loading
  const isAnyLoading = driveLoading || docsLoading || sheetsLoading;

  // ── Effects ────────────────────────────────────────────────────────────────

  // Load folders on mount
  useEffect(() => {
    dispatch(listFolders());
  }, [dispatch]);

  // Load files when folder selected
  useEffect(() => {
    if (selectedFolder?.id) {
      dispatch(listFilesInFolder(selectedFolder.id));
    }
  }, [dispatch, selectedFolder?.id]);

  // Handle errors
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

  const handleSelectFolder = useCallback(
    (folder) => {
      if (selectedFolder?.id !== folder.id) {
        setFolderBreadcrumb((prev) =>
          selectedFolder ? [...prev, selectedFolder] : prev,
        );
      }
      setSelectedFolder(folder);
      setSearchQuery("");
    },
    [selectedFolder],
  );

  const handleNavigateBack = useCallback(() => {
    const previousFolder = folderBreadcrumb[folderBreadcrumb.length - 1];
    setFolderBreadcrumb((prev) => prev.slice(0, -1));
    if (previousFolder) {
      setSelectedFolder(previousFolder);
      dispatch(listFilesInFolder(previousFolder.id));
    } else {
      setSelectedFolder(null);
    }
  }, [folderBreadcrumb, dispatch]);

  const handleBreadcrumbClick = useCallback(
    (folder, index) => {
      setFolderBreadcrumb((prev) => prev.slice(0, index + 1));
      setSelectedFolder(folder);
      dispatch(listFilesInFolder(folder.id));
    },
    [dispatch],
  );

  const handleCreateFromTemplate = useCallback(
    async ({ type, templateId, title }) => {
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
        setIsTemplateModalOpen(false);
        if (selectedFolder?.id) dispatch(listFilesInFolder(selectedFolder.id));
      } catch (err) {
        // Errors are handled via Redux reducers
      }
    },
    [dispatch, selectedFolder?.id],
  );

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

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
          {folderBreadcrumb.length > 0 && (
            <button
              onClick={handleNavigateBack}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            </button>
          )}

          <div className="flex items-center gap-2 text-sm text-slate-400">
            {folderBreadcrumb.map((folder, index) => (
              <span key={folder.id} className="flex items-center gap-1">
                <button
                  onClick={() => handleBreadcrumbClick(folder, index)}
                  className="text-slate-600 hover:text-slate-300 cursor-pointer transition"
                >
                  {folder.name}
                </button>
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
            {/* Search input */}
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

            {/* View mode toggle */}
            <div className="flex rounded-xl border border-slate-700 overflow-hidden">
              {[
                { mode: VIEW_MODES.LIST, icon: faList },
                { mode: VIEW_MODES.GRID, icon: faTableColumns },
              ].map(({ mode, icon }) => (
                <button
                  key={mode}
                  onClick={() => handleViewModeChange(mode)}
                  className={`px-2.5 py-1.5 text-sm transition ${
                    viewMode === mode
                      ? "bg-slate-700 text-slate-100"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <FontAwesomeIcon icon={icon} />
                </button>
              ))}
            </div>

            {/* Create from template button */}
            {selectedFolder && (
              <button
                onClick={() => setIsTemplateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#db3f7a] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#c8366e]"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                New
              </button>
            )}
          </div>
        </div>

        {/* Files section */}
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
          ) : viewMode === VIEW_MODES.GRID ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredFiles.map((file) => (
                <FileRow
                  key={file.id}
                  file={file}
                  viewMode={VIEW_MODES.GRID}
                  onOpen={setSelectedFile}
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
                      viewMode={VIEW_MODES.LIST}
                      onOpen={setSelectedFile}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ──────────────────────────────── */}
      {isTemplateModalOpen && (
        <DocTemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          onSubmit={handleCreateFromTemplate}
          folderId={selectedFolder?.id}
        />
      )}

      {selectedFile && (
        <FileViewerModal
          isOpen={!!selectedFile}
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
