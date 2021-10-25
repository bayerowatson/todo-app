import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let todos

export default class TodoDAO {
  static async injectDB(conn) {
    if (todos) {
      return
    }
    try {
      todos = await conn.db('todos').collection("todos")
    } catch (e) {
      console.error(`Unable to establish collection handles in todoDAO: ${e}`)
    }
  }

  // static async getAll(sort) {
  //   try {
  //     let allTodos = await todos.find({}).sort({ date: sort }).toArray();
  //     console.log(`retrieved all todos from DB`);
  //     return (allTodos);
  //   } catch (err) {console.log(err)}
    
  // }

  static async findById(id) {
    try {
      let todo = await todos.findOne({_id: ObjectId(id)});
      console.log(`retrieved ${id} from DB`);
      return (todo);
    } catch (err) {console.log(err)}
  }

  static async deleteById(id) {
    try {
      let response = await todos.deleteOne({_id: ObjectId(id)})
      if (response.deletedCount == 0) {
        console.log('no items deleted')
      }
      else console.log(`deleted ${id} from DB`);
      return (response);
    } catch (err) {console.log(err)}
    
  }

  static async addTodo(newTodo) {
      try {
        let response = await todos.insertOne(
          {...newTodo,
            "date": new Date() 
          });
          console.log(`added new entry to DB: `, response.insertedId);
          return (response);
      } catch (err) {console.log(err)}
    
  }

  static async search(query, sort) {
    try {
      let response = await todos.find(query).sort({ date: sort }).toArray();
      console.log('performed query:', query, 'sort:', sort);
      return (response);
    } catch (err) { console.log(err)}
  }

  static async update(id, update) {
    try {
      let response = await todos.updateOne({_id: ObjectId(id)}, {$set: update});
      if (response.modifiedCount == 0) {
        console.log('no items modified')
      }
      else console.log(`modified ${id}`);
      return (response);
    } catch (err) { console.log(err)} 
  }

  static async getTags() {
    try {
      let response = await todos.distinct('tags');
      console.log('retrieved tags')
      return (response);
    } catch (err) { console.log(err)}
  }
  
}