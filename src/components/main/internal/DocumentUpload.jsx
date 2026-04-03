import { useMemo, useRef, useState } from "react";

const DocumentUpload = ({ onFilesSelected }) => {
	const fileInputRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const panelClassName = useMemo(() => {
		if (isDragging) {
			return "border-blue-400 bg-blue-500/10";
		}

		return "border-slate-700 bg-slate-900/40 hover:border-blue-500/50 hover:bg-blue-500/5";
	}, [isDragging]);

	const handleDragOver = (event) => {
		event.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		setIsDragging(false);

		const files = Array.from(event.dataTransfer.files || []);

		if (files.length > 0 && typeof onFilesSelected === "function") {
			onFilesSelected(files);
		}
	};

	const handleInputChange = (event) => {
		const files = Array.from(event.target.files || []);

		if (files.length > 0 && typeof onFilesSelected === "function") {
			onFilesSelected(files);
		}
	};

	return (
		<div
			className={`group relative w-full rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${panelClassName}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			role="button"
			tabIndex={0}
			onClick={() => fileInputRef.current?.click()}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					fileInputRef.current?.click();
				}
			}}
		>
			<input
				ref={fileInputRef}
				type="file"
				multiple
				className="hidden"
				onChange={handleInputChange}
			/>

			<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-blue-300 transition-transform group-hover:scale-110">
				<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
					<path d="M12 16V6" strokeLinecap="round" />
					<path d="M8 10L12 6L16 10" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M4 16.5A3.5 3.5 0 0 0 7.5 20H16a4 4 0 0 0 .7-7.94A5.5 5.5 0 0 0 6 13.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			<p className="text-sm font-semibold text-slate-200">
				Drop files here or <span className="text-blue-400">click to upload</span>
			</p>
			<p className="mt-1 text-xs text-slate-400">Supports PDF, DOCX, XLSX, PPTX and image files.</p>
		</div>
	);
};

export default DocumentUpload;