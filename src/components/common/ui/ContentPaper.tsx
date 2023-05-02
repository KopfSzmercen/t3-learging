import { Paper, Skeleton } from "@mantine/core";
import React from "react";

const ContentPaper: React.FC<{
  children: React.ReactNode;
  isLoading?: boolean;
}> = ({ children, isLoading }) => {
  return (
    <Paper className="w-[70vw] max-w-[1200px] p-5">
      {isLoading && (
        <Skeleton className="h-full w-full">Lorem, ipsum.</Skeleton>
      )}
      {!isLoading && children}
    </Paper>
  );
};

export default ContentPaper;
