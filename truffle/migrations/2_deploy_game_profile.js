const GameProfile = artifacts.require("GameProfile");

module.exports = function (deployer) {
    deployer.deploy(GameProfile);
};
