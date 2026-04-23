import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters";
import { getMemberApplicationDetails } from "../../../store/slices/memberApplicationSlice";

const MemberApplicationDetailsPage = ({ role }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Member Application Details</h1>
      <p className="text-sm text-slate-300 mb-6">
        Detailed information about the member application will be displayed here.
      </p>
    </div>
  );
};

export default MemberApplicationDetailsPage;
