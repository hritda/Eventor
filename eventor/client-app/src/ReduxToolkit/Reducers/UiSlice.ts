import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { without } from "lodash";

type ModalTypes = "CreateEvent" | undefined;

export type RefetchTypes = "EventList" | undefined;

type IReduxLoading = {
  isLoading: boolean;
  label?: string | undefined;
};

const INITIAL_STATE = {
  loading: {
    isLoading: false,
    label: "Loading",
  } as IReduxLoading,
  modalType: [] as ModalTypes[],
  refetch: [] as RefetchTypes[],
};

const UiSlice = createSlice({
  name: "ui",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, action: PayloadAction<IReduxLoading>) => {
      state.loading = action?.payload;
    },
    openModal: (state, action: PayloadAction<ModalTypes>) => {
      state.modalType = [...state.modalType, action?.payload];
    },
    closeModal: (state, action: PayloadAction<ModalTypes>) => {
      state.modalType = without(state.modalType, action?.payload);
    },
    closeAllModals: (state) => {
      state.modalType = [];
    },
    startRefetch: (state, action: PayloadAction<RefetchTypes>) => {
      state.refetch = [...state.refetch, action?.payload];
    },
    stopRefetch: (state, action: PayloadAction<RefetchTypes>) => {
      state.refetch = without(state.refetch, action?.payload);
    },
  },
});

export const { setLoading, openModal, closeModal, closeAllModals } =
  UiSlice.actions;
export default UiSlice.reducer;
