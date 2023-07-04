import { UserButton } from "@clerk/nextjs";

interface CustomUserButtonProps {}

const CustomUserButton = ({}: CustomUserButtonProps) => {
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        variables: {
          // colorPrimary: "blue",
          // colorText: "black",
          // borderRadius: "4px",
          // fontWeight: { normal: 500, medium: 500, bold: 600 },
          // fontSize: "12x",
          // spacingUnit: "0.8rem",
        },
        elements: {
          userButtonPopoverActionButtonText__manageAccount: "Hesabını Yönet",
        },
      }}
    />
  );
};

export default CustomUserButton;
