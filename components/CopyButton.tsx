"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { toast } from "react-hot-toast";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton = ({ valueToCopy, className, ...props }: CopyButtonProps) => {
  return (
    <Button
      {...props}
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast.success("API key copied to clipboard");
      }}
      variant="ghost"
      className={cn("", className)}>
      <CopyIcon className="w-5 h-5" />
    </Button>
  );
};

export default CopyButton;
