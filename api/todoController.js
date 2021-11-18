import TodoDAO from "../dao/todoDAO.js";

export default class TodoController {
    static async getTodos(req, res) {
        let response;
        let sort = req.query.sort;
        let query = {};

        if (req.query.user){
            query.user = req.query.user;
        };
        if (req.query.start || req.query.end) {
            query.date = {};
            if (req.query.start) {
                query.date['$gte'] = new Date(req.query.start);
            }
            if (req.query.end) {
                query.date['$lte'] = new Date(req.query.end);
            }
        };
        if (req.query.tags) {
            query.tags = { $all: req.query.tags.split(',') };
        }
        
        response = await TodoDAO.search(query, sort);

        
        res.json(response);
    }

    static async findById(req, res) {
        let todo = await TodoDAO.findById(req.params.id);
        res.json(todo);
    }

    static async deleteById(req, res) {
        let response = await TodoDAO.deleteById(req.params.id);
        res.json(response);
    }

    static async addTodo(req, res) {
        let response = await TodoDAO.addTodo(req.body);
        res.json(response);
    }

    static async updateTodo (req, res) {
        let response = await TodoDAO.update(req.params.id, req.body);
        res.json(response);
    }

    static async getTags(req, res) {
        let response = await TodoDAO.getTags();
        res.json(response)
    }
}