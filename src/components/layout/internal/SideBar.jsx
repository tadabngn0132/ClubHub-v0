import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUsers,
  faBuilding,
  faIdBadge,
  faCalendarDays,
  faListCheck,
  faFileLines,
  faComments,
  faFilePen,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

const SolidIconMap = {
  faGauge: faGauge,
  faUsers: faUsers,
  faBuilding: faBuilding,
  faIdBadge: faIdBadge,
  faCalendarDays: faCalendarDays,
  faListCheck: faListCheck,
  faFileLines: faFileLines,
  faComments: faComments,
  faFilePen: faFilePen,
  faUserGear: faUserGear,
};

const SideBar = ({ sideBarItemList, isSideBarOpen }) => {
  return (
    <aside
      className={`sticky top-[61.2px] self-start h-[calc(100vh-61.2px)] overflow-x-hidden overflow-y-auto bg-[var(--black-color)] p-2 transition-[width] duration-300 ease-in-out ${
        isSideBarOpen ? "w-56" : "w-16"
      }`}
    >
      <nav>
        <ul>
          {sideBarItemList.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `group flex items-center rounded-xl p-2.5 pl-2 text-md/tight transition-colors hover:text-[var(--pink-color)] ${isActive ? "text-[var(--pink-color)] font-bold" : "font-normal"}`
                }
              >
                <span className="mr-3 w-6 flex-shrink-0 text-center">
                  <FontAwesomeIcon icon={SolidIconMap[item.icon]} />
                </span>
                <span
                  className={`overflow-hidden whitespace-nowrap text-sm transition-all duration-300 ${
                    isSideBarOpen
                      ? "max-w-[160px] opacity-100 translate-x-0"
                      : "max-w-0 opacity-0 -translate-x-2"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
