"use client";

import React from "react";
import { QuickActions } from "./QuickActions";
import { ConfidenceCard } from "./ConfidenceCard";
import { StatusCard } from "./StatusCard";

export const ResearchSidebar: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* 1. Quick Actions */}
      <QuickActions />

      {/* 2. Confidence Score */}
      <ConfidenceCard />

      {/* 3. Research Status & Telemetry */}
      <StatusCard />
    </div>
  );
};
