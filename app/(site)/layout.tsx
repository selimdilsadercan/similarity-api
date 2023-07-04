interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return <section className="pt-20">{children}</section>;
};

export default RootLayout;
