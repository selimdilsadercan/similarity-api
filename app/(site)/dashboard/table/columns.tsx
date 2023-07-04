"use client";

import { ColumnDef } from "@tanstack/react-table";

export type RequestsColumn = {
  id: string;
  timestamp: string;
  apiKeyId: string;
  usedApiKey: string;
  path: string;
  method: string;
  status: string;
  duration: string;
};

export const columns: ColumnDef<RequestsColumn>[] = [
  {
    accessorKey: "usedApiKey",
    header: "API key",
  },
  {
    accessorKey: "path",
    header: "Path",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "timestamp",
    header: "Recency",
  },
  {
    accessorKey: "Duration",
    header: "Duration",
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
];
