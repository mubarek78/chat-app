import React from 'react'

const Navbar = () => {
  

  return (
    <div className='navbar'>
      <span className="logo">Muba Chat</span>
      <div className="user">
        <img src='../images/addAvatar.png' alt="" />
        <span>{"Mubarek"}</span>
        <button >logout</button>
      </div>
    </div>
  )
}

export default Navbar