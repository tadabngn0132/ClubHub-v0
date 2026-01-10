import { NavLink } from 'react-router-dom'

const SideBar = ({ sideBarItemList }) => {
  return (
    <div>
      <aside className="w-64 bg-gray-200 min-h-screen p-4">
        <nav>
          <ul>
            {sideBarItemList.map((item, index) => (
              <li key={index} className="mb-4">
                <NavLink to={item.link} className={({ isActive }) => `block p-2 rounded hover:bg-gray-300 ${isActive ? 'bg-gray-400 font-bold' : 'font-normal'}`}>
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