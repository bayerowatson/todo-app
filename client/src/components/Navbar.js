import React from 'react';


const Navbar = () => {
    return ( 
<div>
<ul className="nav nav-fill navbar-dark bg-dark display-6 mb-5 p-2">
  <li className="nav-item">
    <a className="nav-link active text-light" aria-current="page" href="/todos-page">odos</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-light" href="/about">About</a>
  </li>
</ul>
</div>

     );
}
 
export default Navbar;