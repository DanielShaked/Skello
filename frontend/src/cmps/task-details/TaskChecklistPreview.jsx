import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCheck2Square } from "react-icons/bs";
import { updateTask } from '../../store/board/board.action.js';

import { TaskTodoList } from './TaskTodoList.jsx'


export function TaskChecklistPreview({ boardId, groupId, task, checklist, checklist: { title, id, } }) {
    const [isAddingItem, setAddingItem] = useState(false);
    const [isEditingTitle, setEditingTitle] = useState(false);
    const [checklistData, setChecklistData] = useState(checklist)
    const [isTextAreaOpen, toggleTextArea] = useState(false);

    const dispatch = useDispatch()


    function handleChange({ target }) {
        const { name, value } = target
        console.log('checklistData', checklistData);
        setChecklistData({ ...checklistData, [name]: value })
    }

    function onRemoveTodo(todoId) {
        const checklistId = checklist.id;
        const updatedChecklist = { ...checklist, todos: checklist.todos.filter(todo => todo.id !== todoId) }
        const taskToUpdate = {
            ...task,
            checklists: task.checklists.map(checklist => (checklist.id !== checklistId ? checklist : updatedChecklist))
        }

        console.log(taskToUpdate);
        onUpdateTask(taskToUpdate);
    }
    function onToggleTodo(todoId) {
        const todoIdx = checklist.todos.findIndex(todo => todo.id === todoId);
        checklistData.todos[todoIdx].isDone = !checklist.todos[todoIdx].isDone
        setChecklistData({ ...checklistData })
    }
    function onSaveTodo(ev, todoId, updatedTodo) {
        // ev.stopPropagation();
        // ev.preventDefault();
        console.log('onSaveTodo!');
        const checklistId = checklist.id;
        const updatedChecklist = { ...checklist, todos: checklist.todos.map(todo => todo.id === todoId ? updatedTodo : todo) }
        const taskToUpdate = {
            ...task,
            checklists: task.checklists.map(checklist => (checklist.id !== checklistId ? checklist : updatedChecklist))
        }
        onUpdateTask(taskToUpdate);
    }

    const onDeleteChecklist = (checklistId) => {
        task.checklists = task.checklists.filter(checklist => (checklist.id !== checklistId));
        onUpdateTask(task)
    }

    function saveChecklist(checklistId) {
        task.checklists = task.checklists.map(checklist => (checklist.id === checklistId ? checklistData : checklist));
        onUpdateTask(task)
    }

    function onUpdateTask(task) {
        dispatch(updateTask(boardId, groupId, task.id, task))
    }









    return (
        <div className='checklist-container'>
            {/* TITLE */}

            {/* Normal */}
            {!isEditingTitle && <section>
                <div className='title-container'>
                    <BsCheck2Square className='primary-icon main-content-icon' />
                    <textarea
                        name="title"
                        defaultValue={title}
                        onClick={(ev) => toggleTextArea(true)}
                        onChange={(ev) => handleChange(ev)}>
                    </textarea>

                    {(isTextAreaOpen) && <section className='edit-checklist-controllers'>
                        <div>
                            <button
                                onClick={() => saveChecklist(checklist.id)}
                                className='save-btn'
                            >
                                Save
                            </button>
                            <button className="primary-close-btn">X</button>
                        </div>
                    </section>}

                    <div className='btns-container'>
                        <button className="checklist-main-btn">Hide checked Items</button>
                        <button
                            className="checklist-main-btn delete-btn"
                            onClick={() => onDeleteChecklist(checklist.id)}
                        >Delete</button>
                    </div>
                </div>
            </section>}

            {/* Editing */}
            {isEditingTitle && <section>


            </section>}
            {/* <textarea className='checklist-title-textarea' name='title' onChange={(event) => handleChange(event)} defaultValue={title} ></textarea>

            {/* PROGRESS-BAR */}
            <div className='progress-bar' >
            </div>
            {/* CHECKLIST-LIST */}
            <TaskTodoList
                onSaveTodo={onSaveTodo}
                onRemoveTodo={onRemoveTodo}
                onToggleTodo={onToggleTodo}
                checklist={checklist} />


            {/* ADD-AN-ITEM */}
            {!isAddingItem && <button className='details-primary-btn add-item-btn' onClick={() => {
                setAddingItem(true)
            }}>Add an Item</button>}
            {isAddingItem && <section className='adding-item-section'>
                <textarea autoFocus onBlur={() => {
                    setAddingItem(false)
                }}></textarea>
                <div className='add-item-controllers'>
                    <button>Add</button>
                    <button>X</button>
                </div>
            </section>}
        </div>
    );
}

{/* <textarea
    value={currTodo.title} className={`todo-item  ${(todo.isDone) ? 'checked' : ''}`}
    onChange={(ev) => setCurrTodo({ title: ev.target.value })}
    onClick={(ev) => onToggleTextArea(ev, true)}  >

</textarea> */}
{/* <AiOutlineDelete className="delete-icon" onClick={() => onRemoveTodo(todo.id)} /> */ }
{/* Editing */ }