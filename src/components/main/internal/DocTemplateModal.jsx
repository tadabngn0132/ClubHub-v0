import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TAB_META = {
	docs: {
		title: "Google Docs",
		hint: "Text document templates",
	},
	sheets: {
		title: "Google Sheets",
		hint: "Spreadsheet templates",
	},
};

const DocTemplateModal = ({
	open = false,
	docsTemplates = [],
	sheetsTemplates = [],
	isSubmitting = false,
	onCancel,
	onConfirm,
}) => {
	const [selectedKind, setSelectedKind] = useState("docs");
	const [selectedTemplateId, setSelectedTemplateId] = useState("");

	const templatesByKind = useMemo(
		() => ({
			docs: Array.isArray(docsTemplates) ? docsTemplates : [],
			sheets: Array.isArray(sheetsTemplates) ? sheetsTemplates : [],
		}),
		[docsTemplates, sheetsTemplates],
	);

	const currentTemplates = templatesByKind[selectedKind] || [];

	useEffect(() => {
		if (!open) {
			return;
		}

		const initialKind = templatesByKind.docs.length > 0 ? "docs" : "sheets";
		const initialTemplate = templatesByKind[initialKind]?.[0]?.id || "";

		setSelectedKind(initialKind);
		setSelectedTemplateId(initialTemplate);
	}, [open, templatesByKind]);

	useEffect(() => {
		if (!open) {
			return undefined;
		}

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onCancel?.();
			}
		};

		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [open, onCancel]);

	useEffect(() => {
		const firstTemplateId = currentTemplates[0]?.id || "";
		const stillExists = currentTemplates.some((template) => template.id === selectedTemplateId);

		if (!stillExists) {
			setSelectedTemplateId(firstTemplateId);
		}
	}, [currentTemplates, selectedTemplateId]);

	if (!open) {
		return null;
	}

	const selectedTemplate = currentTemplates.find((template) => template.id === selectedTemplateId);
	const hasAnyTemplate = templatesByKind.docs.length > 0 || templatesByKind.sheets.length > 0;

	const handleConfirm = () => {
		if (!selectedTemplate || isSubmitting) {
			return;
		}

		onConfirm?.({
			kind: selectedKind,
			template: selectedTemplate,
		});
	};

	return (
		<div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
			<button
				type="button"
				aria-label="Close template modal"
				className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
				onClick={onCancel}
			/>

			<div className="relative w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
				<header className="border-b border-slate-800 px-5 py-4 sm:px-6">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Create From Template</p>
							<h2 className="mt-1 text-xl font-extrabold tracking-tight text-white">Choose template source</h2>
						</div>
						<button
							type="button"
							onClick={onCancel}
							aria-label="Close modal"
							className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-300 transition hover:border-slate-500 hover:text-white"
						>
							<FontAwesomeIcon icon={faXmark} className="text-sm" />
						</button>
					</div>
				</header>

				<div className="space-y-5 p-5 sm:p-6">
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{Object.keys(TAB_META).map((kind) => {
							const isActive = selectedKind === kind;

							return (
								<button
									key={kind}
									type="button"
									onClick={() => setSelectedKind(kind)}
									className={`rounded-xl border px-4 py-3 text-left transition ${
										isActive
											? "border-blue-500 bg-blue-500/15 text-blue-100"
											: "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
									}`}
								>
									<p className="text-sm font-bold">{TAB_META[kind].title}</p>
									<p className="mt-1 text-xs text-slate-400">{TAB_META[kind].hint}</p>
								</button>
							);
						})}
					</div>

					<section className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
						<div className="mb-3 flex items-center justify-between gap-2">
							<p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Available templates</p>
							<p className="text-xs text-slate-500">{currentTemplates.length} item(s)</p>
						</div>

						{!hasAnyTemplate ? (
							<div className="rounded-lg border border-dashed border-slate-700 px-4 py-6 text-center text-sm text-slate-400">
								No templates found yet.
							</div>
						) : currentTemplates.length === 0 ? (
							<div className="rounded-lg border border-dashed border-slate-700 px-4 py-6 text-center text-sm text-slate-400">
								No {TAB_META[selectedKind].title} templates available.
							</div>
						) : (
							<div className="max-h-64 space-y-2 overflow-y-auto pr-1">
								{currentTemplates.map((template) => {
									const isSelected = selectedTemplateId === template.id;

									return (
										<button
											key={template.id}
											type="button"
											onClick={() => setSelectedTemplateId(template.id)}
											className={`w-full rounded-lg border px-3 py-3 text-left transition ${
												isSelected
													? "border-blue-500 bg-blue-500/10"
													: "border-slate-700 bg-slate-900/70 hover:border-slate-500"
											}`}
										>
											<p className="truncate text-sm font-semibold text-slate-100">{template.name}</p>
											<p className="mt-1 truncate text-xs text-slate-400">
												{template.description || "No description"}
											</p>
										</button>
									);
								})}
							</div>
						)}
					</section>
				</div>

				<footer className="flex items-center justify-end gap-3 border-t border-slate-800 px-5 py-4 sm:px-6">
					<button
						type="button"
						onClick={onCancel}
						className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
					>
						Huy bo
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={!selectedTemplate || isSubmitting}
						className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-600"
					>
						{isSubmitting ? "Dang tao..." : "Xac nhan tao"}
					</button>
				</footer>
			</div>
		</div>
	);
};

export default DocTemplateModal;
