import React from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'

import store from './redux/store'

import Register from './containers/registerX/index'
// import Register from './containers/register/register'

// import Login from './containers/login/login'
import Login from './containers/loginX/index'
import Main from './containers/main/main'

// import './test/socketioTest'

ReactDOM.render(<div>
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>
</div>, document.getElementById('root'))