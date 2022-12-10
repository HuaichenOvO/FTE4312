const actions = {
  init: "INIT",
};

const initialState = {
  artifact1: null,
  artifact2: null,
  artifact3: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract1: null,
  contract2: null,
  contract3: null
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  actions,
  initialState,
  reducer
};
