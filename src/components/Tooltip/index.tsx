"use client";

import Tippy from "@tippyjs/react";
import { forwardRef, useEffect } from "react";
import tippy from "tippy.js";

interface ITooltipProps {
  children: React.ReactNode;
}

export default function Tooltip({ children }: ITooltipProps) {
  useEffect(() => {
    tippy("[data-tooltip-content]");
  }, []);

  return (
    <div className="flex" data-tooltip-content="Olá">
      {children}
    </div>
  );
}
