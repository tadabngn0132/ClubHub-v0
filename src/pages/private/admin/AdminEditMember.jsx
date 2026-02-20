import MemberForm from "../../../components/main/internal/MemberForm"
import { useParams } from "react-router-dom"

const AdminEditMember = () => {
  const { userId } = useParams();
  
  return (
    <div>
      <MemberForm mode="edit" memberId={userId} />
    </div>
  )
}

export default AdminEditMember