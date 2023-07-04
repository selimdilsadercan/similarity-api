"use client";

import { createApiKey } from "@/helpers/create-api-key";
import { KeyIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import LargeHeading from "@/components/ui/large-heading";
import Paragraph from "@/components/ui/paragraph";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/CopyButton";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

////

const RequestApiKey = () => {
  //hooks
  const [apiKey, setApiKey] = useState<string | null>(null);
  const router = useRouter();

  ////

  // mutation
  const { mutate: createNewApiKey, isLoading: isCreating } = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
      router.refresh();
    },
    ////
    onError: (error) => {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong. Please try again.");
    },
  });

  ////

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col items-center gap-6">
        <KeyIcon className="w-12 h-12 mx-auto text-gray-400" />

        <LargeHeading className="text-center">
          Request your API key
        </LargeHeading>

        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#">
        <label htmlFor="emails" className="sr-only">
          Your API key
        </label>

        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              className="absolute inset-y-0 right-0 duration-300 animate-in fade-in"
              valueToCopy={apiKey}
            />
          ) : null}

          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here"
          />
        </div>

        <div className="flex justify-center mt-6 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
