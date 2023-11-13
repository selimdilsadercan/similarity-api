import { UserButton } from "@clerk/nextjs";

interface CustomUserButtonProps {}

const CustomUserButton = ({}: CustomUserButtonProps) => {
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          userButtonPopoverActionButtonText__manageAccount: "Hesabını Yönet",
        },
      }}
    />
  );
};

export default CustomUserButton;
