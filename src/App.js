import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState,useEffect}  from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const[show,setShow] = useState(false)
  const [tasks,setTasks] = useState([])
 useEffect(() => {
    //component did mount
    axios.get("http://localhost:5000/tasks")
    .then((response) => {
        console.log(response.data);
        setTasks(response.data);
    })
    return () => {
      //component will unmount
      console.log("unmouted")
    }
  }, [])


  const deleteTask = (id) =>{
    //console.log('delete',id);
    axios.delete(`http://localhost:5000/tasks/${id}`)
    .then((response) => {  
      console.log(response)   
    })
    setTasks(tasks.filter((t)=>t.id!==id))


  }
//Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  //ToggleReminder
  const toggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
    
  }


  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }
  return (
    <Router>
    <div className="container">
       <Header onShowAdd={()=>setShow(!show)} onShow={show}/>

       <Routes>
          <Route
            path='/'
            element={
              <>
                {show && <AddTask onAdd={addTask} />}
       
       {
        tasks.length>0 ? (
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ):(
          'No Task To SHow'
        )
       }
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
