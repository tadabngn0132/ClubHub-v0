import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPositionsList } from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import {
  formatPositionLevel,
  formatUppercaseToCapitalized,
  formatRoleBadgeColor,
} from "../../../utils/formatters";

const ModeratorPositions = () => {
  const dispatch = useDispatch();
  const { positions, isLoading, error } = useSelector(
    (state) => state.position,
  );

  useEffect(() => {
    dispatch(getPositionsList());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <section>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Positions
          </h1>
          <p className="mt-1 text-slate-300">{positions.length} positions</p>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/65">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead className="bg-slate-800/95 text-slate-200 backdrop-blur">
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-3 py-3">Title</th>
                  <th className="px-3 py-3">Level</th>
                  <th className="px-3 py-3 text-center">System Role</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {positions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-10 text-center text-slate-300"
                    >
                      No positions found.
                    </td>
                  </tr>
                ) : (
                  positions.map((position) => (
                    <tr
                      key={position.id}
                      className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20 hover:bg-slate-800/50"
                    >
                      <td className="px-3 py-3 font-medium text-slate-100">
                        {position.title}
                      </td>
                      <td className="px-3 py-3 text-slate-300">
                        {formatPositionLevel(position.level)}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div
                          className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(position.systemRole))} inline-flex h-fit items-center justify-center rounded-2xl p-1 px-2 text-sm/tight`}
                        >
                          {formatUppercaseToCapitalized(position.systemRole)}
                        </div>
                      </td>
                      <td className="w-24 px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <Link
                            to={`/moderator/positions/view/${position.id}`}
                            className="rounded-md bg-emerald-500/20 px-3 py-1 font-semibold text-emerald-300 transition hover:bg-emerald-500/35"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorPositions;
