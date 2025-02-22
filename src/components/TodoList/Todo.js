import React, { Component } from 'react'
import { FaCheck } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

export default function Todo(props) {

        return (
            // 'completed' class for completed todos
            <div className={props.isCompleted?'todo completed':'todo'} style={{ display: 'flex' }}>
                <li className="todo-item">{props.title}</li>
                <button className="check-btn" onClick={()=>props.onComplete(props.id)}>
                    <FaCheck/>
                </button>

                <button className="trash-btn" onClick={()=>props.onRemove(props.id)}>
                    <FaRegTrashCan/>
                </button>
            </div>
        )
    }