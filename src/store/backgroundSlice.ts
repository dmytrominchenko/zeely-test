import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { GENERATION_TIME_SECONDS } from "@/lib/constants";

export interface Background {
  id: string;
  url: string;
  isDefault?: boolean;
}

interface BackgroundState {
  isOpen: boolean;
  prompt: string;
  isGenerating: boolean;
  backgrounds: Background[];
  selectedBackgroundId: string;
}

const INITIAL_BACKGROUNDS: Background[] = [
  {
    id: "default",
    url: "/images/default-photo.png",
    isDefault: true,
  },
];

const AVAILABLE_BACKGROUNDS: Background[] = [
  { id: "template-1", url: "/images/bg-1.png" },
  { id: "template-2", url: "/images/bg-2.png" },
  { id: "template-3", url: "/images/bg-3.png" },
  { id: "template-4", url: "/images/bg-4.png" },
];

const initialState: BackgroundState = {
  isOpen: false,
  prompt: "",
  isGenerating: false,
  backgrounds: INITIAL_BACKGROUNDS,
  selectedBackgroundId: "default",
};

export const generateBackground = createAsyncThunk(
  "background/generate",
  async (_, { getState }) => {
    const { background } = getState() as { background: BackgroundState };

    await new Promise((resolve) =>
      setTimeout(resolve, GENERATION_TIME_SECONDS * 1000),
    );

    const currentCount = background.backgrounds.length - 1;
    const nextIndex = currentCount % AVAILABLE_BACKGROUNDS.length;
    const template = AVAILABLE_BACKGROUNDS[nextIndex];

    return {
      id: crypto.randomUUID(),
      url: template.url,
    } satisfies Background;
  },
  {
    condition: (_, { getState }) => {
      const { background } = getState() as { background: BackgroundState };
      return !!(background.prompt.trim() && !background.isGenerating);
    },
  },
);

const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    selectBackground(state, action: PayloadAction<string>) {
      state.selectedBackgroundId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateBackground.pending, (state) => {
        state.isGenerating = true;
        state.prompt = "";
      })
      .addCase(generateBackground.fulfilled, (state, action) => {
        state.backgrounds = [action.payload, ...state.backgrounds];
        state.selectedBackgroundId = action.payload.id;
        state.isGenerating = false;
      });
  },
});

export const { toggleSidebar, setPrompt, selectBackground } =
  backgroundSlice.actions;

export default backgroundSlice.reducer;
