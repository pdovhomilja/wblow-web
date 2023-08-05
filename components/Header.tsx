import React from "react";
import Navigation from "./Navigation";
import { ToggleDarkMode } from "./ToggleDarkMode";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex border-b shadow-md justify-between h-28 px-20 items-center">
      <div>Logo</div>
      <div className="flex space-x-5">
        <Navigation />
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Header;
