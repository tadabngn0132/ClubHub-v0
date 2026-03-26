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
      meetingPlatform: activity ? activity.meetingPlatform : "",
      meetingLink: activity ? activity.meetingLink : "",
      meetingId: activity ? activity.meetingId : "",
      meetingPassword: activity ? activity.meetingPassword : "",
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
      organizerId: currentUser?.id,
      isPublic: activity ? activity.isPublic : true,
      isFeatured: activity ? activity.isFeatured : false,
      priority: activity ? activity.priority : 0,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isValid } = methods.formState;

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
    formData.append("meetingPlatform", data.meetingPlatform);
    formData.append("meetingLink", data.meetingLink);
    formData.append("meetingId", data.meetingId);
    formData.append("meetingPassword", data.meetingPassword);
    formData.append("venueName", data.venueName);
    formData.append("venueAddress", data.venueAddress);
    formData.append("roomNumber", data.roomNumber);
    formData.append("type", data.type);
    formData.append("status", data.status);
    formData.append("maxParticipants", data.maxParticipants || "");
    formData.append("registrationDeadline", data.registrationDeadline);
    formData.append("requireRegistration", data.requireRegistration);
    formData.append("isPublic", data.isPublic);
    formData.append("isFeatured", data.isFeatured);
    formData.append("priority", data.priority);
    formData.append("organizerId", data.organizerId);

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    onSubmit(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {activity ? "Edit Activity" : "Add New Activity"}
      </h2>

      {/* Tab navigation */}
      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
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
          className="shadow-md rounded px-4 py-2 mb-4"
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

          <div className="flex items-center justify-between my-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!isValid}
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
