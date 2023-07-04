"use client";

import { DataTable } from "@/components/ui/data-table";
import { RequestsColumn, columns } from "./columns";
import LargeHeading from "@/components/ui/large-heading";
import Paragraph from "@/components/ui/paragraph";
import { Input } from "@/components/ui/input";
import ApiKeyOptions from "../components/ApiKeyOptions";

////

interface DashboardClientProps {
  data: RequestsColumn[];
  userFirstName: string | null;
  activeApiKeyKey: string;
}

const DashboardClient = ({
  data,
  userFirstName,
  activeApiKeyKey,
}: DashboardClientProps) => {
  ////

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome back, {userFirstName}</LargeHeading>

      <Paragraph className="mt-4 -mb-4 text-center md:text-left">
        Your API key
      </Paragraph>

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start md:items-center">
        <Input className="truncate w-fit" readOnly value={activeApiKeyKey} />

        <ApiKeyOptions apiKeyKey={activeApiKeyKey} />
      </div>

      <Paragraph className="mt-4 -mb-4 text-center md:text-left">
        Your API history
      </Paragraph>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DashboardClient;
