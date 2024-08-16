import { createSlice } from "@reduxjs/toolkit";
import { AddProductSliceType } from "../DefinedTypes/AddProduct";

const initialState: AddProductSliceType = {
  navId: 1,
  tabId: 1,
  formValue: {
    eventName: "",
    description: "",
    startTime: "",
    endTime: "",
    eventType: "",
    startDate: "",
    endDate: "",
  },
};

const AddProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setNavId: (state, action) => {
      state.navId = action.payload;
    },
    setTabId: (state, action) => {
      state.tabId = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue[action.payload.name] = action.payload.value;
    },
  },
});
export const { setNavId, setFormValue, setTabId } = AddProductSlice.actions;

export default AddProductSlice.reducer;
