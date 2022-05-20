import React from 'react'
import TaskItem from './TaskItem'
import { useState,useEffect } from 'react';

const TextArea = (props) => {


// get data from localstorage
const getDataLocalStorage=()=>{
    let list = localStorage.getItem('Data List')
    // console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('Data List'));
    }
    else{
        return [];
    }
}


    const [task, setTask] = useState("");
    const [item, setItem] = useState(getDataLocalStorage());
    const [toggleAddBtn, setToggleAddBtn]= useState(true)
    const [editedTask, setEditedTask] = useState(null)


    const inputChange = (event) => {
        setTask(event.target.value);
    };

// Add item 
    const addTask = () => {
        if (task == ""){
            alert(" Please Enter Your Task")
        } else if (task && !toggleAddBtn) {
            setItem(
                item.map((element)=>{
                     if (element.id===editedTask) {
                        return {...element,name:task} 

                     }
                     return element;
                })
            );
            setToggleAddBtn(true)
            setTask('');
            setEditedTask(null);

        }
        else {
            setItem((oldTask) => {
                const inputTask={id: new Date().getTime().toString(), name: task}
                return ([...oldTask, inputTask]);//with the spread operator we can acess this             
            });

            setTask("");
            setToggleAddBtn(true)
        }
    }
      // Edit a Task  
        const editFunction=(id)=>{
            const newEditedItem= item.find((curTask)=>{
                return curTask.id === id;
            });
            console.log(newEditedItem);
            setToggleAddBtn(false)
            setTask(newEditedItem.name);
            setEditedTask(id);
               
        }
      


    //  Delete An Item 
    const deleteFunction = (index) => {
        setItem((oldTask) => {
            return oldTask.filter((curTask) => {
                return index !== curTask.id;
            })
        });
    }
// save data on localstorage

useEffect(() => {
 localStorage.setItem("Data List",JSON.stringify(item))
//  console.log(item);
}, [item])


    return (
        <div>
            <div className="wrapper d-flex justify-content-center align-items-center">
                <div className="main-container " >
                    <div className="card-header h5 text-center">
                        Your ToDo App
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Your Task : </h5>
                        <div className="input-group mb-5">
                            <input type="text" className="form-control" placeholder="✍ Write Your Today's Task" aria-label="Recipient's username with two button addons" value={task} onChange={inputChange} />
                           {
                               toggleAddBtn ?  <button className="btn" type="button" onClick={addTask}><i className="fas fa-plus-circle"></i></button>  
                                :
                               <button className="btn" type="button" onClick={addTask}><i className="fa fa-edit"></i></button>
                           }
                        </div>

                        <p className="card-text">

                            {item.map((curTask, index) => {

                                return <TaskItem text={curTask} id={index} delete={deleteFunction} edit={editFunction}/>
                            })}
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default TextArea