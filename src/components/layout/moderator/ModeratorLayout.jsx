import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import ModeratorHeader from "./ModeratorHeader.jsx";
import ModeratorFooter from "./ModeratorFooter.jsx";
import ModeratorSideBar from "./ModeratorSideBar.jsx";

const ModeratorLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "moderator"]}>
        <ModeratorHeader />
        <main className="flex mt-[61.2px]">
          <ModeratorSideBar />
          <div className="flex-1 p-4">{children}</div>
        </main>
        <ModeratorFooter />
      </ProtectedRoute>
    </>
  );
};

export default ModeratorLayout;
