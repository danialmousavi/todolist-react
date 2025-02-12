import React, { Component } from 'react'
import Header from './Header'
import Todo from './Todo'
import { BsPlusSquare } from "react-icons/bs";

export default class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todoTitle: '',
            status: 'all'
        }
    }
    todoTitleHandler(e){
        this.setState({todoTitle:e.target.value});

        
    }
    addTodo(e){
        e.preventDefault();
        if(this.state.todoTitle){
            let newTodo={
                id:this.state.todos.length+1,
                title:this.state.todoTitle,
                isCompleted:false
            }
            this.setState((prevState)=>({
                todos:[...prevState.todos,newTodo],
                todoTitle: ''
            }))
        }
    }
    editTodo(id){
    this.setState(prevState => ({
        todos: prevState.todos.map(todo =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
    }));
    }
    removeTodo(id){
        let removedTodo=this.state.todos.filter(todo=>todo.id!==id);
        this.setState({todos:removedTodo})
    }
    statusHandler(e){
        if(e.target.value==='completed'){
            this.setState({status:'completed'})
        }
        else if(e.target.value==='uncompleted'){
            this.setState({status:'uncompleted'})
            
        }
        else{
            this.setState({status:'all'})
        }
    }
    render() {
        return (
            <>
                <Header />
                <form onSubmit={(e)=>this.addTodo(e)}>
                    <input type="text" className="todo-input" value={this.state.todoTitle} maxLength="40" onChange={(e)=>this.todoTitleHandler(e)}/>
                    <button className="todo-button" type="submit">
                        <BsPlusSquare/>
                    </button>
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={(e)=>this.statusHandler(e)}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">

                        {this.state.status==='all'&&this.state.todos.map(todo=>(
                           <Todo key={todo.id} {...todo} onRemove={(id)=>this.removeTodo(id)} onComplete={(id)=>this.editTodo(id)}/>
                        ))}
                        {this.state.status==='completed'&&this.state.todos.filter(todo=>todo.isCompleted===true).map(todo=>(
                           <Todo key={todo.id} {...todo} onRemove={(id)=>this.removeTodo(id)} onComplete={(id)=>this.editTodo(id)}/>
                        ))}                        

                        {this.state.status==='uncompleted'&&this.state.todos.filter(todo=>todo.isCompleted===false).map(todo=>(
                           <Todo key={todo.id} {...todo} onRemove={(id)=>this.removeTodo(id)} onComplete={(id)=>this.editTodo(id)}/>
                        ))}                      
                    </ul>
                </div>
            </>
        )
    }
}
