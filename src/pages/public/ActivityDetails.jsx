import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarDays,
  faClock,
  faLocationDot,
  faShareNodes,
  faUserGroup,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getPublicActivities,
  getPublicActivityBySlug,
} from "../../services/publicActivityService";
import ActivityRegistrationForm from "../../components/main/internal/ActivityRegistrationForm";

const mapStatus = (status) => {
  const value = String(status || "").toUpperCase();
  if (value === "COMPLETED") return "Completed";
  if (value === "ONGOING") return "Ongoing";
  return "Upcoming";
};

const formatDate = (isoValue) => {
  const date = new Date(isoValue);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTime = (isoValue) => {
  const date = new Date(isoValue);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
};

const getAgendaByType = (type) => {
  const commonAgenda = [
    {
      time: "18:30",
      title: "Check-in",
      note: "On-site welcome and attendance confirmation.",
    },
    {
      time: "19:00",
      title: "Opening",
      note: "Host briefing and event flow overview.",
    },
    { time: "20:45", title: "Wrap-up", note: "Announcements and group photo." },
  ];

  if (type === "WORKSHOP") {
    return [
      ...commonAgenda,
      {
        time: "19:20",
        title: "Technique Block",
        note: "Core drills and detailed corrections.",
      },
      {
        time: "20:10",
        title: "Practice Round",
        note: "Group execution and feedback session.",
      },
    ];
  }

  if (type === "PERFORMANCE") {
    return [
      ...commonAgenda,
      {
        time: "19:30",
        title: "Main Performance",
        note: "Featured lineup and stage concepts.",
      },
      {
        time: "20:20",
        title: "Guest Segment",
        note: "Special acts and collaboration stage.",
      },
    ];
  }

  return [
    ...commonAgenda,
    {
      time: "19:25",
      title: "Core Session",
      note: "Main interactive activity block.",
    },
    { time: "20:15", title: "Open Sharing", note: "Q&A and networking." },
  ];
};

const SPEAKERS = [
  {
    name: "Alex Nguyen",
    role: "Lead Choreographer",
    bio: "Specializes in stage composition and team synchronization for large showcases.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Lina Tran",
    role: "Performance Coach",
    bio: "Focuses on expression training and confidence-building for live performance.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Minh Vu",
    role: "Creative Producer",
    bio: "Designs visual concepts and media direction for dance campaigns.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=80",
  },
];

const getGalleryImages = (thumbnailUrl) => [
  thumbnailUrl,
  "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
];

const getVideoUrlByType = (type) => {
  if (type === "PERFORMANCE")
    return "https://www.youtube.com/embed/ScMzIvxBSi4";
  if (type === "WORKSHOP") return "https://www.youtube.com/embed/ysz5S6PUM-U";
  return "https://www.youtube.com/embed/tgbNymZ7vqY";
};

const ensureMetaTag = (selector, attributeName, attributeValue, content) => {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
  return tag;
};

const ActivityDetails = () => {
  const { slug } = useParams();
  const [activity, setActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadActivityData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [detailResponse, listResponse] = await Promise.all([
          getPublicActivityBySlug(slug),
          getPublicActivities(),
        ]);

        if (!detailResponse.success) {
          throw new Error(detailResponse.message || "Failed to load activity details");
        }

        if (!listResponse.success) {
          throw new Error(listResponse.message || "Failed to load related activities");
        }

        if (isMounted) {
          setActivity(detailResponse.data);
          setActivities(listResponse.data || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError?.response?.data?.message ||
              loadError.message ||
              "Failed to load activity details.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadActivityData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const uiActivity = useMemo(() => {
    if (!activity) return null;

    const status = mapStatus(activity.status);
    const startDate = activity.startDate;
    const endDate = activity.endDate;
    const registrationsCount = activity._count?.activityParticipations || 0;
    const maxParticipants = activity.maxParticipants || 0;

    return {
      id: activity.id,
      slug: activity.slug,
      title: activity.title,
      description: activity.description,
      shortDescription: activity.shortDescription,
      category: activity.category || activity.type,
      status,
      date: formatDate(startDate),
      time: `${formatTime(startDate)} - ${formatTime(endDate)} UTC`,
      startDate,
      location:
        activity.location || `${activity.venueName} - ${activity.venueAddress}`,
      venueName: activity.venueName,
      venueAddress: activity.venueAddress,
      thumbnailUrl: activity.thumbnailUrl,
      type: activity.type,
      registrationsCount,
      maxParticipants,
      availableSlots:
        activity.availableSlots ??
        Math.max(
          maxParticipants - registrationsCount,
          0,
        ),
      requireRegistration: activity.requireRegistration,
    };
  }, [activity]);

  const relatedActivities = useMemo(() => {
    if (!uiActivity) return [];

    const statusOrder = { Upcoming: 0, Ongoing: 1, Completed: 2 };

    return activities
      .map((item) => ({
        ...item,
        uiStatus: mapStatus(item.status),
      }))
      .filter((item) => item.slug !== uiActivity.slug)
      .sort((a, b) => {
        const sameTypeA = a.type === uiActivity.type ? 0 : 1;
        const sameTypeB = b.type === uiActivity.type ? 0 : 1;
        if (sameTypeA !== sameTypeB) return sameTypeA - sameTypeB;

        return statusOrder[a.uiStatus] - statusOrder[b.uiStatus];
      })
      .slice(0, 4);
  }, [uiActivity, activities]);

  const agenda = useMemo(
    () => getAgendaByType(uiActivity?.type),
    [uiActivity?.type],
  );
  const speakerProfiles = useMemo(
    () =>
      SPEAKERS.map((speaker, index) => ({
        ...speaker,
        id: `${speaker.name}-${index}`,
      })),
    [],
  );
  const galleryImages = useMemo(
    () => (uiActivity ? getGalleryImages(uiActivity.thumbnailUrl) : []),
    [uiActivity],
  );

  const mapsLink = uiActivity
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uiActivity.location)}`
    : "#";

  useEffect(() => {
    if (!uiActivity) return undefined;

    const previousTitle = document.title;
    document.title = `${uiActivity.title} | ClubHub Activities`;

    const ogTitleTag = ensureMetaTag(
      'meta[property="og:title"]',
      "property",
      "og:title",
      uiActivity.title,
    );
    const ogDescTag = ensureMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description",
      uiActivity.shortDescription || uiActivity.description,
    );
    const ogImageTag = ensureMetaTag(
      'meta[property="og:image"]',
      "property",
      "og:image",
      uiActivity.thumbnailUrl,
    );

    const ldJson = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: uiActivity.title,
      description: uiActivity.description,
      startDate: uiActivity.startDate,
      eventStatus:
        uiActivity.status === "Completed"
          ? "https://schema.org/EventCompleted"
          : "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [uiActivity.thumbnailUrl],
      location: {
        "@type": "Place",
        name: uiActivity.venueName,
        address: uiActivity.venueAddress,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "activity-ld-json";
    script.textContent = JSON.stringify(ldJson);
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      if (script.parentNode) script.parentNode.removeChild(script);
      ogTitleTag?.setAttribute("content", "ClubHub");
      ogDescTag?.setAttribute("content", "ClubHub activities and events");
      ogImageTag?.setAttribute("content", "");
    };
  }, [uiActivity]);

  const handleShare = (platform) => {
    if (!uiActivity) return;

    const pageUrl = window.location.href;
    const shareText = encodeURIComponent(`${uiActivity.title} - ClubHub`);
    const encodedUrl = encodeURIComponent(pageUrl);

    const urlMap = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(
      urlMap[platform],
      "_blank",
      "noopener,noreferrer,width=760,height=540",
    );
  };

  if (isLoading) {
    return (
      <main className="mx-auto mt-8 mb-12 w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-8 text-center text-white/70 md:p-12">
        Loading activity details from the database...
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto mt-8 mb-12 w-full max-w-4xl rounded-[2rem] border border-rose-400/30 bg-rose-500/10 p-8 text-center text-rose-100 md:p-12">
        {error}
      </main>
    );
  }

  if (!uiActivity) {
    return (
      <main className="mx-auto mt-8 mb-12 w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-8 text-white md:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
          Activity Details
        </p>
        <h1 className="monument-extra-bold mt-4 text-3xl uppercase">
          Activity Not Found
        </h1>
        <p className="mt-4 text-white/75">
          The activity you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/activities"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2 text-sm text-white transition-all duration-300 hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Activities
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] md:px-[var(--pub-container-padding-x)] text-white">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0f]">
        <div className="relative h-[260px] w-full sm:h-[320px] md:h-[400px]">
          <img
            src={uiActivity.thumbnailUrl}
            alt={uiActivity.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex items-start justify-between md:left-8 md:right-8">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </Link>

            <span
              className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${
                uiActivity.status === "Completed"
                  ? "border-white/30 bg-black/40 text-white"
                  : uiActivity.status === "Ongoing"
                    ? "border-[#DB3F7A]/70 bg-[#DB3F7A]/30 text-white"
                    : "border-[#DB3F7A] bg-[#DB3F7A] text-white"
              }`}
            >
              {uiActivity.status}
            </span>
          </div>

          <div className="absolute bottom-5 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
            <h1 className="monument-extra-bold text-3xl uppercase leading-tight sm:text-4xl md:text-5xl">
              {uiActivity.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em] text-white/85 md:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <FontAwesomeIcon icon={faCalendarDays} />
                {uiActivity.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                <FontAwesomeIcon icon={faClock} />
                {uiActivity.time}
              </span>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 transition-colors duration-300 hover:bg-[#DB3F7A]"
              >
                <FontAwesomeIcon icon={faLocationDot} />
                {uiActivity.location}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <article className="rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
            <h2 className="monument-extra-bold text-2xl uppercase">
              About This Event
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-white/80 md:text-base">
              <p>{uiActivity.description}</p>
              <p>
                This activity is designed to blend practical learning, team
                collaboration, and final execution outcomes in one complete
                experience cycle.
              </p>
              <p>
                Whether you are joining as a new member or returning
                participant, this event provides a clear structure, mentor
                support, and room for creative contribution.
              </p>
            </div>
          </article>

          {agenda?.length ? (
            <article className="rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
              <h2 className="monument-extra-bold text-2xl uppercase">
                Event Agenda
              </h2>
              <div className="mt-5 space-y-4">
                {agenda.map((item, index) => (
                  <div
                    key={`${item.time}-${item.title}`}
                    className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[110px_1fr]"
                  >
                    <p className="text-sm font-semibold text-[#DB3F7A]">
                      {item.time}
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-white/70">{item.note}</p>
                    </div>
                    {index !== agenda.length - 1 ? null : null}
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          <article className="rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
            <h2 className="monument-extra-bold text-2xl uppercase">
              Speakers & Performers
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {speakerProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    loading="lazy"
                    className="h-28 w-28 rounded-full object-cover"
                  />
                  <p className="mt-4 text-sm font-semibold text-white">
                    {profile.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#DB3F7A]">
                    {profile.role}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {profile.bio}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {uiActivity.status === "Completed" ? (
            <article className="rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
              <h2 className="monument-extra-bold text-2xl uppercase">
                Media Gallery
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      loading="lazy"
                      className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    title="Event highlight video"
                    src={getVideoUrlByType(uiActivity.type)}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <FontAwesomeIcon icon={faShareNodes} />
                    Share this event
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleShare("facebook")}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                    >
                      Facebook
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare("x")}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                    >
                      X
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare("linkedin")}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                    >
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <article className="rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/70">
              <FontAwesomeIcon icon={faUserGroup} />
              Participation
            </p>
            <div className="mt-3 text-sm text-white/80">
              <p>Registered: {uiActivity.registrationsCount}</p>
              <p>Capacity: {uiActivity.maxParticipants}</p>
              <p>Available slots: {uiActivity.availableSlots}</p>
            </div>
          </article>

          {uiActivity.status === "Upcoming" ? (
            <article className="rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6">
              <h2 className="monument-extra-bold text-xl uppercase">
                Registration Form
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Fill in your details to register for this activity.
              </p>

              <div className="mt-5">
                <ActivityRegistrationForm activityId={uiActivity.id} />
              </div>
            </article>
          ) : null}
        </aside>
      </section>

      <section className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
        <h2 className="monument-extra-bold text-2xl uppercase">
          Related Activities
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedActivities.map((item) => (
            <Link
              key={item.id}
              to={`/activities/${item.slug}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/60"
            >
              <img
                src={item.thumbnailUrl || uiActivity.thumbnailUrl}
                alt={item.title}
                loading="lazy"
                className="h-32 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">
                  {mapStatus(item.status)}
                </p>
                <p className="mt-2 text-sm font-semibold text-white line-clamp-2">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-white/65">
                  {formatDate(item.startDate)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-full border border-white/25 p-2 text-white hover:border-[#DB3F7A] hover:text-[#DB3F7A]"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev === 0 ? galleryImages.length - 1 : prev - 1,
              )
            }
            className="absolute left-4 rounded-full border border-white/25 p-3 text-white hover:border-[#DB3F7A]"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <img
            src={galleryImages[lightboxIndex]}
            alt={`Preview ${lightboxIndex + 1}`}
            className="max-h-[85vh] w-full max-w-5xl rounded-2xl object-contain"
          />

          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev === galleryImages.length - 1 ? 0 : prev + 1,
              )
            }
            className="absolute right-4 rounded-full border border-white/25 p-3 text-white hover:border-[#DB3F7A]"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      ) : null}
    </main>
  );
};

export default ActivityDetails;
