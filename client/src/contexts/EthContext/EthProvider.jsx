import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(

    // 修改此处，增加数量
    async (artifact1, artifact2, artifact3) => {
      let contract1, contract2, contract3;
      const web3 = new Web3(Web3.givenProvider || "localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const networkID = await web3.eth.net.getId();

      /// 很蠢但是忍一下
      if (artifact1) {
        const { abi } = artifact1;
        let address;
        try {
          // 将 json 化的 contract 和 address 相连接
          address = artifact1.networks[networkID].address;
          contract1 = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
      }
      if (artifact2) {
        const { abi } = artifact2;
        let address;
        try {
          // 将 json 化的 contract 和 address 相连接
          address = artifact2.networks[networkID].address;
          contract2 = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        /// 很蠢但是忍一下
      }

      if (artifact3) {
        const { abi } = artifact3;
        let address;
        try {
          // 将 json 化的 contract 和 address 相连接
          address = artifact3.networks[networkID].address;
          contract3 = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        /// 很蠢但是忍一下
      }
      // if (artifact4) {
      //   const { abi } = artifact4;
      //   let address;
      //   try {
      //     // 将 json 化的 contract 和 address 相连接
      //     address = artifact4.networks[networkID].address;
      //     contract4 = new web3.eth.Contract(abi, address);
      //   } catch (err) {
      //     console.error(err);
      //   }
      //   /// 很蠢但是忍一下
      // }
      dispatch({
        type: actions.init,
        data: { artifact1, artifact2, artifact3, web3, accounts, networkID, contract1, contract2, contract3 }
      });
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        // 修改此处的列表，增加artifact数量
        const artifact1 = require("../../contracts/SimpleStorage.json");
        const artifact2 = require("../../contracts/GameProfile.json");
        const artifact3 = require("../../contracts/GameSpirit.json");
        // const artifact3 = require("../../contracts/GameSpirit.json");
        init(artifact1, artifact2, artifact3);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
