import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  liked: string[];
}

const initialState: any = {
  liked: [],
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const isNew = state.find(
        (likedUrl: string) => likedUrl === action.payload
      );
      if (!isNew) state.unshift(action.payload);
    },
    remove: (state, action: PayloadAction<string>): any => {
      return state.filter((url: string) => url !== action.payload);
    },
  },
});

export const { add, remove } = likeSlice.actions;

export const selectLiked = (state: { liked: any }) => state.liked;

export default likeSlice.reducer;
