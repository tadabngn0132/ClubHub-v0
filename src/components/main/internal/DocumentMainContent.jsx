import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listFolders,
  listFilesInFolder,
  resetGoogleDriveError,
} from "../../../store/slices/googleDriveSlice";
import { createDocFromTemplate} from "../../../store/slices/googleDocsSlice";
import { createSheetFromTemplateAsync} from "../../../store/slices/googleSheetsSlice";
import toast from "react-hot-toast";

const DocumentMainContent = () => {
  const dispatch = useDispatch();
  const { folders, files, isLoading, error } = useSelector(
    (state) => state.googleDrive,
  );
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listFolders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetGoogleDriveError());
    }
  }, [error]);

  const handleFolderOpen = (folderId) => {
    dispatch(listFilesInFolder(folderId));
  };

  const onCreateFromTemplate = (type, templateId, title) => {
    if (type === "document") {
      dispatch(createDocFromTemplate({ userId: currentUser.id, templateId, newDocTitle: title }));
    } else if (type === "spreadsheet") {
      dispatch(createSheetFromTemplateAsync({ userId: currentUser.id, templateId, newSheetTitle: title }));
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 text-slate-300">
      <p className="text-lg">Google Drive integration coming soon...</p>
    </div>
  );
};

export default DocumentMainContent;
