import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoutingState {
  stack: string[];
}

const getInitialStack = (): string[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("routingStack");
    if (saved) return JSON.parse(saved);
  }
  return ["home"];
};

const initialState: RoutingState = {
  stack: getInitialStack(),
};

const routingSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    pushRoute: (state, action: PayloadAction<string>) => {
      state.stack.push(action.payload);
    },
    popRoute: (state) => {
      if (state.stack.length > 1) state.stack.pop();
    },
    resetRoute: (state, action: PayloadAction<string>) => {
      state.stack = ["home", action.payload];
    },
    setStack: (state, action: PayloadAction<string[]>) => {
      state.stack = action.payload;
    },
  },
});

export const { pushRoute, popRoute, resetRoute, setStack } = routingSlice.actions;
export default routingSlice.reducer;