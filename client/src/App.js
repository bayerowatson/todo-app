import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './components/About';
import Create from './components/Create';
import Todos from './components/Todos';


const App = () => {
    return ( 
<div>
    <Navbar />
    <div className='container-lg'>
        <Switch>
          <Route exact path="/">
            <Todos />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/todos-page">
            <Todos />
          </Route>
          <Route path="/about">
              <About />
          </Route>
        </Switch>
    </div>
    
</div>

     );
}
 
export default App;