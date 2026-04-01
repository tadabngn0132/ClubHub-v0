import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { sampleActivityData } from "../../data/sampleActivityData";

const TIME_FILTERS = ["All", "Upcoming", "Ongoing", "Completed"];
const SORT_OPTIONS = [
  { value: "date_desc", label: "Day (newest)" },
  { value: "date_asc", label: "Day (oldest)" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
];
const PAGE_SIZE = 12;

const formatDateLabel = (isoDate) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "TBD";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const mapActivityStatus = (status) => {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "ONGOING") {
    return "Ongoing";
  }

  if (normalized === "COMPLETED") {
    return "Completed";
  }

  return "Upcoming";
};

const highlightText = (text, keyword) => {
  if (!keyword?.trim()) {
    return text;
  }

  const keywordLower = keyword.toLowerCase();
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === keywordLower ? (
      <mark key={`${part}-${index}`} className="rounded bg-[#DB3F7A] px-0.5 text-white">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

const Activities = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const [jumpError, setJumpError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedTimes, selectedCategories, debouncedSearch, sortBy]);

  const activities = useMemo(() => {
    return sampleActivityData.map((item) => {
      const category = item.category || item.type || "General";
      const dateISO = item.startDate || item.date;
      const location = item.location || [item.venueName, item.venueAddress].filter(Boolean).join(" - ") || "TBD";

      return {
        id: item.id,
        slug: item.slug,
        title: item.title || item.name || "Untitled Activity",
        category,
        status: mapActivityStatus(item.status),
        dateISO,
        dateLabel: item.dateLabel || formatDateLabel(dateISO),
        location,
        description: item.shortDescription || item.description || "No description available.",
        thumbnail: item.thumbnail || item.thumbnailUrl,
      };
    });
  }, []);

  const categoryFilters = useMemo(() => {
    return Array.from(new Set(activities.map((item) => item.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [activities]);

  const tabFiltered = useMemo(() => {
    const upcomingStatuses = ["Upcoming", "Ongoing"];

    return activities.filter((item) =>
      activeTab === "Upcoming"
        ? upcomingStatuses.includes(item.status)
        : item.status === "Completed",
    );
  }, [activeTab, activities]);

  const finalList = useMemo(() => {
    let result = [...tabFiltered];

    if (selectedTimes.length > 0 && !selectedTimes.includes("All")) {
      result = result.filter((item) => selectedTimes.includes(item.status));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((item) => selectedCategories.includes(item.category));
    }

    if (debouncedSearch) {
      const keyword = debouncedSearch.toLowerCase();
      result = result.filter((item) =>
        [item.title, item.location, item.description, item.category]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "date_desc") {
        return new Date(b.dateISO) - new Date(a.dateISO);
      }

      if (sortBy === "date_asc") {
        return new Date(a.dateISO) - new Date(b.dateISO);
      }

      if (sortBy === "name_asc") {
        return a.title.localeCompare(b.title, "vi");
      }

      return b.title.localeCompare(a.title, "vi");
    });

    return result;
  }, [tabFiltered, selectedTimes, selectedCategories, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(finalList.length / PAGE_SIZE));
  const clampedPage = Math.min(currentPage, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const paginatedActivities = finalList.slice(startIndex, startIndex + PAGE_SIZE);
  const fromResult = finalList.length === 0 ? 0 : startIndex + 1;
  const toResult = Math.min(startIndex + PAGE_SIZE, finalList.length);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const toggleFilter = (value, currentList, setter) => {
    if (value === "All") {
      setter(currentList.includes("All") ? [] : ["All"]);
      return;
    }

    const withoutAll = currentList.filter((item) => item !== "All");
    setter(
      withoutAll.includes(value)
        ? withoutAll.filter((item) => item !== value)
        : [...withoutAll, value],
    );
  };

  const clearFilters = () => {
    setSelectedTimes([]);
    setSelectedCategories([]);
    setSearchTerm("");
    setDebouncedSearch("");
    setSortBy("date_desc");
    setCurrentPage(1);
    setJumpToPage("");
    setJumpError("");
  };

  const handleJumpPage = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const value = Number(jumpToPage);
    if (!Number.isInteger(value) || value < 1 || value > totalPages) {
      setJumpError(`Please enter a page number from 1 to ${totalPages}.`);
      return;
    }

    setJumpError("");
    setCurrentPage(value);
  };

  return (
    <main className="w-full min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] md:px-[var(--pub-container-padding-x)]">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_16%_18%,_#1c1c1e_0%,_#0f0f10_55%,_#080809_100%)] p-6 text-white sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-12 h-56 w-56 rounded-full bg-[#DB3F7A]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-[#DB3F7A]/10 blur-3xl" />

        <div className="relative flex flex-col gap-8">
          <p className="monument-regular text-xs uppercase tracking-[0.28em] text-white/70">
            Activities & Events
          </p>

          <h1 className="monument-extra-bold uppercase text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
            Find The Right
            <br />
            Activity Fast
          </h1>

          <p className="max-w-2xl text-sm font-light leading-7 md:text-base">
            Explore all club activities, apply filters, and search instantly to
            find the events that match your interests.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Upcoming", "Past"].map((tab) => {
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? "border-[#DB3F7A] bg-[#DB3F7A] text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-[#DB3F7A]/70 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-5 sm:p-6 md:p-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <label
              htmlFor="activities-search"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/70"
            >
              Search
            </label>
            <input
              id="activities-search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search activities..."
              className="w-full rounded-2xl border border-white/20 bg-[#141416] px-4 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/45 focus:border-[#DB3F7A]"
            />
          </div>

          <div>
            <label
              htmlFor="activities-sort"
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/70"
            >
              Sort by
            </label>
            <select
              id="activities-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-[#141416] px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-[#DB3F7A]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <fieldset className="rounded-2xl border border-white/15 bg-[#121214] p-4">
            <legend className="px-2 text-xs uppercase tracking-[0.2em] text-white/70">
              Filter by time
            </legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {TIME_FILTERS.map((filter) => (
                <label
                  key={filter}
                  className="flex cursor-pointer items-center gap-2 text-sm text-white/90"
                >
                  <input
                    type="checkbox"
                    checked={selectedTimes.includes(filter)}
                    onChange={() =>
                      toggleFilter(filter, selectedTimes, setSelectedTimes)
                    }
                    className="h-4 w-4 rounded border-white/40 bg-[#141416] text-[#DB3F7A] focus:ring-[#DB3F7A]"
                  />
                  <span>{filter}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-white/15 bg-[#121214] p-4">
            <legend className="px-2 text-xs uppercase tracking-[0.2em] text-white/70">
              Filter by category
            </legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {categoryFilters.map((filter) => (
                <label
                  key={filter}
                  className="flex cursor-pointer items-center gap-2 text-sm text-white/90"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(filter)}
                    onChange={() =>
                      toggleFilter(
                        filter,
                        selectedCategories,
                        setSelectedCategories,
                      )
                    }
                    className="h-4 w-4 rounded border-white/40 bg-[#141416] text-[#DB3F7A] focus:ring-[#DB3F7A]"
                  />
                  <span>{filter}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-white/75">
          <p>
            Showing {fromResult}-{toResult} of {finalList.length} activities
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
          >
            Clear filters
          </button>
        </div>
      </section>

      <section className="mt-8">
        {paginatedActivities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/25 bg-[#121214] p-8 text-center text-sm text-white/75">
            <p className="text-base font-semibold text-white">No results found</p>
            <p className="mt-2">Suggestions:</p>
            <p className="mt-1">1. Try a shorter or different keyword.</p>
            <p>2. Remove some time or category filters.</p>
            <p>3. Click "Clear filters" to reset the full list.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedActivities.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121214] text-white shadow-[0_24px_48px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/70"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                </div>

                <div className="flex h-[calc(100%-11rem)] flex-col gap-4 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
                    <span>{highlightText(item.category, debouncedSearch)}</span>
                    <span className="rounded-full border border-[#DB3F7A]/50 px-3 py-1 text-[10px] tracking-[0.15em] text-white/90">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="monument-extra-bold text-2xl uppercase leading-tight text-white">
                    {highlightText(item.title, debouncedSearch)}
                  </h3>

                  <p className="text-sm font-light leading-7 text-white/75">
                    {highlightText(item.description, debouncedSearch)}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 text-xs uppercase tracking-[0.08em] text-white/80">
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {item.dateLabel}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {highlightText(item.location, debouncedSearch)}
                    </span>
                  </div>

                  <Link
                    to={`/activities/${item.slug}`}
                    className="mt-3 inline-flex w-fit rounded-full border border-[#DB3F7A]/60 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-5 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={clampedPage === 1}
            className="rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`h-9 min-w-9 rounded-full border px-3 text-sm transition-all duration-300 ${
                page === clampedPage
                  ? "border-[#DB3F7A] bg-[#DB3F7A] text-[#fff1f7]"
                  : "border-white/25 text-white/85 hover:border-[#DB3F7A]/70"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={clampedPage === totalPages}
            className="rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

          <div className="ml-auto flex w-full items-center justify-end gap-2 md:w-auto">
            <label
              htmlFor="jump-page"
              className="text-xs uppercase tracking-[0.14em] text-white/70"
            >
              Jump to page
            </label>
            <input
              id="jump-page"
              value={jumpToPage}
              onChange={(event) => {
                setJumpToPage(event.target.value.replace(/\D/g, ""));
                setJumpError("");
              }}
              onKeyDown={handleJumpPage}
              placeholder="Enter"
              className="w-20 rounded-full border border-white/25 bg-[#141416] px-3 py-2 text-center text-sm text-white outline-none placeholder:text-white/45 focus:border-[#DB3F7A]"
            />
          </div>
        </div>

        {jumpError ? (
          <p className="mt-3 text-sm text-[#DB3F7A]">{jumpError}</p>
        ) : null}
      </section>
    </main>
  );
};

export default Activities;
