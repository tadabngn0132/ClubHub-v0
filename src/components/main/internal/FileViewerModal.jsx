import { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
	faDownload,
	faFileCircleQuestion,
	faFilePdf,
	faFilePowerpoint,
	faFileWord,
	faImage,
	faLink,
	faMagnifyingGlassMinus,
	faMagnifyingGlassPlus,
	faTableCellsLarge,
	faUpRightFromSquare,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

const typeMetaMap = {
	pdf: {
		label: "PDF Document",
		accentClassName: "text-red-500 bg-red-50 border-red-100",
		icon: faFilePdf,
		hint: "Preview Mode",
	},
	doc: {
		label: "Google Docs",
		accentClassName: "text-blue-500 bg-blue-50 border-blue-100",
		icon: faFileWord,
		hint: "Editable Preview",
	},
	sheet: {
		label: "Google Sheets",
		accentClassName: "text-emerald-500 bg-emerald-50 border-emerald-100",
		icon: faTableCellsLarge,
		hint: "Spreadsheet Preview",
	},
	slide: {
		label: "Google Slides",
		accentClassName: "text-orange-500 bg-orange-50 border-orange-100",
		icon: faFilePowerpoint,
		hint: "Presentation Preview",
	},
	image: {
		label: "Image File",
		accentClassName: "text-violet-500 bg-violet-50 border-violet-100",
		icon: faImage,
		hint: "Image Preview",
	},
};

const FileViewerModal = ({ file, open = false, onClose, onView, onDownload, onCopyLink }) => {
	const meta = useMemo(() => {
		if (!file) {
			return typeMetaMap.pdf;
		}

		return typeMetaMap[file.type] || typeMetaMap.pdf;
	}, [file]);

	const previewUrl = file?.viewerUrl || file?.url || "";
	const downloadUrl = file?.downloadUrl || file?.url || previewUrl;
	const canEmbed = ["doc", "sheet", "slide", "pdf"].includes(file?.type);
	const canRenderImage = file?.type === "image";

	useEffect(() => {
		if (!open) {
			return undefined;
		}

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onClose?.();
			}
		};

		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [open, onClose]);

	if (!open || !file) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-6">
			<button
				type="button"
				aria-label="Close viewer"
				className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm"
				onClick={onClose}
			/>

			<div className="relative flex h-[84vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
				<header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur-xl sm:px-5">
					<div className="flex min-w-0 items-center gap-3">
						<div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${meta.accentClassName}`}>
							<FontAwesomeIcon icon={meta.icon} className="text-xl" />
						</div>
						<div className="min-w-0">
							<h3 className="truncate text-lg font-extrabold tracking-tight text-slate-900">{file.name}</h3>
							<p className="mt-1 truncate text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
								{meta.hint} • {meta.label}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => onView?.(file)}
							title="Open in new tab"
							aria-label="Open in new tab"
							className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
						>
							<FontAwesomeIcon icon={faUpRightFromSquare} className="text-sm" />
						</button>
						<button
							type="button"
							onClick={() => onDownload?.(file, downloadUrl)}
							title="Download"
							aria-label="Download"
							className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800"
						>
							<FontAwesomeIcon icon={faDownload} className="text-sm" />
						</button>
						<button
							type="button"
							onClick={() => onCopyLink?.(file)}
							title="Copy link"
							aria-label="Copy link"
							className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
						>
							<FontAwesomeIcon icon={faLink} className="text-sm" />
						</button>
						<button
							type="button"
							onClick={onClose}
							className="ml-1 flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
							aria-label="Close viewer"
						>
							<FontAwesomeIcon icon={faXmark} className="text-base" />
						</button>
					</div>
				</header>

				<div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_260px]">
					<div className="flex min-h-0 items-center justify-center overflow-y-auto bg-slate-100 p-3 sm:p-4 lg:p-5">
						<div className="flex w-full justify-center">
							<div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
								{canRenderImage ? (
									<div className="flex h-[58vh] items-center justify-center bg-slate-950">
										<img
											src={previewUrl}
											alt={file.name}
											className="max-h-full max-w-full object-contain"
										/>
									</div>
								) : canEmbed ? (
									<iframe
										title={file.name}
										src={previewUrl}
										className="h-[66vh] w-full border-0 bg-white"
										allow="autoplay; fullscreen"
									/>
								) : (
									<div className="flex h-[58vh] items-center justify-center bg-slate-50 p-8 text-center">
										<div>
											<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
												<FontAwesomeIcon icon={faFileCircleQuestion} className="text-3xl" />
											</div>
											<h4 className="text-lg font-extrabold text-slate-900">Preview unavailable</h4>
											<p className="mt-2 text-sm text-slate-500">This file type cannot be rendered inline. Use download or open in a new tab.</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<aside className="hidden min-h-0 flex-col border-t border-slate-200 bg-slate-50 lg:flex lg:border-l lg:border-t-0">
						<div className="border-b border-slate-200 px-5 py-4">
							<p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">File Details</p>
						</div>

						<div className="space-y-4 overflow-y-auto p-5 text-sm text-slate-600">
							<div className="rounded-2xl border border-slate-200 bg-white p-4">
								<div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Name</div>
								<div className="mt-1 font-semibold text-slate-900">{file.name}</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-4">
								<div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Type</div>
								<div className="mt-1 font-semibold text-slate-900">{meta.label}</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-4">
								<div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Modified</div>
								<div className="mt-1 font-semibold text-slate-900">{file.modifiedAt || "Unknown"}</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-4">
								<div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Size</div>
								<div className="mt-1 font-semibold text-slate-900">{file.size || "-"}</div>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-4">
								<div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Link</div>
								<div className="mt-2 break-all text-xs text-slate-500">{previewUrl || "No link available"}</div>
							</div>
						</div>
					</aside>
				</div>

				<footer className="flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 py-3 sm:px-5">
					<div className="flex items-center gap-4">
						<button type="button" title="Previous document" aria-label="Previous document" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
							<FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
						</button>
						<div className="h-4 w-px bg-slate-200" />
						<button type="button" title="Next document" aria-label="Next document" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
							<FontAwesomeIcon icon={faChevronRight} className="text-sm" />
						</button>
					</div>

					<div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1.5 shadow-inner">
						<button type="button" className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white hover:shadow-sm">
							<FontAwesomeIcon icon={faMagnifyingGlassMinus} className="text-xs" />
						</button>
						<div className="h-4 w-px bg-slate-200 mx-1" />
						<span className="min-w-[60px] px-3 text-center text-xs font-bold text-slate-600">100%</span>
						<div className="h-4 w-px bg-slate-200 mx-1" />
						<button type="button" className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white hover:shadow-sm">
							<FontAwesomeIcon icon={faMagnifyingGlassPlus} className="text-xs" />
						</button>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default FileViewerModal;