"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createApiKey } from "@/helpers/create-api-key";
import { revokeApiKey } from "@/helpers/revoke-api-key";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

////

interface ApiKeyOptionsProps {
  apiKeyKey: string;
}

const ApiKeyOptions = ({ apiKeyKey }: ApiKeyOptionsProps) => {
  //hooks
  const router = useRouter();

  ////

  //createNewApiKey()
  const { mutate: createNewApiKey, isLoading: isCreatingNew } = useMutation({
    mutationFn: async () => {
      await revokeApiKey();
      await createApiKey();
      router.refresh();
      toast.success("Created new API key");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating new API key");
    },
  });

  ////

  //revokeCurrentApiKey()
  const { mutate: revokeCurrentApiKey, isLoading: isRevoking } = useMutation({
    mutationFn: async () => {
      await revokeApiKey();
      toast.success("Revoked your API key");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error revoking your API key");
    },
  });

  ////

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          isLoading={isCreatingNew || isRevoking}
          disabled={isCreatingNew || isRevoking}>
          {isCreatingNew
            ? "Creating new key"
            : isRevoking
            ? "Revoking key"
            : "Options"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey);
            toast.success("Copied to clipboard");
          }}>
          Copy
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => createNewApiKey()}>
          Create new key
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => revokeCurrentApiKey()}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
