import activityItem01 from "../../assets/items/activites-items-01.webp";

const Home = () => {
  const highlights = [
    {
      title: "Mini Project",
      subtitle: "Twist",
      description:
        "A fast-paced production sprint where students move from concept to final showcase in just two weeks.",
      details:
        "Participants rotate through direction, set design, visual styling, and event operations to build real execution skills.",
      className: "md:col-span-4 md:row-span-2",
    },
    {
      title: "Career Fair",
      subtitle: "2025",
      description:
        "A campus-wide networking day connecting clubs, student leads, and industry partners.",
      details:
        "Portfolio reviews, mock interviews, and mini mentoring booths are curated to match student career tracks.",
      className: "md:col-span-3 md:row-span-3",
    },
    {
      title: "Photoshoot",
      subtitle: "Campaign",
      description:
        "Seasonal visual campaign for club identity, social channels, and recruitment materials.",
      details:
        "Built around studio portraits, editorial direction, and motion snippets for launch week assets.",
      className: "md:col-span-4 md:row-span-3",
    },
    {
      title: "Club Fair",
      subtitle: "2025",
      description:
        "The largest student activity opening where each organization presents live experiences.",
      details:
        "Traffic planning, booth strategy, and storytelling format help each club stand out from the first minute.",
      className: "md:col-span-3 md:row-span-2",
    },
    {
      title: "Student Honoring",
      subtitle: "SUM25",
      description:
        "Recognition night for exceptional contribution in leadership and community projects.",
      details:
        "The ceremony combines stage production, media recap, and partner acknowledgements for a full showcase.",
      className: "md:col-span-3 md:row-span-1",
    },
    {
      title: "Opening Ceremony",
      subtitle: "2025",
      description:
        "A dramatic launch event setting the visual and narrative direction for the semester.",
      details:
        "Sound, lighting, and staging are coordinated as one experience to introduce all headline activities.",
      className: "md:col-span-4 md:row-span-1",
    },
    {
      title: "Casting Call",
      subtitle: "Result",
      description:
        "Final shortlist reveal for MCs, performers, and production volunteers.",
      details:
        "Selections prioritize communication, teamwork, and ability to perform in high-pressure live programs.",
      className: "md:col-span-7 md:row-span-1",
    },
  ];

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)]">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#f6d9b8]/40 bg-[radial-gradient(circle_at_top_left,_#ffe8cf_0%,_#f8c48c_42%,_#bf5a2b_100%)] p-6 text-[#1d1007] sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full bg-[#ffd6a4]/40 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-[#8f340a]/20 blur-3xl" />

        <div className="relative flex flex-col gap-10">
          <p className="ml-auto max-w-md text-right text-sm font-light leading-6 md:text-base">
            ClubHub curates a season of student-led projects where creativity,
            operations, and collaboration meet in one shared stage.
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="monument-extra-bold uppercase text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              Project:
              <br />
              <span className="monument-regular">Stages of Love</span>
            </h1>

            <button className="monument-regular w-fit rounded-full border border-[#1d1007] px-7 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d1007] hover:text-[#ffe8cf]">
              Explore More
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-10">
        <img
          className="h-full w-9/12 md:w-[30rem] object-cover opacity-90 mix-blend-screen"
          src={activityItem01}
          alt="Featured Activities"
        />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:auto-rows-[minmax(9rem,_auto)] md:grid-cols-7">
        {highlights.map((item) => (
          <article
            key={item.title}
            className={`group relative overflow-hidden rounded-[2rem] border border-[#e7a15c]/40 bg-[#211007] p-5 text-[#ffddb8] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd1a0] hover:shadow-[0_24px_60px_rgba(18,6,1,0.28)] md:p-6 ${item.className}`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f3bb84]/20 blur-2xl" />

            <div className="relative flex h-full flex-col">
              <h3 className="monument-extra-bold text-2xl uppercase leading-tight md:text-3xl">
                {item.title}
                <br />
                <span className="monument-regular">{item.subtitle}</span>
              </h3>

              <p className="mt-4 max-w-sm text-xs font-light leading-6 md:text-sm">
                {item.description}
              </p>

              <p className="mt-3 text-xs font-light leading-6 text-[#ffc890] md:mt-auto md:text-sm">
                {item.details}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
