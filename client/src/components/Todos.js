import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [newTags, setNewTags] = useState("");
    const [showCompleted, setShowCompleted] = useState(true);
    const [sort, setSort] = useState(-1);
    const [filter, setFilter] = useState(null);
    const [search, setSearch] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteText, setDeleteText] = useState("");
  
    const getAllTodos = () => {
        axios
            .get(`/todos/?sort=${sort}`)
            .then(res => {
                console.log(res.data);
                setTodos(res.data);
            })
            .catch(err => console.log(err));
    }

    const handleToggleCompleted = (e) => {
        setShowCompleted(prevState => !prevState)
    }

    const handleToggleSort = (e) => {
        setSort(prevState => prevState * -1)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let tag;
        if (filter == 'Filter by tag...') {
            tag = null;
        }
        else tag = filter;
        axios
            .get(`/todos/?sort=${sort}&${search ? `text=${search}`: ''}&${tag ? `tags=${tag}`: ''}`)
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    }

    const handleShowAll = () => {
        setSearch('');
        setFilter('Filter by tag...');
        getAllTodos();
    }

    const handleDelete = (todo_id) => {
        axios
            .delete(`/todos/${todo_id}`)
            .then(setTodos(prevState => prevState.filter(todo => todo._id != todo_id)))
            .catch(err => console.log(err));
    }
    
    const handleTextChange = (e) => {
        setNewTodo(e.target.value)
    }

    const handleTagsChange = (e) => {
        setNewTags(e.target.value)
    }
    
    const handleCheck = (todo_id) => {
        let i = todos.findIndex(todo => todo._id == todo_id);
        let tempTodos = [...todos];
        axios
            .put(`/todos/${todo_id}`, {isComplete: !tempTodos[i].isComplete})
            .then(()=> {
                tempTodos[i].isComplete=!tempTodos[i].isComplete;
                setTodos(tempTodos);
            })
            .catch(err => console.log(err));
        
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            text: newTodo,
            tags: newTags.split(' '),
            isComplete: false
        }
        axios
            .post('/todos/', newEntry)
            .then((res) => {
                newEntry._id = res.data.insertedId;
                (sort != 1) ? setTodos(prevState => [newEntry, ...prevState]) :
                setTodos(prevState => [...prevState, newEntry])
                setNewTodo('');
                setNewTags('');
            })
            .catch (err => console.log(err))
    }

    useEffect(()=>{
        getAllTodos();
    }, [sort])

    useEffect(()=> {
        axios
            .get('/todos/tags')
            .then(res => {
                console.log(res.data);
                setTags(res.data);
            })
            .catch(err => console.log(err));
    }, [todos])
    


    return ( 
        <div className='text-secondary'>
            <p>
                <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#options">
                    Options
                </button>
            </p>
            <div className="collapse" id="options">
                <div className="border row">
                    <div className="col">
                        <button className="btn" onClick={handleToggleCompleted}>
                            <i className={showCompleted ? 'bi bi-toggle-on fs-1' : 'bi bi-toggle-off fs-1'} />
                        </button>
                        <p>Hide/Show Completed</p>
                    </div>
                    <div className="col">
                        <button className="btn" onClick={handleToggleSort}>
                            <i className={(sort != 1) ? 'bi bi-toggle-on fs-1' : 'bi bi-toggle-off fs-1'} />
                        </button>
                        <p>Sort by Oldest/Newest</p>
                    </div>
                    <div className="col">
                        
                        <select 
                            className="form-select mt-3" 
                            onChange={handleFilterChange}
                            value={filter}
                        >
                            <option value={null}>Filter by tag...</option>
                            {tags.map((tag, i) => {
                                return (
                                    <option value={tag} key={i}>{tag}</option>
                                )
                            })}
                        </select>
                        <form className="input-group my-2" onSubmit={handleSearch}>
                            <input 
                                className="form-control" 
                                type="text"
                                value={search} 
                                placeholder="Search..." 
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-outline-secondary">Search</button>
                        </form>
                        <div className="text-end mb-2">
                            <button className="btn btn-outline-secondary" onClick={handleShowAll}>Show All</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <form className="row bg-light m-4 pt-3" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <div className="col-8">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Add new to-do"
                            value={newTodo} 
                            onChange={handleTextChange}
                        />
                    </div>
                    <div className="col-3">
                        <input 
                            type="text" 
                            placeholder="add tag(s)"
                            value={newTags}
                            onChange={handleTagsChange} 
                            className="form-control form-control-lg" />
                    </div>
                    <div className="col-1">
                        <button className="btn btn-outline-primary mx-1" type="submit" id="addButton"><i className="bi bi-plus-lg fs-4"></i></button>
                    </div>
                    
                </div>
            </form>
            
            {todos.map((todo, i) => {
                return (
                    <div className={!showCompleted && todo.isComplete ? "d-none" : "bg-light p-3 m-4"} key={i}>
                        <p className='display-6'>
                            <button className="btn" onClick={() => handleCheck(todo._id)}>
                                <i className={todo.isComplete ? 'bi bi-check-square-fill fs-2' : 'bi bi-square fs-2'} />
                            </button>
                            {todo.text}
                            </p>
                        <p className="text-lead">Tag(s): {todo.tags && todo.tags.map((tag, i) => {
                            return (
                                <small key={i}>{tag} </small>
                            )
                        })}</p>
                        <div className="row">
                            <div className="col">
                                
                            </div>
                            <div className="col text-end">
                                <button 
                                    className="btn btn-secondary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#deleteWindow" 
                                    onClick={() => {
                                        setDeleteId(todo._id);
                                        setDeleteText(todo.text);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    
                )
            })}

            
            <div className="modal fade" id="deleteWindow" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Delete</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this entry?
                        <p className="lead">{deleteText}</p>                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleDelete(deleteId)}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default Todos;