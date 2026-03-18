import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import MemberHeader from "./MemberHeader.jsx";
import MemberFooter from "./MemberFooter.jsx";
import MemberSideBar from "./MemberSideBar.jsx";

const MemberLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "moderator", "member"]}>
        <MemberHeader />
        <main className="flex mt-[61.2px]">
          <MemberSideBar />
          <div className="flex-1 p-4">{children}</div>
        </main>
        <MemberFooter />
      </ProtectedRoute>
    </>
  );
};

export default MemberLayout;
