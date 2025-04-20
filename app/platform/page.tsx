"use client";

import DashMain from "./main";
import Side from "./sidebar";
import PlatformNavBar from "./platformNavBar";

const SidebarComp = () => {
  return (
    <div className="flex flex-row h-screen">
      <Side />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PlatformNavBar />
        <div className="flex-1 overflow-auto">
          <DashMain />
        </div>
      </div>
    </div>
  );
};

export default SidebarComp;
