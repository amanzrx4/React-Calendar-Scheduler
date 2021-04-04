import react , { useEffect } from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch , useSelector } from "react-redux";
import { isUserLoggedIn } from './actions/auth.actions';
import Calendar from './containers/Calendar';
// import Orders from './containers/Orders';
import Category from './containers/Category';


import './App.css';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  } ,[]);

  return (
    <div className="App">
      {/* <Router> */}
        <Switch>
          <PrivateRoute path='/' exact component={Home} />
          <PrivateRoute path='/category' component={Category} />
          <PrivateRoute path='/calendar' component={Calendar} />
          {/* <PrivateRoute path='/products' component={Products} />
          <PrivateRoute path='/orders' component={Orders} /> */}

          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
        </Switch>
      {/* </Router>     */}
    </div>
  );
}

export default App;
