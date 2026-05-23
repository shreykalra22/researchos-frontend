type Props = {
  children: React.ReactNode;
};

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="h-screen w-screen bg-background text-white flex overflow-hidden">
      {children}
    </div>
  );
}