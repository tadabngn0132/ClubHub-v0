import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import MemberHeader from "./MemberHeader.jsx";
import MemberFooter from "./MemberFooter.jsx";
import MemberSideBar from "./MemberSideBar.jsx";

const MemberLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <MemberHeader />
        <main className="flex">
          <MemberSideBar />
          <div className="flex-1">{children}</div>
        </main>
        <MemberFooter />
      </ProtectedRoute>
    </>
  );
};

export default MemberLayout;
