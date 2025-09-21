import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 container mx-auto mb-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
