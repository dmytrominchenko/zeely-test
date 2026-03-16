import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectBackground } from "@/store/backgroundSlice";
import { useGenerationProgress } from "@/hooks/useGenerationProgress";
import { ImageCard } from "@/components/background-generator/ImageCard";
import { CircleProgress } from "@/components/ui/circle-progress";
import { RadioGroup } from "@/components/ui/radio-group.tsx";

export function ImageGrid() {
  const dispatch = useAppDispatch();
  const backgrounds = useAppSelector((s) => s.background.backgrounds);
  const selectedBackgroundId = useAppSelector(
    (s) => s.background.selectedBackgroundId,
  );
  const isGenerating = useAppSelector((s) => s.background.isGenerating);
  const { progress, timeLeft } = useGenerationProgress(isGenerating);

  const handleSelect = (id: string) => dispatch(selectBackground(id));

  return (
    <div className="mt-10">
      <h3 id="bg-grid-heading" className="text-sm font-semibold mb-2.5">
        Your backgrounds
      </h3>

      <RadioGroup
        value={selectedBackgroundId}
        onValueChange={handleSelect}
        aria-labelledby="bg-grid-heading"
        className="grid grid-cols-3 gap-3"
      >
        {isGenerating && (
          <div
            className="w-[112px] h-[198px] rounded-lg bg-black flex flex-col items-center justify-center text-white relative overflow-hidden"
            role="status"
            aria-live="polite"
            aria-label="Generating background"
          >
            <CircleProgress value={progress} size={65} strokeWidth={5} />
            <div className="z-10 flex flex-col items-center gap-1 mt-5">
              <span className="text-[10px] text-gray-400">
                {timeLeft} seconds left
              </span>
            </div>
          </div>
        )}

        {backgrounds.map((bg, index) => {
          return (
            <ImageCard
              key={bg.id}
              bg={bg}
              index={index}
              isSelected={selectedBackgroundId === bg.id}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
}