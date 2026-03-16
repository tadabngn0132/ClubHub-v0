import React from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartmentsList } from "../../../store/slices/departmentSlice";
import { getAllPositionsList } from "../../../store/slices/positionSlice";
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
    dispatch(getAllDepartmentsList());
    dispatch(getAllPositionsList());
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
      <label htmlFor="join_date" className="mt-3">
        Join Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="join_date"
        className="mt-2"
        defaultValue={new Date().toISOString().split("T")[0]}
        {...register("join_date", { required: "Join Date cannot be empty" })}
      />
      {errors.join_date && (
        <p className="text-red-500 text-sm">{errors.join_date.message}</p>
      )}

      {/* Status field */}
      <label htmlFor="status" className="mt-3">
        Status
      </label>
      <select
        name="status"
        id="status"
        className="mt-2"
        {...register("status")}
      >
        <option className="bg-gray-500" value="Active">
          Active
        </option>
        <option className="bg-gray-500" value="Inactive">
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
        className="mt-2"
        {...register("positionId", {
          required: "Position is required",
        })}
      >
        <option value="">Select a position</option>
        {positions.map((pos) => (
          <option key={pos.id} value={pos.id}>
            {pos.name}
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
        className="mt-2"
        {...register("rootDepartmentId", {
          required: "Root Department is required",
        })}
      >
        <option value="">Select a department</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClubInfoTab;
