
import Navbar from "./Navbar";
export default function({children}){

    return (
        <div className=" min-h-screen bg-[#1A1F2C]  text-[#ffffff] flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 border-t border-gray-800">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Digital Item Nexus. All rights reserved.</p>
              <p className="mt-2">Powered by Web3 technology</p>
            </div>
          </footer>
        </div>
      );
}