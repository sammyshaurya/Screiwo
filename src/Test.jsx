import React, {useState,useEffect} from 'react'

const Test = () => {
    const savedtask = localStorage.getItem('tasks');
    const [task, setTask] = useState(savedtask? JSON.parse(savedtask):[]);

    const [newTask, setNewTask] = useState("")
    const handleInputChange = (e) => {
        setNewTask(e.target.value)
    }
    useEffect(() => {
        console.log(JSON.stringify(task))
        localStorage.setItem('tasks', JSON.stringify(task));
    }, [task]);

    const addtask = (e) => {
        e.preventDefault();
        if (newTask.trim('')) {
            setTask((prev => [...prev, newTask.trim()]));
            setNewTask("")
        }
    }

    const taskdel = (index) => {
        setTask((prev) => {
            const updatedTask = [...prev];
            updatedTask.splice(index, 1);
            return updatedTask;
        })
    }
    return (
    <div>
        <input onChange={handleInputChange} type="text" placeholder="Enter some text" />
        <button onClick={(e)=>addtask(e)}>Add task</button>
        {task.map((t, index) => (
            <div key={index}>
                {t}
                <button onClick={()=> taskdel(index)}> del</button>
            </div>
        ))}
    </div>
  )
}

export default Test