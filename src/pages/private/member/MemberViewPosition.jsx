import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getPositionDetails
} from "../../../store/slices/positionSlice"
import Loading from "../../../components/layout/internal/Loading"
import toast, {Toaster} from "react-hot-toast"
import { Link } from "react-router-dom"

const MemberViewPosition = ({ positionId}) => {
  const dispatch = useDispatch()
  const { position, isLoading, error } = useSelector((state) => state.position)

  useEffect(() => {
    dispatch(getPositionDetails(positionId))
  }, [dispatch, positionId])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    toast.error(error)
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/member/positions">Back to Positions</Link>
      <div>
        <h1>{position?.name || 'Position Details'}</h1>
      </div>

      <div>
        <p>Created At: {position?.createdAt}</p>
        <p>Updated At: {position?.updatedAt}</p>
      </div>

      <p>{position?.level}</p>
      <p>{position?.systemRole}</p>
    </div>
  )
}

export default MemberViewPosition