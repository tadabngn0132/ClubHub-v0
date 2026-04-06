import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import DocumentUpload from "./DocumentUpload";
import FileViewerModal from "./FileViewerModal";
import DocTemplateModal from "./DocTemplateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
	createDocFromTemplate,
	createTemplate,
	fetchEmbedLink,
} from "../../../store/slices/googleDocsSlice";
import {
	createSheetFromTemplateAsync,
	createSheetTemplateAsync,
	fetchGoogleSheetEmbedLinkAsync,
} from "../../../store/slices/googleSheetsSlice";

const seedFiles = [
	{
		id: "1",
		name: "Blueprint_Final_v2.pdf",
		subtitle: "Architectural Plan",
		modifiedAt: "Oct 12, 2023",
		size: "4.2 MB",
		type: "pdf",
	},
	{
		id: "2",
		name: "Project_Brief.docx",
		subtitle: "Word Document",
		modifiedAt: "Oct 10, 2023",
		size: "850 KB",
		type: "doc",
	},
	{
		id: "3",
		name: "Budget_Q4_Calculations.xlsx",
		subtitle: "Spreadsheet",
		modifiedAt: "Oct 08, 2023",
		size: "1.1 MB",
		type: "sheet",
	},
	{
		id: "4",
		name: "Client_Presentation.pptx",
		subtitle: "Presentation",
		modifiedAt: "Oct 05, 2023",
		size: "12.5 MB",
		type: "slide",
	},
];

const typeClassMap = {
	pdf: "text-red-400 bg-red-500/10",
	doc: "text-blue-400 bg-blue-500/10",
	sheet: "text-emerald-400 bg-emerald-500/10",
	slide: "text-orange-400 bg-orange-500/10",
	image: "text-violet-400 bg-violet-500/10",
};

const docsTemplatesSeed = [
	{ id: "doc-template-1", name: "Meeting Minutes", description: "Standard structure for weekly meetings" },
	{ id: "doc-template-2", name: "Project Proposal", description: "Background, goals, scope, and timeline" },
	{ id: "doc-template-3", name: "Retrospective", description: "What went well and next action items" },
];

const sheetsTemplatesSeed = [
	{ id: "sheet-template-1", name: "Budget Tracker", description: "Income, expenses, and monthly summary" },
	{ id: "sheet-template-2", name: "Attendance Sheet", description: "Simple member attendance matrix" },
];

const DocumentMainContent = () => {
    const dispatch = useDispatch();
	const [viewMode, setViewMode] = useState("list");
	const [searchTerm, setSearchTerm] = useState("");
	const [files, setFiles] = useState(seedFiles);
	const [activeFile, setActiveFile] = useState(null);
	const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
	const [isCreatingFromTemplate, setIsCreatingFromTemplate] = useState(false);

	const filteredFiles = useMemo(() => {
		const keyword = searchTerm.trim().toLowerCase();

		if (!keyword) {
			return files;
		}

		return files.filter((file) =>
			[file.name, file.subtitle, file.modifiedAt, file.size]
				.join(" ")
				.toLowerCase()
				.includes(keyword),
		);
	}, [files, searchTerm]);

	const getPreviewUrl = (file) => {
		if (!file) {
			return "";
		}

		if (file.viewerUrl || file.url) {
			return file.viewerUrl || file.url;
		}

		if (file.type === "pdf") {
			return "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";
		}

		if (file.type === "image") {
			return "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80";
		}

		return "https://docs.google.com/viewer?embedded=1&url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
	};

	const handleOpenFile = (file) => {
		const previewUrl = getPreviewUrl(file);

		setActiveFile({
			...file,
			viewerUrl: previewUrl,
			url: previewUrl,
			downloadUrl: previewUrl,
		});
	};

	const handleCloseViewer = () => {
		setActiveFile(null);
	};

	const handleFilesSelected = (selectedFiles) => {
		if (!Array.isArray(selectedFiles) || selectedFiles.length === 0) {
			return;
		}

		const newEntries = selectedFiles.map((file, index) => {
			const extension = String(file.name || "").split(".").pop()?.toLowerCase();
			const type =
				extension === "pdf"
					? "pdf"
					: extension === "docx" || extension === "doc"
						? "doc"
						: extension === "xlsx" || extension === "xls"
							? "sheet"
							: extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "webp"
								? "image"
								: "slide";

			return {
				id: `${Date.now()}-${index}`,
				name: file.name,
				subtitle: "Uploaded file",
				modifiedAt: new Date().toLocaleDateString("en-US", {
					month: "short",
					day: "2-digit",
					year: "numeric",
				}),
				size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
				type,
				url: URL.createObjectURL(file),
			};
		});

		setFiles((previous) => [...newEntries, ...previous]);
	};

	const handleDownload = (file, downloadUrl) => {
		const anchor = document.createElement("a");
		anchor.href = downloadUrl || file?.downloadUrl || file?.url || file?.viewerUrl || "#";
		anchor.download = file?.name || "document";
		anchor.target = "_blank";
		anchor.rel = "noreferrer";
		anchor.click();
	};

	const handleCopyLink = async (file) => {
		const link = file?.viewerUrl || file?.url || "";

		if (!link) {
			return;
		}

		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(link);
		}
	};

	const handleOpenTemplateModal = () => {
		setIsTemplateModalOpen(true);
	};

	const handleCloseTemplateModal = () => {
		if (isCreatingFromTemplate) {
			return;
		}

		setIsTemplateModalOpen(false);
	};

	const handleConfirmTemplateSelection = async ({ kind, template }) => {
		setIsCreatingFromTemplate(true);

		const createdFromTemplate = {
			id: `template-${Date.now()}`,
			name: `${template.name} - Copy`,
			subtitle: `Created from ${kind === "docs" ? "Google Docs" : "Google Sheets"} template`,
			modifiedAt: new Date().toLocaleDateString("en-US", {
				month: "short",
				day: "2-digit",
				year: "numeric",
			}),
			size: "-",
			type: kind === "docs" ? "doc" : "sheet",
			url: "https://docs.google.com",
		};

		setFiles((previous) => [createdFromTemplate, ...previous]);
		setIsCreatingFromTemplate(false);
		setIsTemplateModalOpen(false);
	};

	return (
		<main className="min-h-full flex-1 bg-[radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.22),transparent_42%),#020617]">
			<div className="w-full space-y-6">
				<header className="sticky top-0 z-20 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur-lg md:px-6">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div className="relative w-full max-w-2xl">
							<svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-500" fill="currentColor">
								<path d="M10.5 3a7.5 7.5 0 1 1 4.76 13.3l4.72 4.72-1.42 1.41-4.72-4.72A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
							</svg>
							<input
								type="text"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Search globally..."
								className="w-full rounded-full border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-sm text-slate-100 outline-none transition focus:border-blue-500"
							/>
						</div>
					</div>
				</header>

				<section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-2xl shadow-blue-900/10 md:p-6">
					<div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Documents</h1>
						</div>

						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={handleOpenTemplateModal}
								className="ml-1 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-500"
							>
								<FontAwesomeIcon icon={faPlus} className="mr-2" />
								New Doc From Template
							</button>

							<button type="button" className="ml-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white cursor-pointer transition hover:bg-blue-500">
								<FontAwesomeIcon icon={faPlus} className="mr-2" />
								New Template
							</button>

							<div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-1.5 py-1">
								<button
									type="button"
									onClick={() => setViewMode("list")}
									className={`rounded-lg px-3 py-2 text-xs font-bold transition ${viewMode === "list" ? "bg-blue-500/20 text-blue-300" : "text-slate-400 hover:text-white"}`}
								>
									List
								</button>
								<button
									type="button"
									onClick={() => setViewMode("grid")}
									className={`rounded-lg px-3 py-2 text-xs font-bold transition ${viewMode === "grid" ? "bg-blue-500/20 text-blue-300" : "text-slate-400 hover:text-white"}`}
								>
									Grid
								</button>
							</div>
						</div>
					</div>

					<DocumentUpload onFilesSelected={handleFilesSelected} />

					{viewMode === "list" ? (
						<div className="mt-5 overflow-hidden rounded-xl border border-slate-800">
							<table className="w-full text-left">
								<thead className="bg-slate-900 text-[11px] uppercase tracking-[0.18em] text-slate-500">
									<tr>
										<th className="px-4 py-3">Name</th>
										<th className="px-4 py-3">Date Modified</th>
										<th className="px-4 py-3">Size</th>
										<th className="px-4 py-3 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-800 bg-slate-950/40">
									{filteredFiles.map((file) => (
										<tr key={file.id} className="cursor-pointer transition hover:bg-slate-900/80" onClick={() => handleOpenFile(file)}>
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													<div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-extrabold uppercase ${typeClassMap[file.type] || "text-slate-200 bg-slate-700"}`}>
														{file.type}
													</div>
													<div>
														<div className="text-sm font-semibold text-white">{file.name}</div>
														<div className="text-xs text-slate-400">{file.subtitle}</div>
													</div>
												</div>
											</td>
											<td className="px-4 py-3 text-xs text-slate-300">{file.modifiedAt}</td>
											<td className="px-4 py-3 text-xs text-slate-300">{file.size}</td>
											<td className="px-4 py-3 text-right">
												<button type="button" className="rounded-md px-2 py-1 text-slate-400 transition hover:bg-slate-800 hover:text-white" onClick={(event) => event.stopPropagation()}>
													...
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
							{filteredFiles.map((file) => (
								<article key={file.id} className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-blue-500/50" onClick={() => handleOpenFile(file)}>
									<div className={`mb-3 inline-flex rounded-lg px-2 py-1 text-[11px] font-bold uppercase ${typeClassMap[file.type] || "text-slate-200 bg-slate-700"}`}>
										{file.type}
									</div>
									<h3 className="truncate text-sm font-bold text-white">{file.name}</h3>
									<p className="mt-1 text-xs text-slate-400">{file.subtitle}</p>
									<div className="mt-4 flex items-center justify-between text-xs text-slate-400">
										<span>{file.modifiedAt}</span>
										<span>{file.size}</span>
									</div>
								</article>
							))}
						</div>
					)}
				</section>
			</div>

			<FileViewerModal
				file={activeFile}
				open={Boolean(activeFile)}
				onClose={handleCloseViewer}
				onView={handleOpenFile}
				onDownload={handleDownload}
				onCopyLink={handleCopyLink}
			/>

			<DocTemplateModal
				open={isTemplateModalOpen}
				docsTemplates={docsTemplatesSeed}
				sheetsTemplates={sheetsTemplatesSeed}
				isSubmitting={isCreatingFromTemplate}
				onCancel={handleCloseTemplateModal}
				onConfirm={handleConfirmTemplateSelection}
			/>
		</main>
	);
};

export default DocumentMainContent;
