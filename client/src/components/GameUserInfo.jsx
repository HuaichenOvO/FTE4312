import React, { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { EthProvider } from "../contexts/EthContext";
import Web3 from 'web3'

export function GetUserName() {
    const { state: { contract2 } } = useEth();
    const [name, setName] = useState("em");
    let [account, setAccount] = useState(null)
    let [web3, setWeb3] = useState(null)

    useEffect(() => {
        RenderProfile()
        checkAccount()
    }, [])

    // invoke to check if account is already connected
    async function checkAccount() {
        web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
    }
    async function RenderProfile() {
        try {
            const _name = await contract2.methods.readName().call({ from: account });
            setName(_name);
        }
        catch (error) { console.log(error) }
    }
    return <EthProvider>
        {name}
    </EthProvider>
}

export function GetUserPoint() {
    const { state } = useEth();
    const [point, setPoint] = useState(0);
    useEffect(() => {
        RenderProfile()
    }, [])
    async function RenderProfile() {
        try {
            const _point = await state.contract2.methods.readPoint().call({ from: state.accounts[0] });
            setPoint(_point);
        }
        catch (error) { console.log(error) }
    }
    return point
}

export default GetUserName