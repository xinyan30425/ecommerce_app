import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";

import "./App.css";

import Header from "./component/layouts/Header1.jsx/Header";
import Payment from "./component/Cart/Payment";
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
import Shipping from "./component/Cart/Shipping";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";


const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() =>
  import("./component/Admin/ProductList")
);
const LazyOrderList = React.lazy(() => import("./component/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() =>
  import("./component/Admin/UpdateProduct")
);
const LazyProcessOrder = React.lazy(() =>
  import("./component/Admin/ProcessOrder")
);
const LazyUpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() =>
  import("./component/Admin/ProductReviews")
);

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const dispatch = useDispatch();

  // get STRIPE_API_KEY for payment from backend for connection to stripe payment gateway
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      if (
        data.stripeApiKey !== undefined &&
        data.stripeApiKey !== null &&
        data.stripeApiKey !== ""
      ) {
        sessionStorage.setItem(
          "stripeApiKey",
          JSON.stringify(data.stripeApiKey)
        );
      }
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error fetching Stripe API key:", error);
    }
  }

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
            path="/terms/conditions"
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

          <Route
            exact
            path="/orders"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/orders" component={MyOrder} />
              </>
            )}
          />

          <Route
            exact
            path="/shipping"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/shipping" component={Shipping} />
              </>
            )}
          />

          <Route
            exact
            path="/order/confirm"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute
                  exact
                  path="/order/confirm"
                  component={ConfirmOrder}
                />
              </>
            )}
          />

          <Route
            exact
            path="/success"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/success" component={OrderSuccess} />
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
              path="/admin/reviews"
              component={LazyProductReviews}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/orders"
              component={LazyOrderList}
            />
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/order/:id"
              component={LazyProcessOrder}
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
            <PrivateRoute
              isAdmin={true}
              exact
              path="/admin/user/:id"
              component={LazyUpdateUser}
            />
          </Switch>
        </Suspense>

        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment">
            {<Header />}
            <PrivateRoute exact path="/process/payment" component={Payment} />
          </Route>
        </Elements>
      </Router>
    </>
  );
}

export default App;
