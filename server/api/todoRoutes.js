import express from 'express';
import TodoController from './todoController.js';

const router = express.Router();

router.route('/todos')
    .get(TodoController.getTodos)
    .post(TodoController.addTodo)
router.route('/todos/tags')
    .get(TodoController.getTags)
router.route('/todos/:id')
    .get(TodoController.findById)
    .delete(TodoController.deleteById)
    .put(TodoController.updateTodo)



export default router