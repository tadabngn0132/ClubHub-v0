import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";

const DocumentsPage = () => {
    const dispatch = useDispatch();
    const {
        isLoading: driveLoading,
        error: driveError,
        folders,
        files,
    } = useSelector((state) => state.googleDrive);
    const {
        isLoading: docsLoading,
        error: docsError,
    } = useSelector((state) => state.googleDocs);
    const {
        isLoading: sheetsLoading,
        error: sheetsError,
    } = useSelector((state) => state.googleSheets);

    useEffect(() => {
        dispatch(listFolders());
    }, [dispatch]);

    useEffect(() => {
        if (driveError) {
            toast.error(driveError);
            dispatch(resetGoogleDriveError());
        }
    }, [driveError]);

    useEffect(() => {
        if (docsError) {
            toast.error(docsError);
            dispatch(resetGoogleDocsError());
        }
    }, [docsError]);

    useEffect(() => {
        if (sheetsError) {
            toast.error(sheetsError);
            dispatch(resetGoogleSheetsError());
        }
    }, [sheetsError]);

    if (driveLoading || docsLoading || sheetsLoading) {
        return <Loading />;
    }
    
    return (
       <div>
            <h1 className="text-2xl font-bold mb-4">Documents</h1>
            <p className="text-gray-600">This is the Documents page. You can manage your documents here.</p>
       </div>
    )
};

export default DocumentsPage;