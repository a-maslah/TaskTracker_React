import React from 'react'
import {useState}  from 'react'

function AddTask({onAdd}) {

   const [text,setText] = useState("");
   const [day,setDay] = useState("");
   const [reminder,setReminder] = useState(false);

   const onSubmit = (e) => {
       e.preventDefault();
       if(!text){
           alert('Plaease enter the text')
           return null;
       }
       onAdd({text,day,reminder})

       setText('')
       setDay('')
       setReminder(false)
  }
  return (
      <div>
    <form className='add-form' onSubmit={onSubmit} >
          <div className='form-control'>
               <label>Task</label>
               <input type="text"
                 onChange={(e)=>setText(e.target.value)}
                 value={text}
                 placeholder='Add Task'/>
          </div>
          <div className='form-control'>
               <label>Day & Time</label>
               <input type="text"
                 onChange={(e)=>setDay(e.target.value)}
                 value={day}
                 placeholder='Day & Time'/>
          </div>
          <div className='form-control form-control-check'>
               <label>Set Reminder</label>
               <input type="checkbox" 
               checked={reminder}
                value={reminder}       
              onChange={(e)=>setReminder(e.currentTarget.checked)}
               />
          </div>
          <input className='btn btn-block' type='submit' value='Save Task'/>
    </form>
    </div>
  )
}

export default AddTask