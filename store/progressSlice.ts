import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ── Types ──────────────────────────────────────────────────────────

type ProgressState = {
  foundStates: { [code: string]: boolean };
  loading: boolean;
  error: string | null;
};

const initialState: ProgressState = {
  foundStates: {},
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
      const found: { [code: string]: boolean } = {};
      for (const p of progress) {
        if (p.plate?.state?.code) {
          found[p.plate.state.code] = true;
        }
      }
      return found;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Unknown error");
    }
  }
);

/** Toggle a state's "found" status (optimistic update handled in slice) */
export const toggleProgress = createAsyncThunk(
  "progress/toggleProgress",
  async (
    {
      code,
      wasFound,
      accessToken,
    }: { code: string; wasFound: boolean; accessToken: string },
    { rejectWithValue }
  ) => {

    try {
      // Look up the DB plate id for the "Standard" plate
      const lookupRes = await fetch(
        `/api/plates/lookup?stateCode=${code}&plateName=Standard`
      );
      if (!lookupRes.ok)
        return rejectWithValue("Failed to look up plate");
      const { plateId } = await lookupRes.json();

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
      return { code, found: !wasFound };
    } catch (err: any) {
      // Return the old value so the rejected reducer can revert
      return rejectWithValue({ code, found: wasFound });
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
      state.foundStates = {};
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
        state.foundStates = action.payload;
        state.loading = false;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ─ toggleProgress (optimistic) ─
    builder
      .addCase(toggleProgress.pending, (state, action) => {
        // Optimistic flip
        const code = action.meta.arg.code;
        state.foundStates[code] = !state.foundStates[code];
      })
      .addCase(toggleProgress.fulfilled, (state, action) => {
        // Confirm — payload already matches the optimistic value
        const { code, found } = action.payload;
        state.foundStates[code] = found;
      })
      .addCase(toggleProgress.rejected, (state, action) => {
        // Revert the optimistic flip
        if (
          action.payload &&
          typeof action.payload === "object" &&
          "code" in action.payload
        ) {
          const { code, found } = action.payload as {
            code: string;
            found: boolean;
          };
          state.foundStates[code] = found;
        }
      });
  },
});

export const { clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
