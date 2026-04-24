import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Members = () => {
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

  const danceStyles = [
    "All Styles",
    "Hip-hop",
    "K-pop",
    "Popping",
    "Waacking",
    "Breaking",
    "Choreography",
    "Girl Style",
  ];

  const positions = [
    "All Positions",
    "Performance",
    "Media",
    "Communication",
    "Logistics",
    "Content",
    "Human Resources",
    "Finance",
  ];

  const allMembers = [
    {
      name: "Quoc Anh",
      style: "Hip-hop",
      position: "Media",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnzdqkY94ZWtWGBJOtjIl0ZRJzcB6adX8JYeY-uLgwLR54xWhbqKerMepPi15LL4gE_17w5BigiTjJjEEq8HdHttb-Q6UNAn408sVkL5SoUFQ8Z4SSLGXxHth7mdmTP8k73vFiwq1rFrwRfwV43IyhBHQ8qiw84pXB2DQG3__7E1i20iXt-8xAta-G7Ew1kjC2sJsA-DMqZ4eiJrMn1hN9ZIQaw93BrNEGcyNAMVVfKyXFVEmFAUnbMChEnUEpOQ88dC5qCVcSFKs",
    },
    {
      name: "Bich Ngoc",
      style: "Girl Style",
      position: "Content",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAAyAG9gXfmDsEbmhQgYe88fzacGMcvvqC3AFqjT4rB1wl-lrDm_fYO-cCv7J8dGTriD1HXntPV_ApaBZU9S781K-4ZqfY7k6dBDUWOwmZ8OEdaA0tpLHfs-bbtSP4XRkfnma2GgOggwEdD4ovIVtV0AjEEo6cRL1XcmOhJYixhPIQIPhdB8jbI73CFOcnY_fhlUQngzWmGzx5o3xb9mveJZdP691kfySzNYJ_cNlpc17pS1d33kc14PxvFM3oRyYQ_NSilfE4-Weo",
    },
    {
      name: "Duc Thang",
      style: "Breaking",
      position: "Logistics",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDugrj-Kcp448gKyRd8oHssO7iyXMug8H012n8kFU55NC3VwaWB26KRBNBy9yQnDR9W-M0dmYincjFUJuMiBmw-nuAiC4g5F07z2BSOf513AhBqIfrAnVdneEOIwDlEbmcTcZRZTV1SzgVCE0fcpMz0HsPcqCi5pXGqmeBCAyDLVXYixcjCD-ySgqiQ6ZCNjWmy2YUS13ImD70J3f740ReKHc437YdzQSuUxdjPEKDEDXwpUkPO8iPPkTDfFSgYDTMYWDwN_iz4SMQ",
    },
    {
      name: "Khanh Linh",
      style: "Choreography",
      position: "Human Resources",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDkpMj8DjzTRRQ7eUzNUNyrNoHoPKS0kqS_87Vf6MJsFT7YOPXjL3bWZ2sDJ7dqWMb9fCwaP9iaU0k0kg9xYJjPaW2rS1wz_t-yy_k6T-g2Le_xiF18TSak8WjUs4QfGqeEa-Nw51b9IE9FLhCdfcacuXqDDEfnTKqxuQhhw8OyUGOugZmozC6q_GtdjsbmTjuRYQxdcLp63pij2AREJbTjfA5ZGWqxKAsTss-EbvXawlcuy-Y6ZyZGviOUphg60rgFP-XBh_LpobM",
    },
    {
      name: "Hoang Long",
      style: "Popping",
      position: "Media",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDs1-Aom-CUzjTmY4_gH_9z3t9ZEOEzX-XxHCNpjg-eOLCK1LJC845iUMmojzJYMALkH39sKF168s8bW1H5UG4DAYQdu7_9fJPnwISwI63T8Bj3Qs_Z7NN3bokXiuyOqzJ4xo3GJfqA2xaJ57I1f1mKC7sdW4TPqDmT9QHOOwqAsSrQ2E-Reyd1f31K8lbuacDxmCyACUPggN6Nqo9p5KwAOqoKhAkSy_sjo2TlVF1Z8TXb54qLE8Nxzo0-DG_7Mof5C61_GNm3dO0",
    },
    {
      name: "Mai Anh",
      style: "Waacking",
      position: "Finance",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBuImHFemtCv3gPuEA_w586sjONQ5WeiF9yTcgKtBnqriP2AusBq4wq3RBcXbPGZm8vtLPTmc3d2CnJ4945DAa_StPvwMFbarteUdAai5zH9L1D5huqtUMSjZsaBr-6uONe9hCZopPhrnc_MHUBwhqL9UHOYiHk8t_SMa16rzuZDGZ5fhUhV4s6MLgzRd08y7mi23sBk4yzrKa2U3R7XqCwiZ8kPgavUrD7YYNB7etfUCCbfkX3IqXXLcRBb1WESIZ5vuIXb8hVbJs",
    },
    {
      name: "Thanh Nam",
      style: "Hip-hop",
      position: "Logistics",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAztGD_BW1qKsjGw85-ofosE2lwBGSkvWlEU02VeVMmSZkoHugNqM038q95GMXBtu-Dqevv1a-p6yQ5BSvxR1iaSe1Ow6wYWX21UmjG6DhXBv_q9s_RfZBH8nLJPxQ4zLOPTi8pcNcyoLi6P0em94yqLBcT8dlJut56Q0tO_WsLC1ORlgnX1koyRYS7uZVDm2RYhIJQZdgBwVZyQAkhEXKIzcqIik5uFJCI0xmuir37VcDvlGxAZe0Frjv36bYQ7fe1bpmNbilhFJ8",
    },
    {
      name: "Huyen Trang",
      style: "K-pop",
      position: "Media",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsrAUImzQc2kM_r7kuLuLjmJzzokqdI_wywnkS90mj_a2s_Z0fdW_ss4ly6wy7xutMBqxM4EqKIC-9IlNgricGhO8P-HF0F4vjyDudmWNvNkeqln2KZBolqJEHXDbe6eEQ4XHytLl6sfeTe7-v_5Jlct_frYfPnIDEmgKURGK8e29wwRZ0sYOfMbKIEuXB34hX-1leaHdNsfyheXGFraHg7s6D5gFBXkBm590dAmfv3uYtRg3bxNPsVVkCS26X3vcKgtgmBx5JZQk",
    },
  ];

  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");
  const [selectedPosition, setSelectedPosition] = useState("All Positions");
  const [activeDancerIndex, setActiveDancerIndex] = useState(0);

  const featuredDancers = [
    {
      name: "Nguyen Hien Giang",
      tags: ["Performer", "Choreographer"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBn96G6LKlnF161LVIxL9dmUpR_mWyoVhRdT17N7bY0Cd44-HwlsIW5c7xHF440_fiPlWXc9y1B-rbfapzyShFsc3S0GqqO7RJODpC9HTYHBWmyeSPxc8gMrDyMt14S_8Et1yD6Iv-y7QJ0Lj1Xov0sIh5xlyU1nFhYUsU0SBBMzMDu3vX35DQBIfp8aq4TUe1s6JqoJK2QPTM_4VIyhZjmadBZe8oqSliISfcz60W4Jo7cdLIrjt5w6P9hNeK--UUreJ7TWFudc1Y",
    },
    {
      name: "Tran Bich Ngoc",
      tags: ["Girl Style", "Content"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAAyAG9gXfmDsEbmhQgYe88fzacGMcvvqC3AFqjT4rB1wl-lrDm_fYO-cCv7J8dGTriD1HXntPV_ApaBZU9S781K-4ZqfY7k6dBDUWOwmZ8OEdaA0tpLHfs-bbtSP4XRkfnma2GgOggwEdD4ovIVtV0AjEEo6cRL1XcmOhJYixhPIQIPhdB8jbI73CFOcnY_fhlUQngzWmGzx5o3xb9mveJZdP691kfySzNYJ_cNlpc17pS1d33kc14PxvFM3oRyYQ_NSilfE4-Weo",
    },
    {
      name: "Duc Thang",
      tags: ["Breaking", "Logistics"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDugrj-Kcp448gKyRd8oHssO7iyXMug8H012n8kFU55NC3VwaWB26KRBNBy9yQnDR9W-M0dmYincjFUJuMiBmw-nuAiC4g5F07z2BSOf513AhBqIfrAnVdneEOIwDlEbmcTcZRZTV1SzgVCE0fcpMz0HsPcqCi5pXGqmeBCAyDLVXYixcjCD-ySgqiQ6ZCNjWmy2YUS13ImD70J3f740ReKHc437YdzQSuUxdjPEKDEDXwpUkPO8iPPkTDfFSgYDTMYWDwN_iz4SMQ",
    },
    {
      name: "Quoc Anh",
      tags: ["Hip-hop", "Media"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnzdqkY94ZWtWGBJOtjIl0ZRJzcB6adX8JYeY-uLgwLR54xWhbqKerMepPi15LL4gE_17w5BigiTjJjEEq8HdHttb-Q6UNAn408sVkL5SoUFQ8Z4SSLGXxHth7mdmTP8k73vFiwq1rFrwRfwV43IyhBHQ8qiw84pXB2DQG3__7E1i20iXt-8xAta-G7Ew1kjC2sJsA-DMqZ4eiJrMn1hN9ZIQaw93BrNEGcyNAMVVfKyXFVEmFAUnbMChEnUEpOQ88dC5qCVcSFKs",
    },
  ];

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allMembers.filter((member) => {
      const matchStyle =
        selectedStyle === "All Styles" || member.style === selectedStyle;
      const matchPosition =
        selectedPosition === "All Positions" ||
        member.position === selectedPosition;
      const matchQuery =
        normalizedQuery.length === 0 ||
        `${member.name} ${member.style} ${member.position}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchStyle && matchPosition && matchQuery;
    });
  }, [allMembers, query, selectedStyle, selectedPosition]);

  const resetFilters = () => {
    setQuery("");
    setSelectedStyle("All Styles");
    setSelectedPosition("All Positions");
  };

  const goToPrevDancer = () => {
    setActiveDancerIndex((current) =>
      current === 0 ? featuredDancers.length - 1 : current - 1,
    );
  };

  const goToNextDancer = () => {
    setActiveDancerIndex((current) =>
      current === featuredDancers.length - 1 ? 0 : current + 1,
    );
  };

  const getRelativeOffset = (index) => {
    const total = featuredDancers.length;
    let offset = index - activeDancerIndex;

    if (offset > total / 2) {
      offset -= total;
    }

    if (offset < -total / 2) {
      offset += total;
    }

    return offset;
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
            A community of student creators, performers, and project builders.
            Our people are organized to move ideas from rehearsal rooms to
            large-scale campus experiences.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-2xl monument-extra-bold">02</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em]">
                Executive Board
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
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
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-3xl uppercase leading-none sm:text-4xl">
            Executive Board
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-6 md:grid-cols-2 md:p-8">
          {executiveBoard.map((member, index) => (
            <article
              key={member.name}
              className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 p-6 text-white shadow-[0_24px_50px_rgba(0,0,0,0.35)] ${
                index === 0 ? "bg-[#121214]" : "bg-[#141416]"
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#DB3F7A]/15 blur-2xl" />
              <p className="relative text-[11px] uppercase tracking-[0.25em] text-[#DB3F7A]">
                {member.role}
              </p>
              <p className="relative monument-extra-bold mt-2 text-3xl uppercase leading-tight">
                {member.name}
              </p>
              <p className="relative mt-4 text-sm font-light leading-7 text-white/75">
                {member.bio}
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
          {departments.map((member, index) => (
            <article
              key={member.name}
              className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 p-5 text-white shadow-[0_22px_44px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/70 ${
                index % 2 === 0 ? "bg-[#121214]" : "bg-[#141416]"
              }`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#DB3F7A]/12 blur-2xl" />

              <div className="relative flex h-full min-h-[12.5rem] flex-col justify-between gap-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#DB3F7A]">
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

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[#0d0d0f] p-5 sm:p-6 md:p-8">
        <div className="mb-8 flex items-end gap-4">
          <div className="h-11 w-2 rounded-full bg-[#DB3F7A]" />
          <h2 className="monument-extra-bold text-2xl uppercase leading-none sm:text-3xl md:text-4xl">
            Featured Dancers
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={goToPrevDancer}
            aria-label="Previous dancer"
            className="absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white transition-colors md:flex"
          >
            <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
          </button>

          <button
            type="button"
            onClick={goToNextDancer}
            aria-label="Next dancer"
            className="absolute right-0 top-1/2 z-20 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center text-white transition-colors md:flex"
          >
            <FontAwesomeIcon icon={faAngleRight} size="2xl" />
          </button>

          <div className="relative h-[34rem] overflow-hidden rounded-[1.8rem] md:h-[40rem]">
            {featuredDancers.map((dancer, index) => {
              const offset = getRelativeOffset(index);
              const isActive = offset === 0;
              const isSide = Math.abs(offset) === 1;

              const translateMap = {
                "-1": "translateX(-130%)",
                0: "translateX(-50%)",
                1: "translateX(30%)",
              };

              const verticalOffset = isActive
                ? "translateY(10%)"
                : isSide
                  ? "translateY(-7%)"
                  : "translateY(0)";

              const cardWidth = isActive ? "66%" : isSide ? "30%" : "16%";

              const transform = `${translateMap[String(offset)] || "translateX(-50%)"} ${verticalOffset} scale(${isActive ? 1 : isSide ? 0.85 : 0.75})`;
              const genreText = dancer.tags.join(" / ");

              return (
                <article
                  key={dancer.name}
                  className={`absolute left-1/2 top-0 h-[88%] overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-b from-[#5f5f5f] to-[#050505] shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out ${
                    isActive
                      ? "z-30 opacity-100"
                      : isSide
                        ? "z-20 opacity-45"
                        : "pointer-events-none z-10 opacity-0"
                  }`}
                  style={{
                    width: cardWidth,
                    transform,
                  }}
                >
                  <img
                    src={dancer.image}
                    alt={`${dancer.name} portrait`}
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      isActive ? "grayscale-0" : "grayscale"
                    }`}
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/45 to-black/10" />

                  <div className="absolute right-0 top-0 flex h-full w-[46%] flex-col items-end justify-between p-4 text-right sm:p-5 md:p-7">
                    <p className="monument-extra-bold text-lg uppercase leading-tight text-white sm:text-2xl md:text-[1.75rem]">
                      {dancer.name}
                    </p>

                    <div className="flex flex-col items-end text-right">
                      <p
                        className={`text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                          isActive ? "text-[#DB3F7A]" : "text-white/65"
                        }`}
                      >
                        {genreText}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[#DB3F7A]/60 bg-[#DB3F7A]/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#fff1f7]">
                          Booking
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={goToPrevDancer}
              className="h-10 w-10 rounded-full bg-white/10 text-white"
              aria-label="Previous dancer"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              type="button"
              onClick={goToNextDancer}
              className="h-10 w-10 rounded-full bg-white/10 text-white"
              aria-label="Next dancer"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
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
                Dance Style
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {danceStyles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSelectedStyle(style)}
                    className={`rounded-full px-4 py-2 text-left text-sm transition-all ${
                      selectedStyle === style
                        ? "border border-[#DB3F7A]/55 bg-[#DB3F7A]/20 text-[#fff1f7]"
                        : "border border-transparent bg-[#1a1a1d] text-white/65 hover:text-white"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                Position
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {positions.map((position) => (
                  <button
                    key={position}
                    type="button"
                    onClick={() => setSelectedPosition(position)}
                    className={`rounded-full px-4 py-2 text-left text-sm transition-all ${
                      selectedPosition === position
                        ? "border border-[#DB3F7A]/55 bg-[#DB3F7A]/20 text-[#fff1f7]"
                        : "border border-transparent bg-[#1a1a1d] text-white/65 hover:text-white"
                    }`}
                  >
                    {position}
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
                  placeholder="Find a member by name, style, or position..."
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
                  Try changing dance style, position, or clearing search
                  keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredMembers.map((member) => (
                  <article
                    key={member.name}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-[0_18px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DB3F7A]/70"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={member.image}
                        alt={`${member.name} portrait`}
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#DB3F7A]">
                        {member.style} / {member.position}
                      </p>
                      <p className="monument-extra-bold mt-2 text-2xl uppercase text-white">
                        {member.name}
                      </p>
                      <button
                        type="button"
                        className="mt-4 w-full rounded-full border border-white/25 bg-[#1a1a1d] py-2 text-[11px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:border-[#DB3F7A] hover:bg-[#DB3F7A]"
                      >
                        Profile
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
