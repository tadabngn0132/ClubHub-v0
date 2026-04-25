import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendAIChatQuery,
  fetchAIChatHistory,
  clearAIChatHistoryAction,
} from "../../../store/slices/aiChatSlice";
import Loading from "../layout/internal/Loading";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ConfirmationModal from "../../main/internal/ConfirmationModal";

const AIChatBox = () => {
  const dispatch = useDispatch();
  const { history, isLoading, error } = useSelector((state) => state.aiChat);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { query: "" },
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(fetchAIChatHistory());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while processing your query.",
      );
    }
  }, [error]);

  const handleSendQuery = (data) => {
    dispatch(sendAIChatQuery({ query: data.query }));
    reset();
  };

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(clearAIChatHistoryAction());
    handleCloseConfirmationModal();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">AI Chat</h2>
      <div className="mb-4 max-h-64 overflow-y-auto">
        {history.length === 0 ? (
          <p>No chat history found.</p>
        ) : (
          history.map((entry, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${entry.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"}`}
            >
              <p>{entry.content}</p>
              {entry.sources && (
                <ul className="mt-1 text-sm text-gray-600">
                  {entry.sources.map((source, idx) => (
                    <li key={idx}>
                      <strong>Source {idx + 1}:</strong> {source.sourceType}{" "}
                      (ID: {source.sourceId}, Similarity: {source.similarity})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit(handleSendQuery)} className="flex space-x-2">
        <input
          type="text"
          {...register("query", { required: "Query cannot be empty" })}
          className={`flex-1 p-2 border rounded ${errors.query ? "border-red-500" : "border-gray-300"}`}
          placeholder="Type your question here..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to clear the AI chat history?"
        variant="danger"
        confirmButtonText="Clear History"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default AIChatBox;
