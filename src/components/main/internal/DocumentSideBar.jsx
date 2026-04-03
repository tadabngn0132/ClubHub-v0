import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const defaultFolders = [
	{
		id: "projects",
		name: "Projects",
		children: ["Residential Alpha", "Urban Loft B", "Sapphire Tower C"],
	},
	{ id: "finance", name: "Finance", children: [] },
	{ id: "legal", name: "Legal", children: [] },
	{ id: "media", name: "Media", children: [] },
];

const navItems = [
	{ key: "all-files", label: "All Files", active: true },
	{ key: "shared", label: "Shared with me", active: false },
	{ key: "recent", label: "Recent", active: false },
];

const iconMap = {
	"all-files": (
		<path d="M3 7.8A2.8 2.8 0 0 1 5.8 5h4l1.2 1.5H18A3 3 0 0 1 21 9.5v6.7a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 16.2V7.8Z" />
	),
	shared: (
		<path d="M8.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2 0-3.8.9-4.8 2.3A6.7 6.7 0 0 0 4 20h13.5A2.5 2.5 0 0 0 20 17.5c0-2.5-2-4.5-4.5-4.5Z" />
	),
	recent: (
		<path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-2.05-4.95L15 9h6V3l-2.7 2.7A8.96 8.96 0 0 0 12 3Zm-1 5v5.2l4 2.3 1-1.73-3-1.72V8h-2Z" />
	),
};

const DocumentSideBar = ({ folders = defaultFolders }) => {
	const [expandedIds, setExpandedIds] = useState(() => new Set([folders[0]?.id]));

	const normalizedFolders = useMemo(() => folders || defaultFolders, [folders]);

	const toggleFolder = (folderId) => {
		setExpandedIds((previous) => {
			const next = new Set(previous);

			if (next.has(folderId)) {
				next.delete(folderId);
			} else {
				next.add(folderId);
			}

			return next;
		});
	};

	return (
		<aside className="sticky top-0 flex w-72 flex-col">
			<div className="rounded-xl ">
				<div className="flex items-center justify-between mb-4 px-1 text-[12px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    <h1>Folders</h1>
                    <button className="ml-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white cursor-pointer transition hover:bg-blue-500" type="button">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        New Folder
                    </button>
                </div>

				<div className="space-y-1.5">
					{normalizedFolders.map((folder) => {
						const isExpanded = expandedIds.has(folder.id);

						return (
							<div key={folder.id}>
								<button
									type="button"
									onClick={() => toggleFolder(folder.id)}
									className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
								>
									<svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} fill="currentColor">
										<path d="M9 6l6 6-6 6V6Z" />
									</svg>
									<svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-300" fill="currentColor">
										<path d="M3.8 7A2.8 2.8 0 0 1 6.6 4h3.6l1.4 1.8h5.6A2.8 2.8 0 0 1 20 8.6v7.8a2.8 2.8 0 0 1-2.8 2.8H6.6a2.8 2.8 0 0 1-2.8-2.8V7Z" />
									</svg>
									<span className="truncate">{folder.name}</span>
								</button>

								{isExpanded && folder.children.length > 0 && (
									<div className="ml-8 mt-1 space-y-1 border-l border-slate-700 pl-3">
										{folder.children.map((child) => (
											<button
												type="button"
												key={child}
												className="block w-full truncate rounded-md px-2 py-1 text-left text-xs text-slate-400 transition-colors hover:bg-slate-800 hover:text-blue-300"
											>
												{child}
											</button>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div className="mt-10 border-t border-slate-800 pt-1">
				<div className="space-y-1">
					<button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white" type="button">
						Settings
					</button>
					<button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white" type="button">
						Help
					</button>
				</div>
			</div>
		</aside>
	);
};

export default DocumentSideBar;