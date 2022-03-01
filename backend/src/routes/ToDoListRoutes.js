import ToDoListController from "../controller/ToDoListController.js";

const routes = (app) => {
    const userUrl = '/toDoLists'
    const userUrlById = `${userUrl}/:userId`
    const searchUsers = '/toDoLists'

    app.post(userUrl, ToDoListController.createUser)
    app.get(userUrl, ToDoListController.getAllTODOListUsers)
    app.get(userUrlById, ToDoListController.getTODOListUserById)
    app.get(searchUsers, ToDoListController.getTODOListUserByUsername)
    app.put(userUrlById, ToDoListController.updateTODOListUserById)
    app.delete(userUrlById, ToDoListController. deleteTODOListUserById)
};

export default {
    routes
}