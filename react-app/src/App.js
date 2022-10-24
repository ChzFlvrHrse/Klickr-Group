import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/ProfilePage/UsersList";
import User from "./components//ProfilePage/User";
import { HomePage } from "./components/HomePage/HomePage";
import { authenticate } from "./store/session";
import CreateImageForm from "./components/Images/createImage";
import GetAllImages from "./components/ExplorePage/explore";
import { PageNotFound } from "./components/UnknownPage/PageNotFound";
import { AboutDevs } from "./components/AboutDevsPage/devs";
import AlbumDetails from "./components/Albums/AlbumDetails";


import ImageDetails from './components/ImageDetailsPage/imageDetails'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/devs" exact={true}>
          <AboutDevs />
        </Route>
        <Route path="/explore" exact={true}>
          <GetAllImages />
        </Route>
        <Route exact path='/images/:id'>
          <ImageDetails />
        </Route>
        <Route exact path='/albums/:id'>
          <AlbumDetails />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/upload" exact={true}>
          <CreateImageForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
