import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth-context";

// Containers
import Layout from "./containers/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Signup from "./containers/SignUp/SignUp";
import Posts from "./containers/Posts/Posts";
import Menu from "./containers/Menu/Menu";
import UserProfile from "./containers/UserProfile/UserProfile";
import UpdateProfile from "./containers/UpdateProfile/UpdateProfile";
import CommentPost from "./containers/CommentPost/CommentPost";
import NewPost from "./containers/NewPost/NewPost";

// Styles
import "./App.css";

const App = () => {
    const { userId, token, account, login, logout } = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/groupomania.app/posts" exact component={Posts} />
                <Route path="/groupomania.app/posts/new" exact component={NewPost} />
                <Route path="/groupomania.app/menu" exact component={Menu} />
                <Route path="/groupomania.app/profile/:id" exact component={UserProfile} />
                <Route path="/groupomania.app/profile/:id/update" exact component={UpdateProfile} />
                <Route path="/groupomania.app/posts/:id" exact component={CommentPost} />
                <Redirect to="/groupomania.app/posts" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/groupomania.app/" exact component={Home} />
                <Route path="/groupomania.app/login" exact component={Login} />
                <Route path="/groupomania.app/signup" exact component={Signup} />
                <Redirect to="/groupomania.app/" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                account: account,
                login: login,
                logout: logout,
            }}
        >
            <Layout>{routes}</Layout>
        </AuthContext.Provider>
    );
};

export default App;
