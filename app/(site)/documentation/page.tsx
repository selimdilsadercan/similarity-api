import "simplebar-react/dist/simplebar.min.css";

import { Metadata } from "next";
import LargeHeading from "@/components/ui/large-heading";
import Paragraph from "@/components/ui/paragraph";
import DocumentationTabs from "./components/DocumentationTabs";

export const metadata: Metadata = {
  title: "Documentation | Similarity API",
  description: "Free & open-source text similarity API",
};

const page = () => {
  return (
    <div className="container mx-auto mt-12 max-w-7xl">
      <div className="flex flex-col items-center gap-6">
        <LargeHeading>Making a request</LargeHeading>

        <Paragraph>api/v1/similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
