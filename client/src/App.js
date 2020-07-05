import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Land from './components/layouts/Land'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alert'
import './App.css'
//Redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Land} />
            <section className='container'>
              <Alert />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App
