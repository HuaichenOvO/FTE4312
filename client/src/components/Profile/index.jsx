import React from "react";
import useEth from "../../contexts/EthContext/useEth";
import { ProfilePage } from "./GameProfile";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Profile() {
    const { state } = useEth();

    return (
        <div className="demo">
            <br />
            {
                !state.artifact1 ? <NoticeNoArtifact /> :
                    !state.contract1 ? <NoticeWrongNetwork /> :
                        <ProfilePage />
            }
        </div>
    );
}

export default Profile;
