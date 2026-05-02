import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ActivityBasicInfoSection from "./ActivityBasicInfoSection.jsx";
import ActivityLocationSection from "./ActivityLocationSection.jsx";
import ActivityDescriptionSection from "./ActivityDescriptionSection.jsx";
import ActivityScheduleSection from "./ActivityScheduleSection.jsx";

const ActivityForm = ({ activity, onSubmit }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { currentUser } = useSelector((state) => state.auth);

  const methods = useForm({
    defaultValues: {
      title: activity ? activity.title : "",
      description: activity ? activity.description : "",
      shortDescription: activity ? activity.shortDescription : "",
      slug: activity ? activity.slug : "",
      startDate: activity ? activity.startDate : "",
      endDate: activity ? activity.endDate : "",
      locationType: activity ? activity.locationType : "",
      venueName: activity ? activity.venueName : "",
      venueAddress: activity ? activity.venueAddress : "",
      roomNumber: activity ? activity.roomNumber : "",
      type: activity ? activity.type : "",
      status: activity ? activity.status : "",
      thumbnailUrl: activity ? activity.thumbnailUrl : "",
      thumbnail: activity ? activity.thumbnail : null,
      maxParticipants: activity ? activity.maxParticipants : null,
      registrationDeadline: activity ? activity.registrationDeadline : "",
      requireRegistration: activity ? activity.requireRegistration : false,
      designatedParticipants: activity ? activity.designatedParticipants : [],
      organizerId: currentUser?.id,
      isPublic: activity ? activity.isPublic : true,
      isFeatured: activity ? activity.isFeatured : false,
      priority: activity ? activity.priority : 0,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const tabs = [
    { name: "Basic Info", component: ActivityBasicInfoSection },
    { name: "Location", component: ActivityLocationSection },
    { name: "Description", component: ActivityDescriptionSection },
    { name: "Schedule", component: ActivityScheduleSection },
  ];

  const handleSaveData = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
    formData.append("slug", data.slug);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("locationType", data.locationType);
    formData.append("venueName", data.venueName);
    formData.append("venueAddress", data.venueAddress);
    formData.append("roomNumber", data.roomNumber);
    formData.append("type", data.type);
    formData.append("status", data.status);
    formData.append("maxParticipants", data.maxParticipants || "");
    formData.append("registrationDeadline", data.registrationDeadline);
    formData.append("requireRegistration", data.requireRegistration);
    formData.append(
      "designatedParticipants",
      JSON.stringify(data.designatedParticipants),
    );
    formData.append("isPublic", data.isPublic);
    formData.append("isFeatured", data.isFeatured);
    formData.append("priority", data.priority);
    formData.append("organizerId", data.organizerId);

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    onSubmit(formData);
  };

  const handleDisableSave = () => {
    if (activity) {
      return !methods.formState.isDirty;
    }
    return !methods.formState.isValid;
  };

  return (
    <div className="w-full">
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-100 md:text-3xl">
        {activity ? "Edit Activity" : "Add New Activity"}
      </h2>

      {/* Tab navigation */}
      <div className="mb-5 flex flex-wrap gap-2 rounded-xl border border-gray-800 bg-gray-900 p-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              activeTab === index
                ? "bg-blue-500/20 text-blue-300"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(index)}
            type="button"
          >
            {tab.name}
          </button>
        ))}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSaveData)}
          className="mb-4 rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-xl md:p-6"
          encType="multipart/form-data"
        >
          {/* Hidden field để giữ organizerId */}
          <input
            type="hidden"
            {...methods.register("organizerId")}
            value={currentUser?.id}
          />

          {/* Render active tab content */}
          {tabs.map((tab, index) => (
            <div
              key={index}
              style={{ display: activeTab === index ? "flex" : "none" }}
            >
              <tab.component />
            </div>
          ))}

          <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
              disabled={handleDisableSave()}
            >
              {activity ? "Save Changes" : "Submit"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ActivityForm;
