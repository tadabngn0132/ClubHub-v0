import GDCLogo from "../../assets/logos/GDC_logo.svg";
import { Link } from "react-router-dom";

const About = () => {
  const highlights = [
    {
      number: "100+",
      label: "Active Members",
      desc: "Passionate dancers from all backgrounds",
    },
    {
      number: "50+",
      label: "Events Performed",
      desc: "University and regional performances",
    },
    {
      number: "4",
      label: "Years Active",
      desc: "Since 2022, growing stronger every day",
    },
    {
      number: "20+",
      label: "Award Winners",
      desc: "Recognized for excellence in dance",
    },
  ];

  const teamRoles = [
    { title: "Founders", count: "3", desc: "Vision makers who started it all" },
    {
      title: "Choreographers",
      count: "8",
      desc: "Creative talents behind our moves",
    },
    {
      title: "Dancers",
      count: "70+",
      desc: "Dedicated performers and trainees",
    },
    {
      title: "Support Team",
      count: "15+",
      desc: "Production, media, and logistics",
    },
  ];

  return (
    <div className="relative overflow-hidden flex flex-col w-full bg-black text-white">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl bg-pink-500/15 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full blur-3xl bg-blue-500/10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] pt-20 pb-32">
        <div className="flex flex-col items-center gap-8 max-w-4xl z-10">
          <img
            src={GDCLogo}
            alt="Greenwich Dance Crew"
            className="w-40 md:w-56 h-auto drop-shadow-lg"
          />

          <div className="text-center space-y-6">
            <h1 className="monument-extra-bold text-5xl md:text-7xl uppercase leading-tight">
              Greenwich
              <br />
              <span className="pink-color">Dance Crew</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto">
              Where passion meets movement. Creating art, building community,
              inspiring change.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <div className="px-6 py-3 rounded-full border border-pink-500/40 bg-pink-500/10 backdrop-blur-sm">
                <span className="text-white/90">Founded 2022</span>
              </div>
              <div className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                <span className="text-white/90">University of Greenwich</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] py-24 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 text-center hover:border-pink-500/30 transition-colors"
            >
              <div className="monument-extra-bold text-4xl md:text-5xl pink-color mb-2">
                {item.number}
              </div>
              <h3 className="monument-regular text-lg uppercase text-white/90 mb-2">
                {item.label}
              </h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About GDC */}
      <section className="relative px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="monument-extra-bold text-4xl md:text-5xl uppercase mb-12 text-center">
            Who We Are
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                Greenwich Dance Crew is more than a performance group—we're a
                collective of artists, innovators, and dreamers united by the
                power of dance. Since our founding in 2022, we've grown into a
                vibrant community of over 100 members across multiple styles.
              </p>

              <p className="text-lg text-white/80 leading-relaxed">
                Our journey has been marked by countless performances,
                international collaborations, and a steadfast commitment to
                elevating dance culture within our university and beyond. Every
                choreography, every practice, every performance tells the story
                of our collective passion.
              </p>

              <p className="text-lg text-white/80 leading-relaxed">
                We believe in the transformative power of movement—to express
                what words cannot, to connect across cultures, and to inspire
                the next generation of artists.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6">
                <h3 className="monument-regular text-xl pink-color uppercase mb-3">
                  Our Mission
                </h3>
                <p className="text-white/80">
                  To create a thriving space where dancers can grow creatively
                  and technically, pushing boundaries while respecting our roots
                  in contemporary and street dance.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
                <h3 className="monument-regular text-xl text-blue-400 uppercase mb-3">
                  Our Vision
                </h3>
                <p className="text-white/80">
                  To establish ourselves as a cultural force that sets the
                  standard for dance excellence, innovation, and community
                  impact across Southeast Asia.
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">
                <h3 className="monument-regular text-xl text-purple-400 uppercase mb-3">
                  Our Values
                </h3>
                <p className="text-white/80">
                  Creativity, Unity, and Discipline. We innovate fearlessly,
                  support each other unconditionally, and commit to excellence
                  in every move.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="relative px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] py-24 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="monument-extra-bold text-4xl md:text-5xl uppercase mb-12 text-center">
            Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamRoles.map((role, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 py-10 hover:border-pink-500/30 transition-colors"
              >
                <div className="monument-extra-bold text-5xl pink-color mb-3">
                  {role.count}
                </div>
                <h3 className="monument-regular text-lg uppercase text-white/90 mb-3">
                  {role.title}
                </h3>
                <p className="text-white/60 text-sm">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="monument-extra-bold text-4xl md:text-5xl uppercase mb-16 text-center">
            Our Journey
          </h2>

          <div className="space-y-8">
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="monument-extra-bold text-3xl pink-color">
                  2022
                </div>
              </div>
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#111111]/80 p-6">
                <h3 className="monument-regular text-xl uppercase text-white/90 mb-2">
                  Genesis
                </h3>
                <p className="text-white/75">
                  GreenWich Dance Crew is founded by a group of passionate
                  dancers at FPT University. A small team with a big vision to
                  transform dance culture.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start flex-row-reverse">
              <div className="flex-shrink-0">
                <div className="monument-extra-bold text-3xl pink-color">
                  2023
                </div>
              </div>
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#111111]/80 p-6">
                <h3 className="monument-regular text-xl uppercase text-white/90 mb-2">
                  Expansion
                </h3>
                <p className="text-white/75">
                  Membership grows to 50+ dancers. First major performances at
                  university events and regional competitions. Recognition
                  begins to build.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="monument-extra-bold text-3xl pink-color">
                  2024
                </div>
              </div>
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#111111]/80 p-6">
                <h3 className="monument-regular text-xl uppercase text-white/90 mb-2">
                  Recognition
                </h3>
                <p className="text-white/75">
                  Multiple award wins, collaborations with international
                  choreographers, and the launch of workshops training 100+
                  students across the community.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start flex-row-reverse">
              <div className="flex-shrink-0">
                <div className="monument-extra-bold text-3xl pink-color">
                  2025+
                </div>
              </div>
              <div className="flex-grow rounded-2xl border border-white/10 bg-[#111111]/80 p-6">
                <h3 className="monument-regular text-xl uppercase text-white/90 mb-2">
                  Legacy Building
                </h3>
                <p className="text-white/75">
                  100+ active members, 20+ performances, establishing mentorship
                  programs and aiming for regional leadership in dance culture
                  and education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)] py-24 bg-[#111111]/50">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border border-pink-500/40 bg-gradient-to-b from-pink-500/10 to-transparent p-12 md:p-16">
          <h2 className="monument-extra-bold text-3xl md:text-4xl uppercase mb-6">
            Ready to Move With Us?
          </h2>

          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Whether you're an experienced dancer or completely new to dance,
            there's a place for you in our crew. Let's create something
            extraordinary together.
          </p>

          <Link to="/apply-membership">
            <button className="monument-regular uppercase px-8 py-3 rounded-xl border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors duration-300 font-semibold">
              Join Our Crew
            </button>
          </Link>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-20" />
    </div>
  );
};

export default About;
