import React from "react";
const Gitcard = React.lazy(() => import("../../components/github/gitcard"));
const Repositories = React.lazy(() => import("../../components/github/repocount"));
const Heatmap = React.lazy(() => import("../../components/github/heatmap"));
const Gitprofile = React.lazy(() => import("../../components/github/profilecard"));


export default function Github() {
  return (
    <>
      <Gitcard />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Gitprofile />
        <Heatmap />
      </div>

      <Repositories />
    </>
  );
}
