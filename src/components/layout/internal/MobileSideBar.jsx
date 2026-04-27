import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUsers,
  faBuilding,
  faIdBadge,
  faCalendarDays,
  faListCheck,
  faBell,
  faFileLines,
  faComments,
  faFilePen,
  faUserGear,
  faGear,
  faClipboardList,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const SolidIconMap = {
  faGauge: faGauge,
  faUsers: faUsers,
  faBuilding: faBuilding,
  faIdBadge: faIdBadge,
  faCalendarDays: faCalendarDays,
  faListCheck: faListCheck,
  faBell: faBell,
  faFileLines: faFileLines,
  faComments: faComments,
  faFilePen: faFilePen,
  faUserGear: faUserGear,
  faGear: faGear,
  faClipboardList: faClipboardList,
};

const MobileSideBar = ({ sideBarItemList, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/55 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed left-0 top-[61.2px] z-[80] h-[calc(100vh-61.2px)] w-72 max-w-[85vw] overflow-y-auto border-r border-white/10 bg-[#0f0f11] p-3 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/85">
            Navigation
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav>
          <ul className="space-y-1">
            {sideBarItemList.map((item, index) => (
              <li key={`${item.link}-${index}`}>
                <NavLink
                  to={item.link}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl p-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--pink-color)]/15 text-[var(--pink-color)]"
                        : "text-white/80 hover:bg-white/5 hover:text-[var(--pink-color)]"
                    }`
                  }
                >
                  <span className="inline-flex w-5 flex-shrink-0 justify-center text-center">
                    <FontAwesomeIcon icon={SolidIconMap[item.icon]} />
                  </span>
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MobileSideBar;
