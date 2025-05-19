import React from "react";

const Categorychart = React.lazy(() =>
  import("../../components/pslevels/categorychart")
);

const LevelStats = React.lazy(() =>
  import("../../components/pslevels/levelstatus")
);
const SlotStatus = React.lazy(() =>
  import("../../components/pslevels/slotstatus")
);

export default function pslevel() {
  return (
    <div className="w-full max-w-1xl rounded-md">
      <div className="mb-5 md:pl-2 md:pr-2">
        <LevelStats />
      </div>
      <div className="p-0 sm:p-2 mb-5 ">
        <Categorychart />
      </div>
      <SlotStatus />
    </div>
  );
}
