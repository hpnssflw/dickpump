// import Dashboard from "../components/Dashboard";
import Chatbot from "../components/Chatbot";
// import CoinsTable from "../components/CoinsTable";
import Orb from "@/components/Orb/Orb";

export default function Home() {
  return (
    <div className="min-h-screen max-w-[575px] mx-auto h-screen flex flex-col items-center justify- pb-10">
      <h1>hypnosisflow labs</h1>
      <div className="w-full max-w-[1440px] relative h-full flex flex-col">
        {/* <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] gap-8">
          <Dashboard />
          <CoinsTable />
        </div> */}
        <div className="absolute translate-x-1/2">
          <Orb />
        </div>
        <div className="flex-1 flex mt-[220px] min-h-[500px]">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
