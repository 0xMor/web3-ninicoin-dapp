import { expect } from "chai";
import { ethers } from "hardhat";
import { HolaMundo } from "../typechain-types";

describe("HolaMundo", function () {
    let holaMundo: HolaMundo;
    const mensajeInicial = "Hola, Test!";

    it("Should deploy with valid address", async function () {
        const HolaMundoFactory = await ethers.getContractFactory("HolaMundo");
        holaMundo = await HolaMundoFactory.deploy(mensajeInicial);
        await holaMundo.waitForDeployment();

        expect(holaMundo.target).to.be.properAddress;
    });

    it("Should have the correct initial message", async function () {
        expect(await holaMundo.saludo()).to.equal(mensajeInicial);
    });
});
