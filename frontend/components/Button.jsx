import React from 'react'

const Button = ({text, type="primary"}) => {
  return (
    <button className={`
      cursor-pointer
      ${type==='primary'?(
        'primary-card text-white!'
      ):
      type==="danger"?'text-red-500 bg-red-100 border-2 border-red-500':
      "text-primary-green border-2 border-primary-green"
    }
      p-3 px-6 font-semibold rounded-full h-fit`}>{text}</button>
  )
}

export default Button