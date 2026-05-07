import { useDispatch, useSelector } from "react-redux";
import { sendAIChatQuery, clearAIChatHistoryAction } from "../../../store/slices/aiChatSlice";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMessage, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const AIChat = () => {
  const dispatch = useDispatch();
  const { history, isLoading, error } = useSelector((state) => state.aiChat);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const lastPromptRef = useRef(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 2;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prompt: "",
    },
    mode: "onChange",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    if (error) {
      if (error.includes("503") || error.includes("high demand")) {
        toast.error(
          `AI service temporarily busy. Try again in a moment.`,
          { duration: 4000 }
        );
      }
    }
  }, [error]);

  const handleSendPrompt = (data) => {
    const prompt = data.prompt;
    if (!prompt.trim()) return;

    lastPromptRef.current = prompt;
    retryCountRef.current = 0;
    dispatch(sendAIChatQuery({ query: prompt }));
    reset();
  };

  const handleRetry = () => {
    if (!lastPromptRef.current) return;
    if (retryCountRef.current >= MAX_RETRIES) {
      toast.error("Max retries reached. Please try again later.");
      return;
    }
    retryCountRef.current += 1;
    dispatch(sendAIChatQuery({ query: lastPromptRef.current }));
  };

  const handleClearChat = () => {
    lastPromptRef.current = null;
    retryCountRef.current = 0;
    dispatch(clearAIChatHistoryAction());
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-[9000] flex items-center gap-2 rounded-full bg-[var(--pink-color)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 hover:scale-105 md:bottom-8 md:right-8"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faMessage} size="lg" />
        <span className="hidden sm:inline">{isOpen ? "Close" : "AI Chat"}</span>
      </button>

      {/* Chatbox Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-[8999] h-[500px] w-full max-w-md rounded-2xl border border-slate-700/70 bg-slate-900/95 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur md:bottom-24 md:right-8 sm:w-96">
          {/* Header */}
          <div className="border-b border-slate-700/60 px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold tracking-tight">AI Chat</h2>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    type="button"
                    className="rounded px-2 py-1 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                    title="Clear chat"
                  >
                    Clear
                  </button>
                )}
                <span className="rounded-full border border-[var(--pink-color)]/50 bg-[var(--pink-color)]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--pink-color)]">
                  AI Assistant
                </span>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
            style={{ height: "calc(100% - 140px)" }}
          >
            {history.length === 0 && !error && (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-xs text-slate-400">
                  Ask AI anything about your club
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-rose-400/50 bg-rose-500/15 px-3 py-2 text-xs text-rose-200">
                <p className="mb-2">{error}</p>
                {retryCountRef.current < MAX_RETRIES && (
                  <button
                    onClick={handleRetry}
                    disabled={isLoading}
                    className="flex items-center gap-1 rounded bg-rose-600 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
                  >
                    <FontAwesomeIcon icon={faRotateRight} size="xs" />
                    Retry
                  </button>
                )}
              </div>
            )}

            {history.map((chat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-xs rounded-xl bg-[var(--pink-color)] px-3 py-2 text-xs leading-5 text-white">
                    <p className="whitespace-pre-wrap">{chat.query}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-xl bg-slate-800 px-3 py-2 text-xs leading-5 text-slate-100">
                    <p className="whitespace-pre-wrap">{chat.answer}</p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit(handleSendPrompt)}
            className="border-t border-slate-700/70 px-4 py-3"
          >
            <div className="flex gap-2">
              <input
                {...register("prompt", { required: "Message required" })}
                placeholder="Type message..."
                type="text"
                className="flex-1 rounded-full border border-slate-600 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none transition focus:border-[var(--pink-color)] focus:ring-2 focus:ring-[var(--pink-color)]/20"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-[var(--pink-color)] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
