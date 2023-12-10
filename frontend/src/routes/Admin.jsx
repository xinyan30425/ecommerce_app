import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  
} from "react-router-dom";
import Dashboard from "../component/Admin/Dashboard";
import ProductList from "../component/Admin/ProductList";
import UserList from "../component/Admin/UserList";
import UpdateProduct from "../component/Admin/UpdateProduct";
import NewProduct from "../component/Admin/NewProduct";
import PrivateRoute from "../component/Route/PrivateRoute";

const Admin = () => {
     
    return (
      
        <Router>
            <Switch>
             <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/new/product"
            component={NewProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UserList}
          />
            </Switch>
        </Router>
    
    );
    }
export default Admin;