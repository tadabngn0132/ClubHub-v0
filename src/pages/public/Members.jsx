import { useEffect, useMemo, useState } from "react";
import { getClubStructure } from "../../services/publicService";

const Members = () => {
  const [clubStructure, setClubStructure] = useState({
    departments: [],
    positions: [],
    members: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");

  useEffect(() => {
    let isMounted = true;

    const loadClubStructure = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getClubStructure();

        if (!response.success) {
          throw new Error(response.message || "Failed to load club structure");
        }

        if (isMounted) {
          setClubStructure(response.data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError?.response?.data?.message ||
              loadError.message ||
              "Failed to load club structure.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadClubStructure();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizeText = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase();

  const formatLabel = (value) =>
    String(value || "")
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const departments = useMemo(
    () =>
      (clubStructure.departments || []).filter(
        (department) => department.isDeleted !== true,
      ),
    [clubStructure.departments],
  );

  const departmentMap = useMemo(() => {
    return new Map(departments.map((department) => [department.id, department]));
  }, [departments]);

  const positions = useMemo(
    () =>
      (clubStructure.positions || []).filter(
        (position) => position.isDeleted !== true,
      ),
    [clubStructure.positions],
  );

  const members = useMemo(
    () => (clubStructure.members || []).filter((member) => member.isDeleted !== true),
    [clubStructure.members],
  );

  const memberCards = useMemo(() => {
    return members.map((member) => {
      const primaryAssignment =
        member.userPosition?.find((assignment) => assignment.isPrimary) ||
        member.userPosition?.[0] ||
        null;
      const primaryPosition = primaryAssignment?.position || null;
      const departmentName =
        member.rootDepartment?.name ||
        primaryPosition?.department?.name ||
        "Unknown Department";

      return {
        id: member.id,
        name: member.fullname,
        avatarUrl: member.avatarUrl,
        email: member.email,
        departmentId: member.rootDepartment?.id || primaryPosition?.department?.id || null,
        departmentName,
        title: primaryPosition?.title || "Member",
        level: primaryPosition?.level || "MEMBER",
        systemRole: primaryPosition?.systemRole || "MEMBER",
        source: "member",
      };
    });
  }, [members]);

  const fallbackStructureCards = useMemo(() => {
    return positions.map((position) => {
      const department = departmentMap.get(position.departmentId);

      return {
        id: position.id,
        name: position.title,
        avatarUrl: null,
        email: null,
        departmentId: position.departmentId,
        departmentName: department?.name || position.department?.name || "Unknown Department",
        title: position.title,
        level: position.level,
        systemRole: position.systemRole,
        source: "position",
      };
    });
  }, [positions, departmentMap]);

  const displayCards = memberCards.length > 0 ? memberCards : fallbackStructureCards;

  const featuredDancers = useMemo(() => {
    const specialistCards = displayCards.filter((card) => {
      const normalizedDepartmentName = normalizeText(card.departmentName);

      return (
        normalizedDepartmentName === "committee department" ||
        normalizedDepartmentName.includes("committee")
      );
    });

    return specialistCards.length > 0 ? specialistCards : displayCards.slice(0, 4);
  }, [displayCards]);

  const executiveBoard = useMemo(() => {
    const boardCards = displayCards.filter((card) => {
      const normalizedTitle = normalizeText(card.title);
      return (
        card.level === "TOP_HEAD" ||
        card.level === "TOP_VICE_HEAD" ||
        normalizedTitle === "president" ||
        normalizedTitle === "vice president"
      );
    });

    return boardCards.length > 0 ? boardCards : displayCards.slice(0, 2);
  }, [displayCards]);

  const departmentHeads = useMemo(() => {
    const headCards = displayCards.filter((card) => card.level === "MIDDLE_HEAD");
    return headCards.length > 0 ? headCards : displayCards.filter((card) =>
      normalizeText(card.title).includes("head"),
    );
  }, [displayCards]);

  const departmentOptions = useMemo(() => {
    return [
      { id: "all", name: "All Departments" },
      ...departments.map((department) => ({
        id: String(department.id),
        name: department.name,
      })),
    ];
  }, [departments]);

  const groupOptions = [
    { id: "all", label: "All Members" },
    { id: "board", label: "Executive Board" },
    { id: "heads", label: "Department Heads" },
    { id: "members", label: "Members" },
  ];

  const filteredMembers = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return displayCards.filter((card) => {
      const matchesDepartment =
        selectedDepartmentId === "all" ||
        String(card.departmentId || "") === selectedDepartmentId;

      const cardGroup =
        card.level === "TOP_HEAD" || card.level === "TOP_VICE_HEAD"
          ? "board"
          : card.level === "MIDDLE_HEAD"
            ? "heads"
            : "members";

      const matchesGroup =
        selectedGroup === "all" || selectedGroup === cardGroup;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalizeText(
          `${card.name} ${card.title} ${card.departmentName} ${card.systemRole}`,
        ).includes(normalizedQuery);

      return matchesDepartment && matchesGroup && matchesQuery;
    });
  }, [displayCards, query, selectedDepartmentId, selectedGroup]);

  const stats = useMemo(() => {
    return {
      departments: departments.length,
      positions: positions.length,
      members: members.length || displayCards.length,
      executives: executiveBoard.length,
    };
  }, [departments.length, positions.length, members.length, displayCards.length, executiveBoard.length]);

  const resetFilters = () => {
    setQuery("");
    setSelectedDepartmentId("all");
    setSelectedGroup("all");
  };

  const getInitials = (value) => {
    const parts = String(value || "").trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
      return "?";
    }

    if (parts.length === 1) {
      return parts[0].slice(0, 1).toUpperCase();
    }

    return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
  };

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] my-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)]">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_16%_20%,_#1c1c1e_0%,_#0f0f10_55%,_#080809_100%)] p-6 text-white sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[#DB3F7A]/15 blur-2xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[#DB3F7A]/10 blur-3xl" />

        <div className="relative flex flex-col gap-8">
          <p className="monument-regular text-xs uppercase tracking-[0.3em] text-[#DB3F7A]">
            Members
          </p>

          <h1 className="monument-extra-bold uppercase text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
            Greenwich
            <br />
            Dance Crew
          </h1>

          <p className="max-w-2xl text-sm font-light leading-7 md:text-base">
            A public view of the club structure, built from live data in the
            database. Leadership, department heads, and current members are
            always pulled from the latest records.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl monument-extra-bold">{String(stats.executives).padStart(2, "0")}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Executive Board
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl monument-extra-bold">{String(stats.departments).padStart(2, "0")}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Department Heads
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl monument-extra-bold">{String(stats.positions).padStart(2, "0")}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Position Slots
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl monument-extra-bold">{String(stats.members).padStart(2, "0")}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Member Profiles
              </p>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="mt-10 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-8 text-center text-white/70">
          Loading club structure from the database...
        </section>
      ) : error ? (
        <section className="mt-10 rounded-[2rem] border border-rose-400/30 bg-rose-500/10 p-8 text-center text-rose-100">
          {error}
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-5 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
            Executive Board
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-6 md:grid-cols-2 md:p-8">
          {executiveBoard.map((member, index) => (
            <article
              key={member.id}
              className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 p-6 text-white shadow-[0_24px_50px_rgba(0,0,0,0.35)] ${
                index === 0 ? "bg-[#121214]" : "bg-[#141416]"
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#DB3F7A]/15 blur-2xl" />
              <p className="relative text-[11px] uppercase tracking-[0.25em] text-[#DB3F7A]">
                {formatLabel(member.level)}
              </p>
              <p className="relative monument-extra-bold mt-2 text-3xl uppercase leading-tight">
                {member.name}
              </p>
              <p className="relative mt-4 text-sm font-light leading-7 text-white/75">
                {member.title} in {member.departmentName}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
            Heads of Departments
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3 lg:p-6">
          {departmentHeads.map((member, index) => (
            <article
              key={member.id}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 p-5 text-white shadow-[0_22px_44px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/70 ${
                index % 2 === 0 ? "bg-[#121214]" : "bg-[#141416]"
              }`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#DB3F7A]/12 blur-2xl" />

              <div className="relative flex h-full min-h-[12.5rem] flex-col justify-between gap-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#DB3F7A]">
                  {formatLabel(member.level)}
                </p>

                <p className="monument-extra-bold text-2xl uppercase leading-tight sm:text-[1.65rem]">
                  {member.name}
                </p>

                <p className="text-sm font-light leading-7 text-white/70">
                  {member.title} in {member.departmentName}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-5 sm:p-6 md:p-8">
        <div className="mb-8 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-2xl uppercase leading-none sm:text-3xl md:text-4xl">
            Featured Dancers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {featuredDancers.map((member) => (
            <article
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-[0_18px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/70"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#1a1a1d] via-[#101012] to-[#050505]">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={`${member.name} portrait`}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl font-bold tracking-[0.2em] text-white/20">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#DB3F7A]">
                  {member.departmentName}
                </p>
                <p className="monument-extra-bold mt-2 text-2xl uppercase text-white">
                  {member.name}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {member.title}
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-white/25 bg-[#1a1a1d] py-2 text-[11px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                >
                  {member.email ? "Contact" : "Role Slot"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-5 sm:p-6 md:p-8">
        <div className="mb-8 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-2xl uppercase leading-none sm:text-3xl md:text-4xl">
            All Members & Filtering
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[1.5rem] border border-white/10 bg-[#121214] p-5 lg:sticky lg:top-24 lg:self-start">
            <p className="monument-regular text-xs uppercase tracking-[0.22em] text-[#DB3F7A]">
              Filter Crew
            </p>

            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                Department
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {departmentOptions.map((department) => (
                  <button
                    key={department.id}
                    type="button"
                    onClick={() => setSelectedDepartmentId(department.id)}
                    className={`rounded-full px-4 py-2 text-left text-sm transition-all ${
                      selectedDepartmentId === department.id
                        ? "border border-[#DB3F7A]/55 bg-[#DB3F7A]/20 text-[#fff1f7]"
                        : "border border-transparent bg-[#1a1a1d] text-white/65 hover:text-white"
                    }`}
                  >
                    {department.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                Group
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {groupOptions.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setSelectedGroup(group.id)}
                    className={`rounded-full px-4 py-2 text-left text-sm transition-all ${
                      selectedGroup === group.id
                        ? "border border-[#DB3F7A]/55 bg-[#DB3F7A]/20 text-[#fff1f7]"
                        : "border border-transparent bg-[#1a1a1d] text-white/65 hover:text-white"
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-8 w-full rounded-full border border-white/25 py-3 text-xs uppercase tracking-[0.2em] text-white/85 transition-colors hover:border-[#DB3F7A] hover:bg-[#DB3F7A] hover:text-white"
            >
              Reset Filters
            </button>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-xl">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/45">
                  Search
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find a member by name, title, or department..."
                  className="w-full rounded-xl border border-white/20 bg-[#141416] py-3 pl-20 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[#DB3F7A] focus:outline-none"
                />
              </div>

              <p className="text-sm text-white/70">
                Showing {filteredMembers.length} member
                {filteredMembers.length === 1 ? "" : "s"}
              </p>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/25 bg-[#121214] p-8 text-center">
                <p className="text-lg text-white">No members found.</p>
                <p className="mt-2 text-sm text-white/65">
                  Try changing the filters or clearing the search keyword.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredMembers.map((member) => (
                  <article
                    key={member.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-[0_18px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/70"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={`${member.name} portrait`}
                          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1a1d] via-[#101012] to-[#050505] text-4xl font-bold tracking-[0.2em] text-white/20">
                          {getInitials(member.name)}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#DB3F7A]">
                        {member.departmentName}
                      </p>
                      <p className="monument-extra-bold mt-2 text-2xl uppercase text-white">
                        {member.name}
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        {member.title}
                      </p>
                      <button
                        type="button"
                        className="mt-4 w-full rounded-full border border-white/25 bg-[#1a1a1d] py-2 text-[11px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                      >
                        {member.email ? "Profile" : "Role Slot"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Members;
