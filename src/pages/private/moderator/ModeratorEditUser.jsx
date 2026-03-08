import UserForm from "../../../components/main/internal/UserForm.jsx"
import { useParams } from "react-router-dom"

const ModeratorEditUser = () => {
  const { userId } = useParams();
  
  return (
    <div>
      <UserForm mode="edit" userId={userId} />
    </div>
  )
}

export default ModeratorEditUser