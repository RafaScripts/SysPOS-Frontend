

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/login";
import Active from "./pages/active";
import Home from "./pages/home";
import Orc from "./pages/Orc";
import DetailOrc from "./pages/detailOrc";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={Login}/>
                <Route path={'/home'} component={Home} />
                <Route path={'/orcamentos'} component={Orc} />
                <Route path={'/orcamento/detail'} component={DetailOrc} />
                <Route path={'/active'} component={Active} />
            </Switch>
        </BrowserRouter>
    )
}