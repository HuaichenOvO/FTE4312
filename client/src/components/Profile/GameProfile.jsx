import React, { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export function RealProfile() {
    const { state: { contract2, accounts } } = useEth();
    const [newName, setNewName] = useState("");
    const [name, setName] = useState("?");
    const [times, setTimes] = useState("?");
    const [point, setPoint] = useState("?");
    const [item, setItem] = useState("?");
    const [fee, setFee] = useState("?");
    const [buy, setBuy] = useState("");

    useEffect(() => {
        RenderProfile()
    }, [])

    async function RenderProfile() {
        try {
            const _name = await contract2.methods.readName().call({ from: accounts[0] });
            setName(_name);
            const _time = await contract2.methods.readTime().call({ from: accounts[0] });
            setTimes(_time);
            const _point = await contract2.methods.readPoint().call({ from: accounts[0] });
            setPoint(_point);
            const _item = await contract2.methods.readItem().call({ from: accounts[0] });
            setItem(_item);
            const _fee = await contract2.methods.determinMintFee().call({ from: accounts[0] });
            setFee(_fee);
        }
        catch (error) { alert(error); }
    }

    const _changeName = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (newName === "") {
            alert("Please enter a name to write.");
            return;
        }
        await contract2.methods.changeName(newName).send({ from: accounts[0] });
        setNewName("");
        window.location.reload(false);
    };
    const mySetNewName = e => {
        setNewName(e.target.value);
    };
    const _mymint = async (e) => {
        let hour = e.target.id
        await contract2.methods.mint(hour).send({ from: accounts[0] });
        window.location.reload(false);
    }
    const _changeBuy = async (e) => {
        await contract2.methods.buyPoint(buy).send({ from: accounts[0] });
        setBuy(buy);
        window.location.reload(false);
    };
    const mySetBuy = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setBuy(e.target.value);
        }
    };


    return (
        <>
            <code>
                <p><b>Name:</b> {name}</p>
                <p><b>Account:</b> {accounts[0]}</p>
                <p><b>You have bought</b> {times} <b>eggs</b></p>
                <p><b>Fairy Coins:</b> {point}</p>
                <p><b>Snack:</b> {item}</p>
                <div className="input-btn">
                    <b>Set A New Name:</b>
                    <input
                        type="text"
                        placeholder="NewName"
                        value={newName}
                        onChange={mySetNewName}
                    />
                    <button onClick={_changeName}>Submit</button>
                </div>
            </code>
            <hr />
            <h3 align="middle">Wonder Store</h3>
            <code>
                <p><b>The price of an new egg is :{fee} | </b>
                    <button id={24} onClick={_mymint}>Go !</button>
                </p>
                <div className="input-btn">
                    <b>Buy some snacks:</b>
                    <input
                        type="text"
                        placeholder="5 Fairy Coins for a snack~"
                        value={buy}
                        onChange={mySetBuy}
                    />
                    <button onClick={_changeBuy}>Submit</button>
                </div>
            </code>
        </>
    );
}

export function SignIn() {
    const { state: { contract2, accounts } } = useEth();
    const [oriName, setOriName] = useState("");

    const mySetOriName = e => {
        setOriName(e.target.value);
    };
    const _SetUp = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (oriName === "") {
            alert("Please enter a name to write.");
            return;
        }
        try {
            await contract2.methods.setUpProfile(oriName).send({ from: accounts[0] });
            window.location.reload(false);
        }
        catch (error) {
            alert(error);
        }
        setOriName("");
    };


    const signIn =
        <div className="input-btn">
            <b>You don't have an account yet. | Set A New Name: </b>
            <br />
            <input
                type="text"
                placeholder="NewName"
                value={oriName}
                onChange={mySetOriName}
            />
            <button onClick={_SetUp}>Submit</button>
        </div>


    return <>{signIn}</>;
}

export function ProfilePage() {
    const { state: { contract2, accounts } } = useEth();
    const [page, setPage] = useState(<></>);

    // useEffect 直接进行 Decide
    useEffect(() => {
        Decide()
    }, [])

    async function Decide() {
        await contract2.methods.readExist().call({ from: accounts[0] }).then(
            res => {
                if (res) {
                    console.log("Profile exist? Return:", res);
                    setPage(
                        <div className="contract-container">
                            <RealProfile />
                        </div>
                    );
                    return 0;
                }
                else {
                    console.log("Profile exist? Return:", res);
                    setPage(
                        <div className="contract-container">
                            < SignIn />
                        </div>
                    );
                    return 0;
                };
            }
        );
    }
    return page;
}

export default ProfilePage;
