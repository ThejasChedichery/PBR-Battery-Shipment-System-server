
const ContractData = require('../Model/ContractModel')

//Create contract
const createContract = async (req, res) => {

    let count = await ContractData.countDocuments() + 1
    let data = new ContractData({ contractId: "contra" + count, ...req.body })
    try {
        const saveContract = await data.save()
        res.status(200).send({ message: "Contract added successfully", saveContract })
    } catch (err) {
        res.status(500).send({ message: 'canot added Contract', err })
    }
}

//Get all contract
const FindAllContract = async (req, res) => {

    try {
        const allContract = await ContractData.find()
        res.status(200).send(allContract)
    } catch (err) {
        res.status(500).send({ message: 'canot added contract', err })
    }
}

// Get contract by id
const FindSingleContract = async (req, res) => {

    try {
        const singleContract = await ContractData.findOne(req.params)
        if (singleContract != null) {

            res.status(200).send(singleContract)
        }
        else {
            res.status(400).send({ message: "No contract avaliable" })
        }

    } catch (err) {
        res.status(500).send({ message: "Can't find contract", err })
    }

}

// change the status of contract
const EditAllFieldOfContract = async (req, res) => {

    const updatedDatas = req.body
    try {
        const ContractUpdated = await ContractData.findOneAndUpdate(req.params, updatedDatas)
        if (!ContractUpdated) {
            throw Error('No contract found')
        }
        res.status(200).send({ message: "contract field updated successfully" })
    } catch (err) {
        res.status(500).send({ messa: "Can't update contract" + err })
    }
}

module.exports = { createContract, FindAllContract, EditAllFieldOfContract, FindSingleContract }