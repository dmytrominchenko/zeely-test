import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/backgroundSlice";
import { BackgroundGenerator } from "./BackgroundGenerator";
import { ImageGrid } from "./ImageGrid";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CloseIcon from "/src/assets/icons/close.svg";

export function Sidebar() {
  const isOpen = useAppSelector((s) => s.background.isOpen);
  const dispatch = useAppDispatch();

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(toggleSidebar())}>
      <SheetContent className="w-[400px] px-5 flex flex-col gap-0">
        <SheetHeader className="pt-8 pb-6 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-[22px] font-bold">
            Change background
          </SheetTitle>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <img src={CloseIcon} alt="Close" className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 pb-6 overflow-y-auto">
          <BackgroundGenerator />
          <ImageGrid />
        </div>
      </SheetContent>
    </Sheet>
  );
}
