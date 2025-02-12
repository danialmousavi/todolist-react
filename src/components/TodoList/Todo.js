import React, { Component } from 'react'
import { FaCheck } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

export default class Todo extends Component {

    render() {
        return (
            // 'completed' class for completed todos
            <div className={this.props.isCompleted?'todo completed':'todo'} style={{ display: 'flex' }}>
                <li className="todo-item">{this.props.title}</li>
                <button className="check-btn" onClick={()=>this.props.onComplete(this.props.id)}>
                    <FaCheck/>
                </button>

                <button className="trash-btn" onClick={()=>this.props.onRemove(this.props.id)}>
                    <FaRegTrashCan/>
                </button>
            </div>
        )
    }
}