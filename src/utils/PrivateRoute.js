import React from "react";
import { getToken } from "./common";
import { Redirect, Route } from "react-router-dom";

const  PrivateRoute = ({
    component:Component, ...rest}) => {
        return(
            <Route
            {...rest}
            render = {props => {
                getToken() ? <Component {...props} />
                :<Redirect to= {{ pathname:"/LoginForm", state:{from:props.location}}}/>
            }}
            />
        )
    }


export default PrivateRoute