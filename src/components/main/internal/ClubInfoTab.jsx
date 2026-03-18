import React from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import { getPositionsList } from "../../../store/slices/positionSlice";
import { useEffect } from "react";

const ClubInfoTab = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { departments } = useSelector((state) => state.department);
  const { positions } = useSelector((state) => state.position);

  useEffect(() => {
    dispatch(getDepartmentsList());
    dispatch(getPositionsList());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      {/* Generation field */}
      <label htmlFor="generation">
        Generation <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="generation"
        placeholder="2025"
        className="mt-2"
        {...register("generation", { required: "Generation cannot be empty" })}
      />
      {errors.generation && (
        <p className="text-red-500 text-sm">{errors.generation.message}</p>
      )}

      {/* Join Date field */}
      <label htmlFor="joinedAt" className="mt-3">
        Join Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="joinedAt"
        className="mt-2"
        defaultValue={new Date().toISOString().split("T")[0]}
        {...register("joinedAt", { required: "Join Date cannot be empty" })}
      />
      {errors.joinedAt && (
        <p className="text-red-500 text-sm">{errors.joinedAt.message}</p>
      )}

      {/* Status field */}
      <label htmlFor="status" className="mt-3">
        Status
      </label>
      <select
        name="status"
        id="status"
        className="mt-2 bg-slate-800 text-white border border-slate-600"
        {...register("status")}
      >
        <option className="bg-slate-800 text-white" value="Active">
          Active
        </option>
        <option className="bg-slate-800 text-white" value="Inactive">
          Inactive
        </option>
      </select>

      {/* Position Id */}
      <label htmlFor="positionId" className="mt-3">
        Position <span className="text-red-500">*</span>
      </label>
      <select
        name="positionId"
        id="positionId"
        className="mt-2 bg-slate-800 text-white border border-slate-600"
        {...register("positionId", {
          required: "Position is required",
        })}
      >
        <option value="">Select a position</option>
        {positions.map((pos) => (
          <option key={pos.id} value={pos.id} className="bg-slate-800 text-white">
            {pos.title}
          </option>
        ))}
      </select>

      {/* Root Department Id */}
      <label htmlFor="rootDepartmentId" className="mt-3">
        Root Department <span className="text-red-500">*</span>
      </label>
      <select
        name="rootDepartmentId"
        id="rootDepartmentId"
        className="mt-2 bg-slate-800 text-white border border-slate-600"
        {...register("rootDepartmentId", {
          required: "Root Department is required",
        })}
      >
        <option value="">Select a department</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id} className="bg-slate-800 text-white">
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClubInfoTab;
