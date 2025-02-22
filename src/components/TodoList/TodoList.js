import React, { Component, useState } from 'react'
import Header from './Header'
import Todo from './Todo'
import { BsPlusSquare } from "react-icons/bs";

export default function TodoLis() {


    const [todos,setTodos]=useState([]);
    const [todoTitle,setTodoTitle]=useState('');
    const [status,setStatus]=useState('all')
   const todoTitleHandler=(e)=>{
        setTodoTitle(e.target.value)
        
    }
   const addTodo=(e)=>{
        e.preventDefault();
        if(todoTitle){
            let newTodo={
                id:todos.length+1,
                title:todoTitle,
                isCompleted:false
            }
            setTodos(prevState=>{
                return [...prevState, newTodo]
            })
            setTodoTitle('')
        }
    }
    const editTodo=(id)=>{
    setTodos(prevState => 
        prevState.map(todo =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
    );

    }
   const removeTodo=(id)=>{
        let removedTodo=todos.filter(todo=>todo.id!==id);
        setTodos(removedTodo)
    }
   const statusHandler=(e)=>{
        if(e.target.value==='completed'){
            setStatus('completed')
        }
        else if(e.target.value==='uncompleted'){
            setStatus('uncompleted')
        }
        else{
            setStatus('all')
        }
    }

        return (
            <>
                <Header />
                <form onSubmit={(e)=>addTodo(e)}>
                    <input type="text" className="todo-input" value={todoTitle} maxLength="40" onChange={(e)=>todoTitleHandler(e)}/>
                    <button className="todo-button" type="submit">
                        <BsPlusSquare/>
                    </button>
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={(e)=>statusHandler(e)}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">

                        {status==='all'&&todos.map(todo=>(
                           <Todo key={todo.id} {...todo} onRemove={(id)=>removeTodo(id)} onComplete={(id)=>editTodo(id)}/>
                        ))}
                        {status==='completed'&&todos.filter(todo=>todo.isCompleted===true).map(todo=>(
                           <Todo key={todo.id} {...todo} onRemove={(id)=>removeTodo(id)} onComplete={(id)=>editTodo(id)}/>
                        ))}                        

                        {status==='uncompleted'&&todos.filter(todo=>todo.isCompleted===false).map(todo=>(
                           <Todo key={todo.id} {...todo} onRemove={(id)=>removeTodo(id)} onComplete={(id)=>editTodo(id)}/>
                        ))}                      
                    </ul>
                </div>
            </>
        )
    }

