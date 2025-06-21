// import Dashboard from "../components/Dashboard";
import Chatbot from "../components/Chatbot";
// import CoinsTable from "../components/CoinsTable";
import Orb from "@/components/Orb/Orb";

export default function Home() {
  return (
    <div className="min-h-screen max-w-[575px] mx-auto h-screen flex flex-col items-center ">
      <h1 className="text-neutral-700">hypnosisflow labs</h1>
      <div className="w-full max-w-[575px] relative h-full flex items-center flex-col">
        {/* <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] gap-8">
          <Dashboard />
          <CoinsTable />
        </div> */}
        <div className="absolute  max-w-[575px]">
          <Orb />
        </div>
        <div className="flex-1 flex mt-[100px] min-h-[500px] h-full w-full">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
