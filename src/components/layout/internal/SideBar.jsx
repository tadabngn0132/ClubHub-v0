import { NavLink } from 'react-router-dom'

const SideBar = ({ sideBarItemList }) => {
  return (
    <div>
      <aside className="w-48 bg-[var(--black-color)] min-h-screen p-2">
        <nav>
          <ul>
            {sideBarItemList.map((item, index) => (
              <li key={index}>
                <NavLink to={item.link} className={({ isActive }) => `flex p-2.5 pl-2 rounded-xl hover:text-[var(--pink-color)] text-md/tight ${isActive ? 'text-[var(--pink-color)] font-bold' : 'font-normal'}`}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default SideBar