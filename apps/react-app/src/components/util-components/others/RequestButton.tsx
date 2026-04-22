import React from 'react'

interface ButtonPropsType {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  text: string;
  variant?: string
}

function RequestButton(props:ButtonPropsType) {
  return (
    <button 
        className={`w-full 
          ${
            props.variant == "dark"? "bg-black text-white hover:bg-gray-800"
            : (props.variant =="light")? "bg-blue-800 text-white hover:bg-blue-950" 
            :"bg-black text-white hover:bg-gray-800"}
            p-3 rounded-lg  transition font-bold  border-none`
          } 
        onClick={props.onClick} 
        type={props.type}
    >
      {props.text}
    </button>
  )
}

export default RequestButton