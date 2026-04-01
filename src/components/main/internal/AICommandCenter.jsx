import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAIResult,
  generateAIContent,
  generateAIDraftMessage,
  generateAIEventDescription,
  generateAITaskPlan,
  getAIActivityRecommendation,
} from "../../../store/slices/aiSlice";

const SECTION_TABS = [
  { id: "generate", label: "General" },
  { id: "activity-recommendation", label: "Recommendation" },
  { id: "event-description", label: "Event Description" },
  { id: "draft-message", label: "Draft Message" },
  { id: "plan-task", label: "Task Plan" },
];

const AICommandCenter = () => {
  const dispatch = useDispatch();
  const { result, mode, isLoading, error } = useSelector((state) => state.ai);
  const [activeTab, setActiveTab] = useState("generate");

  const [generalPrompt, setGeneralPrompt] = useState("");
  const [memberProfile, setMemberProfile] = useState("");
  const [preferences, setPreferences] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [messageType, setMessageType] = useState("Announcement");
  const [messageTopic, setMessageTopic] = useState("");
  const [messageRecipients, setMessageRecipients] = useState("");
  const [messageTone, setMessageTone] = useState("professional");
  const [taskGoal, setTaskGoal] = useState("");
  const [taskContext, setTaskContext] = useState("");

  const handleGeneralGenerate = () => {
    if (!generalPrompt.trim()) return;
    dispatch(
      generateAIContent({
        prompt: generalPrompt,
        type: "content_generator",
      })
    );
  };

  const handleGenerateRecommendation = () => {
    if (!memberProfile.trim()) return;

    const profilePayload = {
      skills: memberProfile
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      experienceLevel: "Intermediate",
      availability: "Weekends and evenings",
    };

    dispatch(
      getAIActivityRecommendation({
        memberProfile: profilePayload,
        preferences,
      })
    );
  };

  const handleGenerateEventDescription = () => {
    if (!eventName.trim()) return;
    dispatch(
      generateAIEventDescription({
        eventName,
        eventType,
        date: eventDate,
        location: eventLocation,
        details: eventDetails,
      })
    );
  };

  const handleGenerateDraftMessage = () => {
    if (!messageTopic.trim()) return;
    dispatch(
      generateAIDraftMessage({
        messageType,
        topic: messageTopic,
        recipients: messageRecipients,
        tone: messageTone,
      })
    );
  };

  const handleGenerateTaskPlan = () => {
    if (!taskGoal.trim()) return;
    const prompt = `Create a practical task plan for this goal: ${taskGoal}. Additional context: ${taskContext}`;

    dispatch(
      generateAITaskPlan({
        goal: taskGoal,
        context: taskContext,
        prompt,
      })
    );
  };

  return (
    <section className="rounded-2xl border border-white/15 bg-[#101114] p-5 text-white md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="monument-extra-bold text-2xl uppercase">AI Command Center</h2>
        <button
          type="button"
          onClick={() => dispatch(clearAIResult())}
          className="rounded-lg border border-white/20 px-3 py-2 text-xs uppercase tracking-wide text-white/80 transition hover:border-[#DB3F7A] hover:text-[#DB3F7A]"
        >
          Clear Result
        </button>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        Use AI to speed up content generation, event planning, member communication, and activity recommendations.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SECTION_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
              activeTab === tab.id
                ? "bg-[#DB3F7A] text-white"
                : "border border-white/20 text-white/70 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 md:p-5">
        {activeTab === "generate" && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/90">Prompt</label>
            <textarea
              rows={4}
              value={generalPrompt}
              onChange={(e) => setGeneralPrompt(e.target.value)}
              placeholder="Ask AI to generate club content..."
              className="w-full rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <button
              type="button"
              onClick={handleGeneralGenerate}
              disabled={isLoading}
              className="rounded-lg bg-[#DB3F7A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#c8356d] disabled:opacity-60"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        )}

        {activeTab === "activity-recommendation" && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white/90">Member Skills (comma separated)</label>
            <input
              type="text"
              value={memberProfile}
              onChange={(e) => setMemberProfile(e.target.value)}
              placeholder="Hip hop, choreography, event support"
              className="w-full rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <label className="text-sm font-semibold text-white/90">Preferences</label>
            <textarea
              rows={3}
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Preferred style, schedule, objectives"
              className="w-full rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <button
              type="button"
              onClick={handleGenerateRecommendation}
              disabled={isLoading}
              className="rounded-lg bg-[#DB3F7A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#c8356d] disabled:opacity-60"
            >
              {isLoading ? "Generating..." : "Get Recommendations"}
            </button>
          </div>
        )}

        {activeTab === "event-description" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
              className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <input
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="Event Type"
              className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <input
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Date"
              className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <input
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Location"
              className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <textarea
              rows={3}
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              placeholder="Additional details"
              className="md:col-span-2 rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <button
              type="button"
              onClick={handleGenerateEventDescription}
              disabled={isLoading}
              className="md:col-span-2 rounded-lg bg-[#DB3F7A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#c8356d] disabled:opacity-60"
            >
              {isLoading ? "Generating..." : "Generate Event Description"}
            </button>
          </div>
        )}

        {activeTab === "draft-message" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                placeholder="Message Type"
                className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
              />
              <input
                value={messageRecipients}
                onChange={(e) => setMessageRecipients(e.target.value)}
                placeholder="Recipients"
                className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
              />
              <select
                value={messageTone}
                onChange={(e) => setMessageTone(e.target.value)}
                className="rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <textarea
              rows={3}
              value={messageTopic}
              onChange={(e) => setMessageTopic(e.target.value)}
              placeholder="Message topic"
              className="w-full rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <button
              type="button"
              onClick={handleGenerateDraftMessage}
              disabled={isLoading}
              className="rounded-lg bg-[#DB3F7A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#c8356d] disabled:opacity-60"
            >
              {isLoading ? "Generating..." : "Draft Message"}
            </button>
          </div>
        )}

        {activeTab === "plan-task" && (
          <div className="space-y-3">
            <input
              value={taskGoal}
              onChange={(e) => setTaskGoal(e.target.value)}
              placeholder="Task goal"
              className="w-full rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <textarea
              rows={4}
              value={taskContext}
              onChange={(e) => setTaskContext(e.target.value)}
              placeholder="Context, constraints, resources"
              className="w-full rounded-lg border border-white/15 bg-[#18191d] px-3 py-2 text-sm text-white outline-none focus:border-[#DB3F7A]"
            />
            <button
              type="button"
              onClick={handleGenerateTaskPlan}
              disabled={isLoading}
              className="rounded-lg bg-[#DB3F7A] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#c8356d] disabled:opacity-60"
            >
              {isLoading ? "Generating..." : "Generate Task Plan"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-[#0b0c0e] p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="monument-regular text-lg uppercase">AI Output</h3>
          <span className="text-xs uppercase tracking-wide text-white/50">mode: {mode}</span>
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {!error && !result && (
          <p className="mt-3 text-sm text-white/55">
            Submit a request from any tab to see generated results here.
          </p>
        )}

        {result && (
          <pre className="mt-3 max-h-[24rem] overflow-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-[#14161a] p-4 text-sm leading-6 text-white/85">
            {result}
          </pre>
        )}
      </div>
    </section>
  );
};

export default AICommandCenter;
