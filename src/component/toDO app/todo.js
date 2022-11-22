import React, { useEffect, useState } from 'react';
import "./style.css";
//get local storage data back
const getLocalData=()=>{
    const list = localStorage.getItem("mytodolist");
    if(list){
        return JSON.parse(list);

    }
    else{
        return[];

    }
};

//fa fa-plus add-btn
const Todo = () => {
    const [inputdata, setInputData]= useState("");
    const [items, setItems] = useState(getLocalData());
    
    
    //add the item function
    const addItem=()=>{
        if(!inputdata){
            alert("plz fill the empty data");

        }
        else{
            //triple dot is spread operator mean isse pehle jo bhi data tha usko rakho aur naye wale data ko bhi add karo
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name: inputdata,
                status: false,


            }
            setItems([...items, myNewInputData]);
            setInputData("");

        }
    };
    //delete item function
    const deleteItem=(index)=>{
        const updatedItems = items.filter((curElm)=>{
            return curElm.id !== index;


        });
        setItems(updatedItems);


    };
    //completed tasks
    const taskcompleted=(index)=>{
        let newTask = items.map(task => {
            if (task.id === index){
                return({...task, status: !task.status})
            }
            return task;

        })
        setItems(newTask);



        
        

        
        
        

    };
    //remove all the elements
    const removeAll=()=>{
        setItems([]);

    };
    const completedTask=()=>{
        const updatedItems = items.filter((curElm)=>{
            return curElm.status !== false ;


        });
        setItems(updatedItems);
        
        

        

        
    };
    const PendingTasks=()=>{
        const updatedItems = items.filter((curElm)=>{
            return curElm.status === false ;


        });
        setItems(updatedItems);
        
        

        

        
    };




    //adding local storage
    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
        


    },[items]);
    




  return (
    <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todoimg.png" alt="todologo" />
                    <figcaption>Add Your Objectives Here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder="Add Objective" className="form-control"
                    value={inputdata}
                    onChange={(event)=>setInputData(event.target.value)}

                    />
                    <i class="fa fa-light fa-plus" onClick={addItem}></i>   
                </div>
                {/*show our item */}
                <div className="showItems">
                    {
                        items.map((curElm,index)=>{
                            return (
                                <div className="eachItem">
                        <h3>{curElm.name}</h3>
                        <div className="todo-btn" key={curElm.id}>
                        {/*<i class='far fa-edit add-btn'></i>*/ }
                        <i class="fa fa-check-square" aria-hidden="true"
                        style={{
                            backgroundColor: curElm.status===true ? 'red' : '',
                            color: curElm.status===true ? 'white' : '',
                          }}
                          onClick={(event)=>taskcompleted(curElm.id)}></i>
                        <i class='fas fa-trash-alt add-btn' onClick={()=>deleteItem(curElm.id)}></i>
                        
                        </div>

                    </div>
                                
                            );
                        })
                    }
                    

                </div>
                {/*remove all button */}
                <div className="showItems">
                    <button onClick={removeAll} className='btn effect01' data-sm-link-text="REMOVE ALL"><span>Remove All</span></button>
                </div>
                <div className="showItems">
                    <button onClick={completedTask} className='btn effect01'><span>Completed Tasks</span></button>
                </div>
                <div className="showItems">
                    <button onClick={PendingTasks} className='btn effect01'><span>Pending Tasks</span></button>
                </div>
                
            </div>
        </div>
    </>
  )
};

export default Todo;
