import { type Background } from "@/store/backgroundSlice";
import { RadioGroupItem } from "@/components/ui/radio-group.tsx";

interface IProps {
  bg: Background;
  index: number;
  isSelected: boolean;
}

export function ImageCard({ bg, index, isSelected }: IProps) {
  return (
    <RadioGroupItem
      value={bg.id}
      id={`bg-${bg.id}`}
      aria-label={`Background ${index + 1}${bg.isDefault ? ", default" : ""}`}
      className={`relative w-[112px] h-[198px] rounded-lg overflow-hidden group transition-all cursor-pointer
                ${isSelected ? "" : "hover:scale-105"}`}
    >
      <img
        src={bg.url}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {!bg.isDefault && (
        <img
          src="/images/avatar.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain z-10"
        />
      )}

      {bg.isDefault && (
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] px-1.5 py-0.5 rounded-sm text-black font-bold shadow-sm uppercase tracking-wider z-20"
        >
          DEFAULT
        </span>
      )}

      {isSelected && (
        <div
          aria-hidden="true"
          className="absolute border-2 border-black rounded-lg inset-0 bg-black/10 flex items-center justify-center z-20"
        ></div>
      )}
    </RadioGroupItem>
  );
}
