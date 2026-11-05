// Create an Express API for task management with GET and POST endpoints
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const tasks = [];
let nextTaskId = 1;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/tasks', (req, res) => {
	res.json(tasks);
});

app.post('/tasks', (req, res) => {
	const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';

	if (!title) {
		return res.status(400).json({ error: 'Task title is required.' });
	}

	const task = {
		id: nextTaskId++,
		title,
		completed: false,
	};

	tasks.push(task);
	return res.status(201).json(task);
});

if (require.main === module) {
	app.listen(port, () => {
		console.log(`Task API listening on port ${port}`);
	});
}

module.exports = app;
