import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const LogIn = lazy(() => import("./components/LogIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const CustomerDashboard = lazy(() => import("./components/CustomerDashboard"));
const PlaceOrder = lazy(() => import("./components/PlaceOrder"));
const MakeReservation = lazy(() => import("./components/MakeReservation"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ViewOrders = lazy(() => import("./components/ViewOrders"));
const ViewReservations = lazy(() => import("./components/ViewReservations"));


ReactDOM.render(
  <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/LogIn" render={() => <LogIn/>}/>
                <Route exact path="/SignUp" render={() => <SignUp/>}/>
                <Route exact path="/CustomerDashboard" render={() => <CustomerDashboard/>}/>
                <Route exact path="/PlaceOrder" render={() => <PlaceOrder/>}/>
                <Route exact path="/MakeReservation" render={() => <MakeReservation/>}/>
                <Route exact path="/AdminDashboard" render={() => <AdminDashboard/>}/>
                <Route exact path="/ViewOrders" render={() => <ViewOrders/>}/>
                <Route exact path="/ViewReservations" render={() => <ViewReservations/>}/>
            </Switch>
        </Suspense>
    </Router>
    , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
