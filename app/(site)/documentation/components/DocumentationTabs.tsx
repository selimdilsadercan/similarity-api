"use client";

import { nodejs, python } from "@/helpers/documentation-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleBar from "simplebar-react";
import Code from "@/components/Code";

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue="nodejs" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>

      <TabsContent
        value="nodejs"
        className="p-4 mb-10 border-2 rounded-md dark:bg-transparent bg-accent ">
        <SimpleBar forceVisible="y">
          <Code animated code={nodejs} language="jsx" show />
        </SimpleBar>
      </TabsContent>

      <TabsContent
        value="python"
        className="p-4 mb-10 border-2 rounded-md dark:bg-transparent bg-accent">
        <SimpleBar forceVisible="y">
          <Code animated code={python} language="jsx" show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
