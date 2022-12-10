import React from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import GardenUI from "./GameTrace";

function Garden() {
    const { state } = useEth();
    const garden =
        <>
            <div className="contract-container">
                <GardenUI />
            </div>
        </>;

    return (
        <div className="demo">
            {
                !state.artifact1 ? <NoticeNoArtifact /> :
                    !state.contract1 ? <NoticeWrongNetwork /> :
                        garden
            }
            {/* <ul>{listItems}</ul> */}

        </div>
    );
}

export default Garden;
