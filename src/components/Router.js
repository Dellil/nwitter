import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

function AppRouter({isLoggedIn}) {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? 
                (
                <>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </>
                )
                : 
                (
                <>
                    <Route exact path="/">
                        <Auth />
                    </Route>
                </>
                )
                }
            </Switch>
        </Router>
    );
}

export default AppRouter;