import {
  createActivity,
  getActivityById,
  updateActivityById
} from '../../../store/slices/activitySlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import ActivityBasicInfoSection from './ActivityBasicInfoSection.jsx'
import ActivityLocationSection from './ActivityLocationSection.jsx'
import ActivityDescriptionSection from './ActivityDescriptionSection.jsx'
import ActivityScheduleSection from './ActivityScheduleSection.jsx'


const ActivityForm = ({ mode, activityId }) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(0)
  const { currentUser } = useSelector((state) => state.auth)
  console.log('Activity ID:', activityId);
  
  const { activity } = useSelector((state) => state.activity)
  
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      shortDescription: '',
      slug: '',
      startDate: '',
      endDate: '',
      isOnline: false,
      location: '',
      meetLink: '',
      type: '',
      status: '',
      thumbnailUrl: '',
      images: [],
      videos: [],
      maxParticipants: null,
      registrationDeadline: '',
      requireRegistration: false,
      organizerId: currentUser?.id,
      isPublic: true,
      isFeatured: false,
      priority: 0
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { isValid } = methods.formState

  useEffect(() => {
    if (mode === 'edit') {
      dispatch(getActivityById(activityId))
      if (activity) {
        // Reset form with fetched activity data
        methods.reset({
          title: activity.title || '',
          description: activity.description || '',
          shortDescription: activity.shortDescription || '',
          slug: activity.slug || '',
          startDate: activity.startDate || '',
          endDate: activity.endDate || '',
          isOnline: activity.isOnline || false,
          location: activity.location || '',
          meetLink: activity.meetLink || '',
          createdAt: activity.createdAt || '',
          updatedAt: activity.updatedAt || '',
          type: activity.type || '',
          status: activity.status || '',
          thumbnailUrl: activity.thumbnailUrl || '',
          images: activity.images || [],
          videos: activity.videos || [],
          maxParticipants: activity.maxParticipants || null,
          registrationDeadline: activity.registrationDeadline || ''
        })
      }
    } else if (mode === 'add') {
      methods.reset({
        title: '',
        description: '',
        shortDescription: '',
        slug: '',
        startDate: '',
        endDate: '',
        isOnline: false,
        location: '',
        meetLink: '',
        createdAt: '',
        updatedAt: '',
        type: '',
        status: '',
        thumbnailUrl: '',
        images: [],
        videos: [],
        maxParticipants: null,
        registrationDeadline: ''
      })
    }
  }, [mode, activityId, methods])

  const tabs = [
    { name: 'Basic Info', component: ActivityBasicInfoSection },
    { name: 'Location', component: ActivityLocationSection },
    { name: 'Description', component: ActivityDescriptionSection },
    { name: 'Schedule', component: ActivityScheduleSection }
  ]

  const handleSaveData = (data) => {
    // Handle form submission for both add and edit modes
    if (mode === "add") {
      dispatch(createActivity(data))
    } else if (mode === "edit") {
      dispatch(updateActivityById(data))
    }
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">{mode === "add" ? "Add New Activity" : "Edit Activity"}</h2>
      
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
        >
          {/* Hidden field để giữ organizerId */}
          <input type="hidden" {...methods.register('organizerId')} value={currentUser?.id} />
          
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
              {mode === "add" ? "Add Activity" : "Update Activity"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ActivityForm