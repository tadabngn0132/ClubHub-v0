import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faCalendarCheck,
  faClapperboard,
  faBolt,
  faUsers,
  faWandMagicSparkles,
  faHandshake,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { getPublicActivities } from "../../services/publicActivityService";

const HERO_BACKGROUND_URL =
  "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/464611744_519155820938083_7847493753639758528_n.png?stp=dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=b895b5&_nc_ohc=xwLwb44seqgQ7kNvwGO1Qgn&_nc_oc=AdqTiksXBHYZZgCu-9vh93uQObr2p0DKwWrgkbRyLPHlJ9NjvjGNZ5CX8ny52jG0U5w&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=IM2p-zCStgOctODHyB59kw&_nc_ss=7b2a8&oh=00_Af5hLzlkBeGbdwzeTTGNbR8KfmeCkwkZ19ZhF97BGHlgWg&oe=6A01DAF2";

const TIKTOK_TOTAL_VIEWS = 5200000;
const CURRENT_MEMBERS = 68;
const FOUNDATION_YEAR = 2022;

const formatDateLabel = (isoDate) => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const trimWords = (text, wordLimit = 50) => {
  if (!text) {
    return "No description available.";
  }

  const words = text.split(/\s+/).filter(Boolean);

  if (words.length <= wordLimit) {
    return words.join(" ");
  }

  return `${words.slice(0, wordLimit).join(" ")}...`;
};

const formatLargeNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }

  return value.toString();
};

const StatCounter = ({ endValue, label, icon, suffix = "", formatter }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1400;
    const start = performance.now();

    const updateValue = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(endValue * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateValue);
      }
    };

    frameId = requestAnimationFrame(updateValue);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [endValue]);

  return (
    <article className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">{label}</p>
        <FontAwesomeIcon icon={icon} className="text-[#DB3F7A]" />
      </div>

      <p className="monument-extra-bold mt-4 text-4xl text-white">
        {formatter ? formatter(value) : value}
        {suffix}
      </p>
    </article>
  );
};

const Home = () => {
  const [rawActivities, setRawActivities] = useState([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [activitiesError, setActivitiesError] = useState("");

  const featuredLayoutClasses = [
    "md:col-span-4 md:row-span-2",
    "md:col-span-3 md:row-span-3",
    "md:col-span-4 md:row-span-3",
    "md:col-span-3 md:row-span-2",
    "md:col-span-3 md:row-span-1",
    "md:col-span-4 md:row-span-1",
  ];

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        setIsLoadingActivities(true);
        setActivitiesError("");

        const response = await getPublicActivities();

        if (!response.success) {
          throw new Error(response.message || "Failed to load activities");
        }

        if (isMounted) {
          setRawActivities(response.data || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setActivitiesError(
            loadError?.response?.data?.message ||
              loadError.message ||
              "Failed to load activities.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingActivities(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  const coreValues = useMemo(
    () => [
      {
        title: "Discipline",
        icon: faBolt,
        description:
          "Every training session and project follows clear goals, transparent workflows, and a commitment to quality execution.",
      },
      {
        title: "Teamwork",
        icon: faUsers,
        description:
          "Team spirit is our foundation. We support one another to consistently achieve results beyond expectations.",
      },
      {
        title: "Creativity",
        icon: faWandMagicSparkles,
        description:
          "Every activity encourages bold ideas, combining performance art with modern communication and storytelling.",
      },
      {
        title: "Connection",
        icon: faHandshake,
        description:
          "The club connects students, alumni, and partners to build long-term growth and meaningful opportunities.",
      },
    ],
    []
  );

  const featuredActivities = useMemo(() => {
    return rawActivities
      .filter((activity) => activity.isFeatured === true)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
      .slice(0, 6)
      .map((activity) => ({
        id: activity.id,
        slug: activity.slug,
        title: activity.title || "Untitled Activity",
        dateLabel: formatDateLabel(activity.startDate),
        thumbnailUrl:
          activity.thumbnailUrl ||
          "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=800&fit=crop",
        description: trimWords(activity.shortDescription || activity.description, 50),
      }));
  }, [rawActivities]);

  const clubOverviewText =
    "Greenwich Dance Crew is a student-led community where young creators train, collaborate, and turn ideas into impactful projects. From skills workshops and stage productions to media campaigns, the club helps members grow their artistic mindset, execution capability, and teamwork in real environments. We believe every individual can shine when supported by a culture that values discipline, openness, and inspiration. Beyond dance, this is a space to build confidence, leadership, and lifelong connections.";

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)]">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 min-h-[22rem] md:min-h-[30rem]">
        <img
          src={HERO_BACKGROUND_URL}
          alt="Greenwich Dance Crew Hero Banner"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,_rgba(219,63,122,0.25)_0%,_transparent_48%)]" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.28em] text-white/70">Greenwich Dance Crew</p>
          <h1 className="monument-extra-bold mt-4 max-w-3xl text-4xl uppercase leading-[1.02] text-white sm:text-5xl md:text-7xl">
            Where passion
            <br />
            meets discipline
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 md:text-base">
            Together, we build a professional student stage powered by creativity,
            accountability, and community connection.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="monument-regular inline-flex items-center gap-2 rounded-full bg-[#DB3F7A] px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#c8366e]"
            >
              Learn More
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </Link>

            <Link
              to="/apply-membership"
              className="monument-regular inline-flex items-center rounded-full border border-white/25 bg-black/25 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-[#DB3F7A] hover:text-[#DB3F7A]"
            >
              Join as a Member
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <article className="rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-6 lg:col-span-7 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">Club Overview</p>
          <h2 className="monument-extra-bold mt-4 text-3xl uppercase text-white md:text-4xl">
            We create
            <br />
            real value
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/75 md:text-base">{clubOverviewText}</p>
        </article>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
          {coreValues.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-5 transition-all duration-300 hover:border-[#DB3F7A]/55"
            >
              <div className="flex items-center justify-between">
                <p className="monument-regular text-lg uppercase text-white">{value.title}</p>
                <FontAwesomeIcon icon={value.icon} className="text-[#DB3F7A]" />
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none text-white sm:text-4xl">
            Club Statistics
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter endValue={CURRENT_MEMBERS} label="Current members" icon={faPeopleGroup} />
          <StatCounter endValue={FOUNDATION_YEAR} label="Founded in" icon={faCalendarCheck} />
          <StatCounter
            endValue={rawActivities.length}
            label="Events organized"
            icon={faClapperboard}
          />
          <StatCounter
            endValue={TIKTOK_TOTAL_VIEWS}
            label="Total TikTok views"
            icon={faTiktok}
            formatter={formatLargeNumber}
          />
        </div>
      </section>

      <section className="mt-12 pb-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
            <h2 className="monument-extra-bold text-3xl uppercase leading-none text-white sm:text-4xl">
              Featured Activities
            </h2>
          </div>

          <Link
            to="/activities"
            className="hidden rounded-full border border-[#DB3F7A] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#DB3F7A] transition-colors hover:bg-[#DB3F7A] hover:text-white md:inline-flex"
          >
            View all activities
          </Link>
        </div>

        {isLoadingActivities ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 text-sm text-white/70">
            Loading featured activities...
          </div>
        ) : activitiesError ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-900/10 p-6 text-sm text-red-200">
            {activitiesError}
          </div>
        ) : featuredActivities.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 text-sm text-white/70">
            No featured activities available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:auto-rows-[minmax(9rem,_auto)] md:grid-cols-7">
            {featuredActivities.map((activity, index) => (
              <article
                key={activity.id}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-6 ${
                  featuredLayoutClasses[index] || "md:col-span-3 md:row-span-1"
                }`}
              >
                {activity.thumbnailUrl ? (
                    <img
                      src={activity.thumbnailUrl}
                      alt={activity.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-[#DB3F7A]/30 bg-[#DB3F7A]/20 text-4xl font-bold text-white/80">
                      {(activity.title || "").slice(0, 1).toUpperCase()}
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/70 to-black/85" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#DB3F7A]/20 blur-2xl" />

                <div className="relative flex h-full flex-col">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">{activity.dateLabel}</p>

                  <h3 className="monument-extra-bold mt-3 text-2xl uppercase leading-tight md:text-3xl">
                    {activity.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-xs font-light leading-6 text-white/80 md:text-sm">
                    {activity.description}
                  </p>

                  <Link
                    to={`/activities/${activity.slug}`}
                    className="mt-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#DB3F7A] transition-colors hover:text-[#ef6b9b] md:mt-auto"
                  >
                    View details
                    <FontAwesomeIcon icon={faArrowRight} size="sm" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <Link
          to="/activities"
          className="mt-6 inline-flex rounded-full border border-[#DB3F7A] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#DB3F7A] transition-colors hover:bg-[#DB3F7A] hover:text-white md:hidden"
        >
          View all activities
        </Link>
      </section>
    </main>
  );
};

export default Home;
