import React from 'react';


const Navbar = () => {
    return ( 
<div>
  <nav className="navbar navbar-dark bg-dark px-3">
      <div className="container-fluid">
          <a className="navbar-brand display-5" href="/todos-page">Todos</a>
          <button className="btn btn-outline-light fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#options">
          <span>Options </span>
          <i class="bi bi-list"></i>
      </button>
      </div>
  </nav>
</div>

     );
}
 
export default Navbar;