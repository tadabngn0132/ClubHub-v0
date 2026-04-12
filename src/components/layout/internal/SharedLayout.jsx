import { useState } from "react";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import { LAYOUT_CONFIG } from "../../../utils/constants.js";

const SharedLayout = ({ children, role }) => {
  const layoutConfig = LAYOUT_CONFIG[role];
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  if (!layoutConfig) {
    return <div>Invalid role</div>;
  }

  const handleSideBarToggle = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <>
      <ProtectedRoute allowedRoles={layoutConfig.allowedRoles}>
        <Header role={role} onHandleSideBarToggle={handleSideBarToggle} />
        <main className="flex min-h-[calc(100vh-61.2px)] items-start">
          <SideBar
            sideBarItemList={layoutConfig.sideBarItems}
            isSideBarOpen={isSideBarOpen}
          />
          <div className="min-w-0 flex-1 p-4 lg:p-6">{children}</div>
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export default SharedLayout;
