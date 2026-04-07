import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { LAYOUT_CONFIG } from "../../../utils/constants.js";

const SharedLayout = ({ children, role }) => {
  const layoutConfig = LAYOUT_CONFIG[role];

  if (!layoutConfig) {
    return <div>Invalid role</div>;
  }

  return (
    <>
      <ProtectedRoute allowedRoles={layoutConfig.allowedRoles}>
        <Header role={role} />
        <main className="flex mt-[61.2px]">
          <SideBar sideBarItemList={layoutConfig.sideBarItems} />
          <div className="flex-1 p-4">{children}</div>
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export default SharedLayout;
