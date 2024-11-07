import React from "react";
import DiplomaIcon from "../icons/diploma-icon";
import FileAddIcon from "../icons/file-add-icon";
import FileCheckIcon from "../icons/file-check-icon";
import RefreshIcon from "../icons/refresh-icon";
import SearchAltIcon from "../icons/search-alt-icon";
import ShieldCheckIcon from "../icons/shield-check-icon";
import ChevronDownIcon from "../icons/chevron-down-icon";

const iconMap: Record<string, JSX.Element> = {
  "search-alt": <SearchAltIcon />,
  "rr-file": <FileCheckIcon />,
  diploma: <DiplomaIcon />,
  refresh: <RefreshIcon />,
  "file-add": <FileAddIcon />,
  "chevron-down": <ChevronDownIcon />,
  default: <ShieldCheckIcon />,
};

interface IconProps {
  icon: string;
  size?: "small" | "normal" | "medium" | "large";
  className?: string;
}

export const Icon = ({ icon, size = "normal", className = "" }: IconProps) => {
  const sizeClass = {
    small: "w-4 h-4",
    normal: "w-5 h-5",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  }[size];

  const SelectedIcon = iconMap[icon] || iconMap.default;
  return React.cloneElement(SelectedIcon, {
    className: `${sizeClass} ${className}`,
  });
};

export default Icon;
