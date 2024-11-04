import React from 'react'
import placeholderAvatar from '../assets/avatar.png'
const AgentCard = (props) => {
    return (
        <div className=' bg-gray-100 m-4 h-max rounded-xl'>
            <img className="w-2/3 h-2/3 m-auto" src={placeholderAvatar} alt={name} />
            <h2 className="p-2 font-bold text-2xl">Agent Name : {props.name}</h2>
            <p className="p-2">Email : {props.email}</p>
            <p className='p-2'>Property Count : {props.allproperties.length}</p>
        </div>
    )
}

export default AgentCard