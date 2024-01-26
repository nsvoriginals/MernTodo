import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../AuthContext"; 
import './todos.css'; // Import the CSS file

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputBox, setInputBox] = useState('');
  const location = useLocation();
  const accessTokenFromURL = new URLSearchParams(location.search).get('token');
  const { accessToken: contextToken } = useAuth();
  const accessToken = contextToken || accessTokenFromURL;

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputBox(e.target.value);
  };

  const handleAddTask = async () => {
    if (inputBox.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3000/addtodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token
          },
          body: JSON.stringify({ task: inputBox }),
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        await fetchData(); // Fetch updated data after adding the task
        setInputBox('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      alert('You must write something!');
    }
  };

  const handleTaskClick = async (index) => {
    try {
      // Assuming tasks is an array of tasks in your state
      const updatedTasks = [...tasks];
  
      // Toggle the 'completed' property for the clicked task
      updatedTasks[index] = {
        ...updatedTasks[index],
        completed: !updatedTasks[index].completed,
      };
  
      // Update the state with the modified tasks
      setTasks(updatedTasks);
  
      // Now, update the server with the new 'completed' status
      const response = await fetch(`http://localhost:3000/updatetodo/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ completed: updatedTasks[index].completed }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const response = await fetch(`http://localhost:3000/remtask/${index}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      await fetchData(); // Fetch updated data after deleting the task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <div className="todo-app">
        <div className="app-title">
          <i className="fas fa-clipboard-list"></i>
          <h2>Todo List</h2>
        </div>
        <div className="row">
          <input
            type="text"
            value={inputBox}
            onChange={handleInputChange}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? 'checked' : ''}
              onClick={() => handleTaskClick(index)}
            >
              {task.task}
              <span onClick={() => handleDeleteTask(index)}>
                <i className="fas fa-trash"></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
