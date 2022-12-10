import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { EthProvider } from "../../contexts/EthContext";
import GameHeader from "../../components/GameHeader";
import GameFooter from "../../components/GameFooter";
import GameProfile from "../../components/Profile";

function App() {
    let [account, setAccount] = useState(null)
    let [web3, setWeb3] = useState(null)
    useEffect(() => {
        checkAccount()
    }, [])

    // invoke to check if account is already connected
    async function checkAccount() {
        web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
    }
    return (
        <div id="App" >
            <div className="container">
                <GameHeader />
                <div className="container">
                    <EthProvider>
                        <GameProfile />
                    </EthProvider>
                </div>

                <GameFooter />
            </div>
        </div>
    );
}

export default App;