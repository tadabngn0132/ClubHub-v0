import { useMemo, useState } from "react";

const Activities = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const activities = [
    {
      id: 1,
      title: "Orientation Jam",
      type: "Workshop",
      status: "Upcoming",
      date: "Apr 05, 2026",
      location: "Studio A - Hall 3",
      description:
        "Intro session for new members with choreography basics, club culture, and team matching.",
      className: "md:col-span-7",
    },
    {
      id: 2,
      title: "Campus Flashmob",
      type: "Performance",
      status: "Upcoming",
      date: "Apr 18, 2026",
      location: "Central Courtyard",
      description:
        "Open-air performance activation designed to kick off recruitment week across campus.",
      className: "md:col-span-5",
    },
    {
      id: 3,
      title: "Content Sprint",
      type: "Production",
      status: "Ongoing",
      date: "Every Tue, 19:00",
      location: "Media Lab 2",
      description:
        "Weekly sprint for filming reels, behind-the-scenes stories, and social campaign assets.",
      className: "md:col-span-4",
    },
    {
      id: 4,
      title: "Technique Lab",
      type: "Workshop",
      status: "Ongoing",
      date: "Every Thu, 18:00",
      location: "Studio C",
      description:
        "Skill-focused class for footwork, musicality, and stage transition techniques.",
      className: "md:col-span-4",
    },
    {
      id: 5,
      title: "Spring Showcase",
      type: "Performance",
      status: "Completed",
      date: "Mar 20, 2026",
      location: "Main Auditorium",
      description:
        "End-of-season stage event featuring six concept sets and cross-team collaboration.",
      className: "md:col-span-4",
    },
    {
      id: 6,
      title: "Leadership Roundtable",
      type: "Internal",
      status: "Completed",
      date: "Mar 12, 2026",
      location: "Meeting Room B",
      description:
        "Strategic review with team leads to refine operations, pipeline, and event quality metrics.",
      className: "md:col-span-6",
    },
    {
      id: 7,
      title: "Partner Networking Night",
      type: "Networking",
      status: "Upcoming",
      date: "May 02, 2026",
      location: "Innovation Hub",
      description:
        "Evening meet-up with media partners, sponsors, and alumni to expand collaboration channels.",
      className: "md:col-span-6",
    },
  ];

  const filters = ["All", "Upcoming", "Ongoing", "Completed"];

  const filteredActivities = useMemo(() => {
    if (activeFilter === "All") {
      return activities;
    }

    return activities.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const statCards = [
    {
      label: "Total Activities",
      value: activities.length,
    },
    {
      label: "Upcoming",
      value: activities.filter((item) => item.status === "Upcoming").length,
    },
    {
      label: "Ongoing",
      value: activities.filter((item) => item.status === "Ongoing").length,
    },
  ];

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] md:px-[var(--pub-container-padding-x)]">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#f8d7b9]/40 bg-[radial-gradient(circle_at_16%_18%,_#ffe8cf_0%,_#f5c08a_40%,_#b75324_100%)] p-6 text-[#211208] sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-12 h-56 w-56 rounded-full bg-[#ffd5aa]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-[#8e2f08]/20 blur-3xl" />

        <div className="relative flex flex-col gap-8">
          <p className="monument-regular text-xs uppercase tracking-[0.28em] text-[#5f2e15]">
            Activities
          </p>

          <h1 className="monument-extra-bold uppercase text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
            Move, Build,
            <br />
            Perform
          </h1>

          <p className="max-w-2xl text-sm font-light leading-7 md:text-base">
            From training labs to stage showcases, every activity is designed as
            a complete cycle of learning, collaboration, and execution.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-[#7d3312]/35 bg-[#1d1008]/10 p-4"
              >
                <p className="monument-extra-bold text-2xl">{card.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-end gap-4">
            <div className="h-11 w-2 rounded-full bg-[#f0a160]" />
            <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
              Program Board
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive
                      ? "border-[#f0a160] bg-[#f0a160] text-[#211106]"
                      : "border-[#f0a160]/45 bg-[#251208] text-[#ffd8b6] hover:border-[#f0a160]/80"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {filteredActivities.map((item) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-[#f2b982]/35 bg-[#231006] p-5 text-[#ffdcb8] shadow-[0_24px_48px_rgba(16,5,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd2a5] ${item.className}`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#ffcf9a]/20 blur-2xl" />

              <div className="relative flex h-full flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#ffc890]">
                    {item.type}
                  </p>
                  <span className="rounded-full border border-[#f2b982]/45 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#ffd7b2]">
                    {item.status}
                  </span>
                </div>

                <h3 className="monument-extra-bold text-3xl uppercase leading-tight">
                  {item.title}
                </h3>

                <p className="text-sm font-light leading-7 text-[#ffcd9b]">
                  {item.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-3 text-xs uppercase tracking-[0.08em] text-[#ffc187]">
                  <span className="rounded-full bg-[#3f1e0f] px-3 py-1">
                    {item.date}
                  </span>
                  <span className="rounded-full bg-[#3f1e0f] px-3 py-1">
                    {item.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredActivities.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-[#f0a160]/50 bg-[#241107] p-8 text-center text-sm text-[#ffc993]">
            No activities in this status yet.
          </div>
        ) : null}
      </section>

      <section className="mt-10 rounded-[2rem] border border-[#efa35f]/35 bg-[#261208] p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="monument-regular text-xs uppercase tracking-[0.28em] text-[#ffbf87]">
              Join The Next Run
            </p>
            <h2 className="monument-extra-bold mt-3 text-3xl uppercase leading-tight text-[#ffddb9] sm:text-4xl">
              Bring Your Energy To
              <br />
              The Next Activity
            </h2>
          </div>

          <button
            type="button"
            className="monument-regular w-fit rounded-full border border-[#ffcf9e] px-6 py-2 text-xs uppercase tracking-[0.2em] text-[#ffcf9e] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffcf9e] hover:text-[#211106]"
          >
            Register Interest
          </button>
        </div>
      </section>
    </main>
  );
};

export default Activities;
