import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { HomePage } from "./components/HomePage/HomePage";
import { authenticate } from "./store/session";
import TestingImages from "./components/TestingReduxState/imageTESTING";
import CreateImageForm from "./components/Images/createImage";
import TestingLikesFunctions from "./components/TestingReduxState/LikesTESTING";
import CommentsTestingFunction from "./components/TestingReduxState/CommentsTESTING";
import GetAllImages from "./components/ExplorePage/explore";

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
        <Route path="/explore" exact={true}>
          <GetAllImages />
          </Route>
        <Route exact path='/images/:id'>
          <ImageDetails />
        </Route>
        {/* The following routes are for testing only */}
        <Route path="/:imageId/images" exact={true}>
          <TestingImages />
        </Route>
        <Route path="/:imageId/likes" exact={true}>
          <TestingLikesFunctions />
        </Route>
        <Route path="/:imageId/comments" exact={true}>
          <CommentsTestingFunction />
        </Route>
        {/* End of testing section */}
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
