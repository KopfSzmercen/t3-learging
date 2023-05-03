import { type GRADE_SCALE } from "@prisma/client";
import React from "react";

interface IGradeBadgeProps {
  value: GRADE_SCALE | string;
}

const getBadgeBackgroundForGradeValue = (value: GRADE_SCALE | string) => {
  switch (value) {
    case "A":
      return "bg-[#16a34a] text-black";

    case "B":
      return "bg-[#16a34a] text-black";

    case "C":
      return "bg-[#eab308] text-black";

    case "D":
      return "bg-[#eab308] text-black";

    case "E":
      return "bg-[#dc2626] text-black";

    case "F":
      return "bg-[#dc2626] text-black";

    default:
      return "";
  }
};

const GradeBadge = ({ value }: IGradeBadgeProps) => {
  return (
    <div
      className={`align-center flex h-[25px] w-[25px] flex-col items-center rounded-[50%] font-semibold ${getBadgeBackgroundForGradeValue(
        value
      )}`}
    >
      {value}
    </div>
  );
};

export default GradeBadge;
