import { useEffect, useState } from "react";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import MobileSideBar from "./MobileSideBar.jsx";
import { LAYOUT_CONFIG } from "../../../utils/constants.js";

const SharedLayout = ({ children, role }) => {
  const layoutConfig = LAYOUT_CONFIG[role];
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth < 1024;
  });
  const [isSideBarOpen, setIsSideBarOpen] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.innerWidth >= 1024;
  });

  if (!layoutConfig) {
    return <div>Invalid role</div>;
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSideBarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSideBarToggle = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const handleCloseMobileSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <ProtectedRoute allowedRoles={layoutConfig.allowedRoles}>
        <Header role={role} onHandleSideBarToggle={handleSideBarToggle} />
        <main className="flex min-h-[calc(100vh-61.2px)] items-start">
          {!isMobile && (
            <SideBar
              sideBarItemList={layoutConfig.sideBarItems}
              isSideBarOpen={isSideBarOpen}
            />
          )}

          {isMobile && (
            <MobileSideBar
              sideBarItemList={layoutConfig.sideBarItems}
              isOpen={isSideBarOpen}
              onClose={handleCloseMobileSideBar}
            />
          )}

          <div className="min-w-0 flex-1 p-4 lg:p-6">{children}</div>
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export default SharedLayout;
