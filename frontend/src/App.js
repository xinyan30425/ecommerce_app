import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import axios from "axios";
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";

import "./App.css";

import Header from "./component/layouts/Header1.jsx/Header";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Signup from "./component/User/SignUp";
import Login from "./component/User/Login";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgetPassword from "./component/User/ForgetPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import SearchAPI from "./component/Search/search";


const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() =>
  import("./component/Admin/ProductList")
);
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() =>
  import("./component/Admin/UpdateProduct")
);

const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() =>
  import("./component/Admin/ProductReviews")
);

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const stripeApiKey = sessionStorage.getItem("stripeApiKey");
    if (stripeApiKey) {
      setStripeApiKey(stripeApiKey);
    } else {
      getStripeApiKey();
    }

  }, []);

  useEffect(() => {
    dispatch(load_UserProfile());
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                {<Header />}
                <Home />
              </>
            )}
          />

          <Route
            exact
            path="/product/:id"
            render={() => (
              <>
                {<Header />}
                <ProductDetails />
              </>
            )}
          />

          <Route
            exact
            path="/products"
            render={() => (
              <>
                {<Header />}
                <Products />
              </>
            )}
          />

          <Route
            path="/products/:keyword"
            render={() => (
              <>
                {<Header />}
                <Products />
              </>
            )}
          />

          <Route
            exact
            path="/signup"
            render={() => (
              <>
                {<Header />}
                <Signup />
              </>
            )}
          />

          <Route
            exact
            path="/login"
            render={() => (
              <>
                {<Header />}
                <Login />
              </>
            )}
          />

          <Route
            exact
            path="/password/forgot"
            render={() => (
              <>
                {<Header />}
                <ForgetPassword />

              </>
            )}
          />

          <Route
            exact
            path="/password/reset/:token"
            render={() => (
              <>
                {<Header />}
                <ResetPassword />
              </>
            )}
          />

          <Route
            exact
            path="/cart"
            render={() => (
              <>
                {<Header />}
                <Cart />
              </>
            )}
          />

          <Route
            exact
            path="/policy/return"
            render={() => (
              <>
                {<Header />}
                <ReturnPolicyPage />
              </>
            )}
          />

          <Route
            exact
            path="/policy/Terms"
            render={() => (
              <>
                {<Header />}
                <TermsUse />
              </>
            )}
          />

          <Route
            exact
            path="/policy/privacy"
            render={() => (
              <>
                {<Header />}
              </>
            )}
          />

          <Route
            exact
            path="/contact"
            render={() => (
              <>
                {<Header />}
              </>
            )}
          />

          <Route
            exact
            path="/about_us"
            render={() => (
              <>
                {<Header />}
              </>
            )}
          />

          <Route
            exact
            path="/account"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/account" component={Profile} />
              </>
            )}
          />

          <Route
            exact
            path="/profile/update"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute
                  exact
                  path="/profile/update"
                  component={UpdateProfile}
                />
              </>
            )}
          />

          <Route exact path="/search" render={() => (
            <>
              <SearchAPI />
            </>
          )} />
          <Route exact path="/search/:search" render={() => (
            <>
              <SearchAPI />
            </>
          )} />

          <Route
            exact
            path="/password/update"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute
                  exact
                  path="/password/update"
                  component={UpdatePassword}
                />
              </>
            )}
          />

        </Switch>

        {/* Admin routes */}
        <Suspense fallback={<CricketBallLoader />}>
          <Switch>
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/dashboard"
              component={LazyDashboard}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/products"
              component={LazyProductList}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/product/:id"
              component={LazyUpdateProduct}
            />

            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/new/product"
              component={LazyNewProduct}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/users"
              component={LazyUserList}
            />           
          </Switch>
        </Suspense>     
      </Router>
    </>
  );
}

export default App;
