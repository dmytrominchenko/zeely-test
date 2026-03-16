import { Sidebar } from "@/components/background-generator/Sidebar";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/backgroundSlice";
import { Button } from "@/components/ui/button";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button
        onClick={() => dispatch(toggleSidebar())}
        className="bg-black text-white hover:bg-gray-900 rounded-lg px-6 py-3 text-sm font-medium shadow-lg transition-transform hover:scale-105"
      >
        Change background
      </Button>
      <Sidebar />
    </div>
  );
}

export default App;
