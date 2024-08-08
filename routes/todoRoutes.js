
const express = require('express');

const router = express.Router();

const { createTodo, deleteTodo, getTodo, updateTodo } = require('../controllers/todoController');

router.get('/todo', getTodo);
router.post('/create-todo', createTodo);
router.patch('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;