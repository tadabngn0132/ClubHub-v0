const Members = () => {
  const founders = [
    { name: "Dao Ha Trang", role: "Founder" },
    { name: "Tran Hoai Anh", role: "Co-Founder" },
    { name: "Mai Tien Anh", role: "Co-Founder" },
  ];

  const executiveBoard = [
    {
      name: "Nguyen Thai Manh",
      role: "President",
      bio: "Leads strategy, partnerships, and long-term growth for all club programs.",
    },
    {
      name: "Tran Bich Ngoc",
      role: "Vice President",
      bio: "Coordinates operations and ensures every project timeline is executed smoothly.",
    },
  ];

  const departments = [
    { name: "Dinh Tran Bao Ngoc", role: "Head of Performance" },
    { name: "Nguyen Nhu Khanh", role: "Head of Dance" },
    { name: "Nguyen Anh Quan", role: "Head of Communications" },
    { name: "Nguyen Tuan Minh", role: "Head of Content" },
    { name: "Le Duc Anh", role: "Head of Logistics" },
    { name: "Tran Thi Ha Anh", role: "Head of Human Resources" },
  ];

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] my-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)]">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#f7d8be]/40 bg-[radial-gradient(circle_at_14%_22%,_#ffe7ce_0%,_#f5c28d_38%,_#bd5928_100%)] p-6 text-[#1f1108] sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[#ffd8af]/45 blur-2xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[#8c3008]/20 blur-3xl" />

        <div className="relative flex flex-col gap-8">
          <p className="monument-regular text-xs uppercase tracking-[0.3em] text-[#5f2c14]">
            Members
          </p>

          <h1 className="monument-extra-bold uppercase text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
            Greenwich
            <br />
            Dance Crew
          </h1>

          <p className="max-w-2xl text-sm font-light leading-7 md:text-base">
            A community of student creators, performers, and project builders.
            Our people are organized to move ideas from rehearsal rooms to
            large-scale campus experiences.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#7e3614]/35 bg-[#1d1109]/10 p-4">
              <p className="text-2xl monument-extra-bold">03</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Founders
              </p>
            </div>
            <div className="rounded-2xl border border-[#7e3614]/35 bg-[#1d1109]/10 p-4">
              <p className="text-2xl monument-extra-bold">02</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Executive Board
              </p>
            </div>
            <div className="rounded-2xl border border-[#7e3614]/35 bg-[#1d1109]/10 p-4">
              <p className="text-2xl monument-extra-bold">06</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Department Heads
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#f0a160]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
            Founders
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#f0a160]/35 bg-[#251107] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-10 top-8 h-28 w-28 rounded-full bg-[#f8b477]/20 blur-2xl" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((member, index) => (
              <article
                key={member.name}
                className={`rounded-2xl border border-[#f5c395]/30 p-5 text-[#ffdcb8] shadow-[0_20px_40px_rgba(16,5,0,0.25)] transition-all duration-300 hover:-translate-y-1 ${
                  index % 2 === 0 ? "bg-[#3a1d0f]" : "bg-[#2f170c]"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#ffc993]">
                  {member.role}
                </p>
                <p className="monument-extra-bold mt-2 text-2xl uppercase">
                  {member.name}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 text-sm font-light leading-7 text-[#ffcc99] md:grid-cols-2">
            <p>
              Founders set the creative direction and culture standards across
              all club seasons.
            </p>
            <p className="md:text-right">
              They mentor new teams while preserving quality and identity
              through each generation.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#f0a160]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
            Executive Board
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-[2rem] border border-[#ef9f5c]/35 bg-[#211006] p-6 md:grid-cols-2 md:p-8">
          {executiveBoard.map((member, index) => (
            <article
              key={member.name}
              className={`relative overflow-hidden rounded-[1.75rem] border border-[#f4bc8a]/30 p-6 text-[#ffdcb8] shadow-[0_24px_50px_rgba(13,4,0,0.28)] ${
                index === 0 ? "bg-[#3a190b]" : "bg-[#2e1409]"
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#ffc98f]/20 blur-2xl" />
              <p className="relative text-[11px] uppercase tracking-[0.25em] text-[#ffc893]">
                {member.role}
              </p>
              <p className="relative monument-extra-bold mt-2 text-3xl uppercase leading-tight">
                {member.name}
              </p>
              <p className="relative mt-4 text-sm font-light leading-7 text-[#ffcc99]">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#f0a160]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
            Heads of Departments
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-[2rem] border border-[#efa15f]/35 bg-[#211006] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3 lg:p-6">
          {departments.map((member, index) => (
            <article
              key={member.name}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-[#f2bf8f]/25 p-5 text-[#ffdcb8] shadow-[0_22px_44px_rgba(13,4,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd1a2]/70 ${
                index % 2 === 0 ? "bg-[#3a1c0f]" : "bg-[#2f160a]"
              }`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#ffcc97]/20 blur-2xl" />

              <div className="relative flex h-full min-h-[12.5rem] flex-col justify-between gap-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#ffc892]">
                  {member.role}
                </p>

                <p className="monument-extra-bold text-2xl uppercase leading-tight sm:text-[1.65rem]">
                  {member.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Members;
