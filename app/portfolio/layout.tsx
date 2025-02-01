import Header from "@/components/Header";

export default function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  return (
    <section className="w-full">
      <main className="m-auto	 flex min-h-screen flex-col items-center lg:px-4 lg:py-8 xl:px-24 xl:py-8">
        <Header />
        {children}
      </main>
    </section>
  );
}
