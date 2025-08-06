import Header from "@/components/organisms/Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-midnight-900">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;