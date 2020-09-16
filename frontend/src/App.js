import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SignOut from './pages/SignOut'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import configUser from './pages/configUser'
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  render(){



    if (this.props.token){
    
    
      var routes =
      (
        <Switch>
          <Route exact path = "/" component={Home}/>
          <Route path = "/buy" component = {Buy}/>
          <Route path = "/sell" component = {Sell}/>
          <Route path ="/sign-out" component={SignOut} />
          <Route path = "/modifyUser" component={configUser}/>
          <Redirect to ="/"/>
        </Switch>
      ) 
      }
      else if(localStorage.getItem('token')){
        this.props.forcedLogin(localStorage.getItem('token'))
        var routes = 
        (
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route path = "/buy" component = {Buy}/>
            <Route path = "/sell" component = {Sell}/>
            <Route path = "/modifyUser" component={configUser}/>
            <Redirect to ="/"/>
          </Switch>
        ) 
      }else{
        var routes = 
        (
          <Switch>
            
            <Route path = "/sign-in" component={SignIn}/>
            <Route path = "/sign-up" component={SignUp}/>
            <Redirect to="/sign-in" component={SignIn}/>
    
          </Switch>
        )
      }



    return (

      <BrowserRouter>
        {routes}
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps ={
  forcedLogin: userActions.forcedLogin
}
const mapStateToProps = (state) =>{
    return{
      token: state.userRed.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
