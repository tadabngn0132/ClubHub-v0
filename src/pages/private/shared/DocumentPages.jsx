import DocumentSideBar from "../../../components/main/internal/DocumentSideBar";
import DocumentMainContent from "../../../components/main/internal/DocumentMainContent";

const DocumentPages = () => {
    return (
        <div className="flex min-h-[calc(100vh-93px)] w-full overflow-hidden gap-6">
          <DocumentSideBar />
          <DocumentMainContent />
        </div>
    )
};

export default DocumentPages;