import React from 'react'

function LiveSearch({ onSearchChange, value }) {
    return (
        <div>
            <input 
                value={value}
                onChange={(e)=>{
                    onSearchChange(e.target.value);
                }}
                type="text" 
                className='h-8 focus:outline-none indent-4 border placeholder:text-InactivePrimary border-PrimaryColors bg-[transparent]'
                placeholder='Search...' 
            />
        </div>
    )
}

export default LiveSearch