import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import ChatRoom from './pages/ChatRoom';
import Error from './pages/Error';
import { ContextProvider } from './SocketContext';
// If we get context file error its something to do with the wrapper

const App = () => {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>

          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path ='/Authentication'>
            <Authentication />
          </Route>

          <Route exact path ='/404'>
            <Error />
          </Route>

          <Route exact path ='/ChatRoom'>
            <ContextProvider>
              <ChatRoom />
            </ContextProvider>
          </Route>

          <Route>
            <Error />
          </Route>

          </Switch>
        </div>
      </BrowserRouter>
    )
}

export default App
