import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-w-96">
      <aside className="w-16 md:w-40 lg:w-[300px] border border-l-0 border-y-0 border-r-neutral-200 h-screen p-4">
        {"aside"}
      </aside>
      <main className="flex-1 ">
        <header className="w-full flex items-center h-[70px] px-10 py-4 border border-x-0 border-t-0  border-b-neutral-200">
          {"header"}
        </header>
        <div className="bg-neutral-100 h-full p-10">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
