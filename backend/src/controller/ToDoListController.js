import ToDoListModel from "../models/ToDoListModel.js";
import Logger from "../utils/Logger.js";

const createUser = async (req, res) => {
    Logger.http(req.body)

    const ToDoList = new ToDoListModel({
        ToDoUser: req.body.ToDoUser,
        status: req.body.status,
        assignedTo: req.body.assignedTo,
    })
    Logger.debug(ToDoList)

    try {
        const response = await ToDoList.save()
        Logger.debug(response)
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send({message: error.message})

    }

};

const getAllTODOListUsers = async (req, res) => {
    try {
        const response = await ToDoListModel.find()
        Logger.debug(response)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send({message: error.message})

    }
}

const getTODOListUserById = async (req, res) => {
    const id = req.params.id
    try {
        Logger.debug( `req.params.userId: ${req.params.Id}`)
        const response = await ToDoListModel.findById(req.params.Id)
        Logger.debug(response)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send({
            message: `Error occurred while trying to retrieve user with ID ${req.params.userId}`,
            error: error.message})

    }
}

const getTODOListUserByUsername = async (req, res) => {
    try {
        Logger.debug(`req.query.username: ${req.query.username}`)
        const response = await ToDoListModel.find({username: req.query.username})
        Logger.debug(response)
        response.length !== 0
            ? res.status(200).send(response)
            : res.status(404).send({message: `Couldn't find user with username '${req.query.username}'`})
    } catch (error) {
        res.status(500).send({
            message: `Error occurred while trying to retrieve user with username ${req.params.username}`,
            error: error.message})
    }
}

const updateTODOListUserById = async (req, res) => {
    try {
        Logger.http(`req.params.userId: ${req.params.userId}`)
        Logger.http(`req.body: ${req.body}`)

        if (!req.body) {
            res.status(400).send({message: `Can't update with empty values! `})
        }

        const response = await ToDoListModel.findByIdAndUpdate(req.params.userId,{
            username: req.body.username,
            password: req.body.password,
        }, {new: true})
        Logger.debug(response)
        response.length !== 0
            ? res.status(200).send(response)
            : res.status(404).send({message: `Couldn't find user with ID '${req.query.userId}'`})
    } catch (error) {
        res.status(500).send({
            message: `Error occurred while trying to update user with ID: ${req.params.userId}`,
            error: error.message})
    }
}

const deleteTODOListUserById = async (req, res) => {
    try {
        Logger.http(req.params.userId)
        const response = await ToDoListModel.findByIdAndDelete(req.params.userId)
        Logger.debug(response)
        res.status(200).send({
            message: `Successfully deleted users with username '${response.username}' and ID: ${req.params.userId}`
        })
    } catch (error) {
        res.status(500).send({
            message: `Error occurred while trying to delete user with ID: ${req.params.userId}`,
            error: error.message})
    }
}

export default {
    createUser,
    getAllTODOListUsers,
    getTODOListUserById,
   getTODOListUserByUsername,
    updateTODOListUserById,
    deleteTODOListUserById,

}