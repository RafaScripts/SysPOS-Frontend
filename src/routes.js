

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/login";
import Active from "./pages/active";
import Home from "./pages/home";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={Login}/>
                <Route path={'/home'} component={Home} />
                <Route path={'/active'} component={Active} />
            </Switch>
        </BrowserRouter>
    )
}