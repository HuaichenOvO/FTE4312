import React, { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { SignIn } from "../Profile/GameProfile"
import { CountdownTimer } from "./CountDown"

export function GameTrace() {
    const { state } = useEth();
    const [spiritList, setSpiritList] = useState(<></>);
    const [item, setItem] = useState("?");

    const _feed = async (event) => {
        let index = event.target.id;
        let itemNum = await state.contract2.methods.readItem().call({ from: state.accounts[0] });
        if (itemNum <= 0) {
            alert("You have no snacks~ Go and buy some!");
        }
        else {
            console.log("Want to feed", index);
            await state.contract2.methods.feed(parseInt(index)).send({ from: state.accounts[0] });
            window.location.reload(false);
        }
    };

    async function GetSpiritList() {
        try {
            const len = await state.contract3.methods.userSpiritNumber(state.accounts[0]).call({ from: state.accounts[0] });
            const _item = await state.contract2.methods.readItem().call({ from: state.accounts[0] });
            setItem(_item);
            if (len == 0) {
                setSpiritList(<p align="middle">😣But you do not have any fairies 🤧</p>)
            }
            else {
                console.log("Current NFT number: ", len);
                let tmpPage;
                for (let i = 0; i < len; i++) {
                    let tmpImgURL = await state.contract3.methods.userSpiritHash(i).call({ from: state.accounts[0] });
                    let tmpImgTime = await state.contract3.methods.userSpiritTime(i).call({ from: state.accounts[0] });
                    let tmpRealtime = new Date().getTime();
                    console.log(" NFT -", i, "'s timestamp:", parseInt(tmpImgTime), "\n",
                        "Reality's timestamp:", tmpRealtime);
                    tmpPage = (
                        <>
                            {tmpPage}
                            <li>
                                <img height="150" width="150" src={"https://ipfs.io/ipfs/" + tmpImgURL}></img>
                                <br />
                                <button id={i} onClick={_feed}>Feed ! </button> NFT {i}
                                <CountdownTimer targetDate={parseInt(tmpImgTime)} />
                            </li>
                        </>)
                }
                setSpiritList(tmpPage)
                console.log("snacks: ", _item)
            }
        }
        catch (error) { console.log(error); }
    }

    useEffect(() => {
        GetSpiritList()
    }, [])

    const garden =
        <>
            <h3>Here is your farm</h3>
            <p>Feed your fairy with a snack? You have {item} snacks </p>
            <p>You can feed infancy fairies to shorten their growing time,</p>
            <p>you also improve your relationship!</p>
            <ul >
                {spiritList}
            </ul>
        </>;

    return (
        <div className="demo">
            {/* <h1>Garden</h1> */}
            {
                garden
            }
        </div>
    );
}


// just for testing!
export function MyTest() {
    const { state: { contract2, contract3, accounts } } = useEth();


    const _push_NFT = async (e) => {
        const _time = new Date().getTime();
        console.log(_time);
        await contract2.methods.mint(14).send({ from: accounts[0] });

        window.location.reload(false);
    };

    const _test_ = async (e) => {
        const _time = await contract3.methods._test(accounts[0]).call({ from: accounts[0] });
        console.log(_time);

    };


    const push_ui = <>
        <div >
            <b>Add a new NFT: </b>
            <button onClick={_push_NFT}>Cheat!</button>
        </div><div >
            <b>Test timestamp: </b>
            <button onClick={_test_}>test!</button>
        </div>
    </>

    return (<>{push_ui}</>);
}

export function GardenUI() {
    const { state } = useEth();
    const [page, setPage] = useState(<></>);
    useEffect(() => {
        Decide()
    }, [])

    async function Decide() {
        await state.contract2.methods.readExist().call({ from: state.accounts[0] }).then(
            res => {
                if (res) {
                    console.log("Profile exist, show garden");
                    setPage(
                        <>
                            <div >
                                <GameTrace />
                            </div>
                            {/* <MyTest /> */}
                        </>
                    );
                    return 0;
                }
                else {
                    console.log("Profile not exist, create a profile first");
                    setPage(
                        <div className="contract-container">
                            <SignIn />
                        </div>
                    );
                    return 0;
                };
            }
        );
    }
    return page;
}


export default GardenUI;