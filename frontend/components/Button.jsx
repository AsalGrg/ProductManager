import React from 'react'

const Button = ({ text, type = "primary" }) => {
    return (
        <button className={`
            cursor-pointer p-3 px-6 font-semibold rounded-full h-fit
            transition-all duration-200
            ${type === 'primary'
                ? 'primary-card text-white hover:opacity-90'
                : type === 'danger'
                    ? 'text-red-500 bg-red-100 border-2 border-red-500 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                    : 'text-primary-green border-2 border-primary-green dark:text-green-400 dark:border-green-700 dark:hover:bg-[#2a2a2a]'
            }
        `}>
            {text}
        </button>
    )
}

export default Button