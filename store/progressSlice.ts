import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ── Types ──────────────────────────────────────────────────────────

type ProgressState = {
  foundPlates: { [plateId: string]: boolean };
  loading: boolean;
  error: string | null;
};

const initialState: ProgressState = {
  foundPlates: {},
  loading: false,
  error: null,
};

// ── Async Thunks ───────────────────────────────────────────────────

/** Fetch the user's full progress from the API */
export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/progress/get", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) return rejectWithValue("Failed to fetch progress");

      const { progress } = await res.json();
      const found: { [plateId: string]: boolean } = {};
      for (const p of progress) {
        if (p.plate?.id) {
          found[p.plate.id] = true;
        }
      }
      return found;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Unknown error");
    }
  }
);

/** Toggle a plate's "found" status (optimistic update handled in slice) */
export const togglePlateProgress = createAsyncThunk(
  "progress/togglePlateProgress",
  async (
    {
      plateId,
      wasFound,
      accessToken,
    }: { plateId: string; wasFound: boolean; accessToken: string },
    { rejectWithValue }
  ) => {
    try {
      if (wasFound) {
        // Remove progress
        await fetch("/api/progress/delete", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plateId }),
        });
      } else {
        // Add progress
        await fetch("/api/progress/set", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plateId }),
        });
      }
      // Return the new value so the fulfilled reducer can confirm it
      return { plateId, found: !wasFound };
    } catch (err: any) {
      // Return the old value so the rejected reducer can revert
      return rejectWithValue({ plateId, found: wasFound });
    }
  }
);

// ── Slice ──────────────────────────────────────────────────────────

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    /** Reset progress (e.g. on sign-out) */
    clearProgress(state) {
      state.foundPlates = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ─ fetchProgress ─
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.foundPlates = action.payload;
        state.loading = false;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ─ togglePlateProgress (optimistic) ─
    builder
      .addCase(togglePlateProgress.pending, (state, action) => {
        // Optimistic flip
        const plateId = action.meta.arg.plateId;
        state.foundPlates[plateId] = !state.foundPlates[plateId];
      })
      .addCase(togglePlateProgress.fulfilled, (state, action) => {
        // Confirm — payload already matches the optimistic value
        const { plateId, found } = action.payload;
        state.foundPlates[plateId] = found;
      })
      .addCase(togglePlateProgress.rejected, (state, action) => {
        // Revert the optimistic flip
        if (
          action.payload &&
          typeof action.payload === "object" &&
          "plateId" in action.payload
        ) {
          const { plateId, found } = action.payload as {
            plateId: string;
            found: boolean;
          };
          state.foundPlates[plateId] = found;
        }
      });
  },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
