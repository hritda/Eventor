import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducers/LayoutSlice";
import BookmarkHeaderSlice from "./Reducers/BookmarkHeaderSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import AuthSlice from "./Reducers/AuthSlice";
import UiSlice from "./Reducers/UiSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    bookmarkHeader: BookmarkHeaderSlice,
    themeCustomizer: ThemeCustomizerSlice,
    auth: AuthSlice,
    ui: UiSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
