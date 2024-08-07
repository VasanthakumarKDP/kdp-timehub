import React, { useState } from "react";

import Notifications from "../components/DropdownNotifications";

import UserMenu from "../components/DropdownProfile";

function Header() {
  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">{/* Hamburger button */}</div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* <Notifications align="right" /> */}

            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
