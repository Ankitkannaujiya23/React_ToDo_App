import React from 'react'

const TaskItem = (props) => {

  
  return (
    <>

      <div className="task my-4 text-center d-flex justify-content-between" key={props.text.id}>
        < div className='task-manager'>
          <> {props.text.name} </>
        </div>
        <div>
          <i className="fa fa-edit mx-2" onClick={()=>{
            {props.edit(props.text.id)}
          }}></i>
          
           <i className="fa fa-trash" onClick={()=>{
            {props.delete(props.text.id)}
          }} />
        </div>
      </div>

    </>
  )
}

export default TaskItem