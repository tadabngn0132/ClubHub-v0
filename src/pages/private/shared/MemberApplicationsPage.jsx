import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";

const MemberApplicationsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Member Applications</h1>
      <p className="text-sm text-slate-300 mb-6">
        List of all member applications will be displayed here.
      </p>
    </div>
  );
};

export default MemberApplicationsPage;
