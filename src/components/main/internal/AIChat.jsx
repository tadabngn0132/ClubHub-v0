import { useDispatch, useSelector } from "react-redux";
import { generateAIResponseThunk } from "../../../store/slices/aiSlice";
import { useForm } from "react-hook-form";

const AIChat = () => {
    const dispatch = useDispatch();
    const aiResponse = useSelector((state) => state.ai.response);
    const isLoading = useSelector((state) => state.ai.isLoading);
    const error = useSelector((state) => state.ai.error);

    const {
        register,
        handleSubmit,
        formState: { errors }        
    } = useForm({
        defaultValues: {
            prompt: "",
        },
        mode: "onChange",
    });

    const handleSendPrompt = (prompt) => {
        dispatch(generateAIResponseThunk(prompt));
    };

    return (
        <div>
            <h2>AI Chat</h2>
            <form onSubmit={handleSubmit((data) => handleSendPrompt(data.prompt))}>
                <input
                    {...register("prompt", { required: "Prompt is required" })}
                    placeholder="Enter your prompt..."
                />
                <button type="submit">Send Prompt</button>
            </form>
            
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {aiResponse && (<div>
                <h3>AI Response:</h3>
                <p>{aiResponse}</p>
            </div>)}
        </div>
    );
};

export default AIChat;