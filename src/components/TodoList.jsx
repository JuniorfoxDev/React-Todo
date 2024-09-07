import { useState } from 'react';
import '../components/TodoList.css'
import { MdDelete } from "react-icons/md";

const TodoList = () => {
    const today = new Date();
    const dateFormat = today.toLocaleDateString('en-us',{
        weekday:'long',
        day:'numeric',
        month:'long'
    });
    const [todoValue,setTodoValue] = useState('');
    const [todoList,setTodoList] = useState([
        {
            title:'Go to Gym',
            active: false
        }
    ]);
    const [finishedList,setFinishedList] = useState([
        {
            title:'Prepare for Interview',
            active:true
        }
    ])
    const addTodo = () => {
        if(todoValue) {
            setTodoList([...todoList,{title:todoValue,active:false}]);
            setTodoValue('');
        }
    }
    const changeTodo = (index,isFinishedList) => {
        let item;
        if(isFinishedList){
            item = finishedList[index];
            setFinishedList(finishedList.filter((_,i) => i !== index));
            item.active = false;
            setTodoList([...todoList,item]);
        } else{
            item = todoList[index];
            setTodoList(todoList.filter((_,i) => i !== index));
            item.active = true;
            setFinishedList([...finishedList,item]);
        }
    }
    const deleteTodo = (index) => {
        setTodoList(todoList.filter((_,i) => i !== index))
    }
    const deleteFinishedTodo = (index) => {
        setFinishedList(finishedList.filter((_,i) => i !== index))
    }
    return (
        <div className="bg-white w-[400px] h-fit px-8 py-6 rounded-2xl">
            <div className="flex items-center justify-center bg-slate-400 rounded-xl py-2 px-6 shadow-md hover:shadow-xl">
                <h2 className="font-Poppins font-extrabold text-lg text-white ">Todo List</h2>
            </div>
            <div className="py-4">
                <h1 className="font-Poppins font-bold text-xl">My Day</h1>
                <h1 className="font-Poppins font-medium text-lg">{dateFormat}</h1>
            </div>
            <div className="flex justify-between">
                <div>
                <input type="text" className="bg-gray-800 font-Poppins text-white border-none outline-none px-2 py-2 w-[280px]" placeholder='Enter the Task' value={todoValue} onChange={(e) => setTodoValue(e.target.value)} />
                </div>
                <div>
                <button className="rounded-full h-10 w-10 bg-[#004958] flex items-center justify-center font-Poppins text-3xl" onClick={addTodo}>+</button>
                </div>
            </div>
            <div className="mt-6">
                <h2 className='font-Poppins text-2xl font-medium'>Tasks :</h2>
                <div className='mt-4'>
                    {todoList.map((todo,index) => (
                        <div key={index} className="flex justify-evenly items-center mt-2 bg-gray-800 px-2 py-3">
                        <input type="checkbox" checked={todo.active} onChange={() => changeTodo(index,false)} className="custom-checkbox" />
                        <h2 className="flex-1 px-4 text-white font-Poppins">{todo.title}</h2>
                        <button type='button' onClick={() => deleteTodo(index)}><MdDelete color='red' size={24} /></button>
                    </div>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <h2 className='font-Poppins text-2xl font-medium'>Completed :</h2>
                <div className='mt-4'>
                    {finishedList.map((finished,index) => (
                        <div key={index} className="flex justify-evenly items-center mt-2 bg-gray-800 px-2 py-3">
                        <input type="checkbox" checked={finished.active} onChange={() => changeTodo(index,true)} className="custom-checkbox" />
                        <h2 className="flex-1 px-4 text-white line-through">{finished.title}</h2>
                        <button type='button' onClick={() => deleteFinishedTodo(index)}><MdDelete color='red' size={24} /></button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default TodoList