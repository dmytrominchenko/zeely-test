import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPrompt, generateBackground } from "@/store/backgroundSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AiIcon from "/src/assets/icons/AI.svg";
import Ai2Icon from "/src/assets/icons/AI-2.svg";
import ActionBackIcon from "/src/assets/icons/action_back.svg";
import ActionNextIcon from "/src/assets/icons/action_next.svg";

export function BackgroundGenerator() {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector((s) => s.background.prompt);
  const isGenerating = useAppSelector((s) => s.background.isGenerating);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="background-prompt"
          className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Background idea
        </label>
        <div className="group mt-3 flex min-h-[195px] flex-col rounded-xl border border-[#F2F4F6] bg-background transition-all focus-within:ring-inset focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">

          <Textarea
            id="background-prompt"
            placeholder="Describe your background..."
            className="flex-1 resize-none border-0 bg-transparent p-4 font-medium leading-relaxed shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={prompt}
            onChange={(e) => dispatch(setPrompt(e.target.value))}
          />

          <div className="flex items-center justify-between px-4 pb-3">
            <button
              className="flex items-center gap-1.5 rounded-md text-xs font-semibold hover:bg-purple-50 transition-colors"
              onClick={() => dispatch(setPrompt("Improved prompt by AI"))}
            >
              <img
                src={AiIcon}
                alt=""
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
              Regenerate
            </button>

            <div className="flex gap-1">
              <button
                className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Undo"
              >
                <img
                  src={ActionBackIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
              <button
                className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Redo"
              >
                <img
                  src={ActionNextIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full bg-black text-white hover:bg-zinc-800 h-12 rounded-full relative overflow-hidden group transition-all"
        onClick={() => dispatch(generateBackground())}
        disabled={isGenerating || !prompt.trim()}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            Generating...
          </span>
        ) : (
          <span className="flex items-center gap-2 font-semibold text-sm leading-[80%]">
            <img
              src={Ai2Icon}
              alt=""
              aria-hidden="true"
              className="w-4 h-4"
            />
            Generate BG for 1 credit
          </span>
        )}
      </Button>
    </div>
  );
}
