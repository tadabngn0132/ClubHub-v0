import React from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import { getPositionsList } from "../../../store/slices/positionSlice";
import { useEffect } from "react";
import { VALIDATION_RULES } from "../../../utils/validationRules";

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

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClassName = "mt-3 text-sm font-semibold text-gray-100";
  const errorClassName = "mt-1 text-sm font-medium text-red-400";

  return (
    <div className="flex flex-col">
      {/* Generation field */}
      <label htmlFor="generation" className="text-sm font-semibold text-gray-100">
        Generation <span className="text-red-400">*</span>
      </label>
      <input
        type="text"
        id="generation"
        placeholder="2025"
        className={inputClassName}
        {...register("generation", VALIDATION_RULES.generation)}
      />
      {errors.generation && (
        <p className={errorClassName}>{errors.generation.message}</p>
      )}

      {/* Join Date field */}
      <label htmlFor="joinedAt" className={labelClassName}>
        Join Date <span className="text-red-400">*</span>
      </label>
      <input
        type="date"
        id="joinedAt"
        className={inputClassName}
        defaultValue={new Date().toISOString().split("T")[0]}
        {...register("joinedAt", { required: "Join Date cannot be empty" })}
      />
      {errors.joinedAt && (
        <p className={errorClassName}>{errors.joinedAt.message}</p>
      )}

      {/* Status field */}
      <label htmlFor="status" className={labelClassName}>
        Status
      </label>
      <select
        name="status"
        id="status"
        className={inputClassName}
        {...register("status")}
      >
        <option className="bg-gray-800 text-gray-100" value="ACTIVE">
          Active
        </option>
        <option className="bg-gray-800 text-gray-100" value="INACTIVE">
          Inactive
        </option>
      </select>

      {/* Position Id */}
      <label htmlFor="positionId" className={labelClassName}>
        Position <span className="text-red-400">*</span>
      </label>
      <select
        name="positionId"
        id="positionId"
        className={inputClassName}
        {...register("positionId", {
          required: "Position is required",
        })}
      >
        <option value="">Select a position</option>
        {positions.map((pos) => (
          <option key={pos.id} value={pos.id} className="bg-gray-800 text-gray-100">
            {pos.title}
          </option>
        ))}
      </select>
      {errors.positionId && (
        <p className={errorClassName}>{errors.positionId.message}</p>
      )}

      {/* Root Department Id */}
      <label htmlFor="rootDepartmentId" className={labelClassName}>
        Root Department <span className="text-red-400">*</span>
      </label>
      <select
        name="rootDepartmentId"
        id="rootDepartmentId"
        className={inputClassName}
        {...register("rootDepartmentId", {
          required: "Root Department is required",
        })}
      >
        <option value="">Select a department</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id} className="bg-gray-800 text-gray-100">
            {dept.name}
          </option>
        ))}
      </select>
      {errors.rootDepartmentId && (
        <p className={errorClassName}>{errors.rootDepartmentId.message}</p>
      )}
    </div>
  );
};

export default ClubInfoTab;
