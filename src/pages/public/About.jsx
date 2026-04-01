import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faGem,
  faTrophy,
  faGraduationCap,
  faMedal,
  faPeopleGroup,
  faCameraRetro,
  faUsers,
  faBullhorn,
  faCalendarDays,
  faPalette,
  faHeart,
  faGasPump,
  faGear,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const timelineMilestones = [
    {
      year: "2022",
      event: "Foundation",
      description:
        "Greenwich Dance Crew started as a small student-led team with one clear goal: create a disciplined, creative, and inclusive dance culture on campus.",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    },
    {
      year: "2023",
      event: "First Competitive Season",
      description:
        "The club entered regional showcases, ran internal training systems, and built a structured mentoring model between senior and junior members.",
      image:
        "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1000&q=80",
    },
    {
      year: "2024",
      event: "Cross-Club Collaboration",
      description:
        "GDC launched joint projects with other student organizations, expanding from pure performance into event production, media campaigns, and community activations.",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    },
    {
      year: "2025",
      event: "Regional Recognition",
      description:
        "With larger stages and stronger routines, the team earned multiple recognitions and strengthened its identity as a high-standard student performing collective.",
      image:
        "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const achievements = [
    {
      title: "Outstanding Student Initiative",
      year: "2024",
      category: "Academic",
      icon: faGraduationCap,
      description:
        "Recognized for integrating training, event operations, and peer mentoring into a student-led development model.",
    },
    {
      title: "Best Campus Performance",
      year: "2025",
      category: "Performance",
      icon: faTrophy,
      description:
        "Awarded for stage quality, choreography coherence, and audience engagement across annual headline events.",
    },
    {
      title: "Community Impact Recognition",
      year: "2025",
      category: "Community Service",
      icon: faPeopleGroup,
      description:
        "Honored for organizing dance workshops and outreach sessions that supported student well-being and social connection.",
    },
    {
      title: "Creative Production Excellence",
      year: "2023",
      category: "Performance",
      icon: faMedal,
      description:
        "Praised for combining performance, visual identity, and storytelling into a complete production experience.",
    },
    {
      title: "Student Leadership Award",
      year: "2024",
      category: "Academic",
      icon: faGraduationCap,
      description:
        "Awarded to the executive team for building transparent workflows and sustainable leadership transfer between generations.",
    },
    {
      title: "Campus Volunteer Champion",
      year: "2023",
      category: "Community Service",
      icon: faPeopleGroup,
      description:
        "Recognized for active support in student campaigns, charity showcases, and collaborative university events.",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1547153760-18fc9498041f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=900&q=80",
  ];

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-scroll-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-hidden w-full min-h-[var(--pub-main-min-height)] my-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] bg-black text-white">
      <div className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full bg-[#DB3F7A]/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-0 h-96 w-96 rounded-full bg-[#DB3F7A]/8 blur-3xl" />

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_18%_20%,_#1c1c1e_0%,_#080809_100%)] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">About Greenwich Dance Crew</p>
        <h1 className="monument-extra-bold mt-4 text-4xl uppercase leading-[1.04] sm:text-5xl md:text-7xl">
          Our Story,
          <br />
          Vision, Impact
        </h1>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-white/75 md:text-base">
          Explore how Greenwich Dance Crew evolved from a student initiative into a dynamic organization driven by creativity, discipline, and social impact.
        </p>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">History Timeline</h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-6 top-0 h-full w-px bg-white/15 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {timelineMilestones.map((milestone, index) => (
              <article
                key={milestone.year}
                data-scroll-reveal
                className={`relative opacity-0 translate-y-6 transition-all duration-700 ease-out ${
                  index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                }`}
              >
                <div className="absolute left-6 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-black bg-[#DB3F7A] md:left-1/2" />

                <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-5 md:p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#DB3F7A]">{milestone.year}</p>
                  <h3 className="monument-extra-bold mt-2 text-2xl uppercase">{milestone.event}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">{milestone.description}</p>

                  <img
                    src={milestone.image}
                    alt={`${milestone.year} milestone`}
                    className="mt-4 h-40 w-full rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">Vision, Mission, Values</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6">
            <div className="flex items-center justify-between">
              <h3 className="monument-regular text-xl uppercase">Vision</h3>
              <FontAwesomeIcon icon={faEye} className="text-[#DB3F7A]" />
            </div>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Greenwich Dance Crew envisions becoming a benchmark student arts organization recognized for artistic quality, leadership culture, and social impact. We aim to build a long-term creative ecosystem where students can continuously develop their craft, experiment with bold production ideas, and perform with professional standards. Our vision extends beyond stages: we want to shape responsible young leaders who can collaborate across disciplines, represent campus culture with confidence, and inspire wider communities through movement, storytelling, and meaningful creative work.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6">
            <div className="flex items-center justify-between">
              <h3 className="monument-regular text-xl uppercase">Mission</h3>
              <FontAwesomeIcon icon={faBullseye} className="text-[#DB3F7A]" />
            </div>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Our mission is to provide an inclusive, high-discipline environment where members improve both artistic and operational skills through real projects. We deliver structured training, collaborative rehearsals, and performance opportunities that challenge each member to grow in confidence, consistency, and stage presence. At the same time, we cultivate project management, communication, and team leadership through events and campaigns. By balancing creativity with execution, we help members become not only better dancers, but also stronger contributors in any professional or community setting.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6">
            <div className="flex items-center justify-between">
              <h3 className="monument-regular text-xl uppercase">Values</h3>
              <FontAwesomeIcon icon={faGem} className="text-[#DB3F7A]" />
            </div>
            <p className="mt-4 text-sm leading-7 text-white/75">
              We are grounded in three core values: creativity, unity, and discipline. Creativity encourages us to explore new styles and ideas without fear. Unity reminds us that meaningful achievements come from mutual trust, support, and accountability. Discipline ensures that every concept is transformed into a polished outcome through consistent effort and respect for process. These values shape how we rehearse, perform, and work together as a community. They also define how we represent the club: with integrity, ambition, and commitment to continuous improvement.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((award) => (
            <article
              key={`${award.title}-${award.year}`}
              className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/55"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#DB3F7A]">{award.category}</p>
                  <h3 className="monument-extra-bold mt-2 text-2xl uppercase leading-tight">{award.title}</h3>
                </div>
                <FontAwesomeIcon icon={award.icon} className="text-[#DB3F7A]" />
              </div>

              <p className="mt-3 text-sm text-white/60">Year: {award.year}</p>
              <p className="mt-3 text-sm leading-6 text-white/75">{award.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">Club Structure</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
            <article className="w-full max-w-sm rounded-xl border border-[#DB3F7A]/40 bg-[#DB3F7A]/10 p-4 text-center">
              <FontAwesomeIcon icon={faBrain} className="text-[#DB3F7A] text-xl" />
              <h3 className="monument-extra-bold mt-2 text-2xl uppercase">Executive Board</h3>
            </article>

            <div className="h-8 w-px bg-white/20" />

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <article className="rounded-xl border border-white/10 bg-[#111114] p-4 text-center">
                <FontAwesomeIcon icon={faBullhorn} className="text-[#DB3F7A]" />
                <p className="monument-regular mt-2 text-sm uppercase">Communications</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111114] p-4 text-center">
                <FontAwesomeIcon icon={faCalendarDays} className="text-[#DB3F7A]" />
                <p className="monument-regular mt-2 text-sm uppercase">Events</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111114] p-4 text-center">
                <FontAwesomeIcon icon={faPalette} className="text-[#DB3F7A]" />
                <p className="monument-regular mt-2 text-sm uppercase">Design</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111114] p-4 text-center">
                <FontAwesomeIcon icon={faUsers} className="text-[#DB3F7A]" />
                <p className="monument-regular mt-2 text-sm uppercase">Human Resources</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#111114] p-4 text-center">
                <FontAwesomeIcon icon={faGear} className="text-[#DB3F7A]" />
                <p className="monument-regular mt-2 text-sm uppercase">Logistics</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 pb-10">
        <div className="mb-6 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">Photo Gallery</h2>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <article
              key={image}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f]"
            >
              <img
                src={image}
                alt={`Club key moment ${index + 1}`}
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="pb-10">
        <div className="rounded-3xl border border-[#DB3F7A]/35 bg-[#DB3F7A]/10 p-8 text-center md:p-12">
          <FontAwesomeIcon icon={faCameraRetro} className="text-[#DB3F7A]" />
          <h2 className="monument-extra-bold mt-4 text-3xl uppercase md:text-4xl">Ready to be part of the journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            If you are looking for a place to grow creatively, build real teamwork experience, and perform with purpose, Greenwich Dance Crew is ready to welcome you.
          </p>
          <Link
            to="/apply-membership"
            className="monument-regular mt-6 inline-flex rounded-xl border border-[#DB3F7A] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#DB3F7A] transition-colors hover:bg-[#DB3F7A] hover:text-white"
          >
            Join Our Crew
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
