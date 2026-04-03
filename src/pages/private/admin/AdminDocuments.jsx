import DocumentSideBar from "../../../components/main/internal/DocumentSideBar";
import DocumentMainContent from "../../../components/main/internal/DocumentMainContent";

const AdminDocuments = () => {
    return (
        <div className="flex min-h-[calc(100vh-93px)] w-full overflow-hidden gap-6">
            <div className="flex h-full w-72 shrink-0 flex-col">
                <DocumentSideBar />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <DocumentMainContent />
            </div>
        </div>
    )
};

export default AdminDocuments;