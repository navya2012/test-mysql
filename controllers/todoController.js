const connection = require('../db/connection');

//get
const getTodo = (req, res) => {
    try {
        connection.query('SELECT * FROM todoList.todo', (err, results) => {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Error retrieving tasks from the database',error: err.message });
                return;
            }
            res.status(200).json({ status: 'success', data: results });
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//create
const createTodo = (req, res) => {
    const { title, description, status } = req.body;
    try {
        connection.query('INSERT INTO todoList.todo (title, description, status) VALUES (?, ?, ?)', [title, description, status], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, title, description, status });
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//put
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        // First, check if the task with the given id exists
        connection.query('SELECT * FROM todoList.todo WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Error fetching task',error:err.message });
            }

            // Check if any task was found
            if (results.length === 0) {
                return res.status(404).json({ status: 'error', message: 'id is not found' });
            }

            // If task exists, proceed with the update
            connection.query(
                'UPDATE todoList.todo SET title = ?, description = ?, status = ? WHERE id = ?',
                [title, description, status, id],
                (err) => {
                    if (err) {
                        return res.status(500).json({ status: 'error', message: 'Error updating task', error:err.message });
                    }
                    res.status(200).json({ status: 'success', message: 'Task updated successfully' });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message }); // Changed to 500 for server error
    }
};


//delete
const deleteTodo = (req, res) => {
    const id = req.params.id;
    try {
        connection.query('DELETE FROM todoList.todo WHERE id = ?', [id], (err) => {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Error deleting task' , error: err.message});
                return;
            }
            res.status(200).json({ status: 'success', message: 'Task deleted successfully' });
        });
    }
    catch (error) {
        res.status(200).json({ error: error.message })
    }
}


module.exports = {
    createTodo,
    deleteTodo,
    getTodo,
    updateTodo
}