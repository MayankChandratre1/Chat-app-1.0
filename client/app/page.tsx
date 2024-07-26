import CreateRoom from "@/components/CreateRoom";
import JoinRoom from "@/components/JoinRoom";
// import NewFrontendApp from "@/components/NewFrontendApp";



export default function Home() {
 
  return (
    <div className="h-screen grid grid-cols-3 place-items-center bg-gray-800 text-white">
      <CreateRoom />
      <div className="h-[80vh] border-r border-r-gray-700"></div>
      <JoinRoom />
    </div>
      // <NewFrontendApp />
  );
}
