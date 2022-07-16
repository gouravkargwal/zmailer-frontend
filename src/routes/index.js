import React from "react";
import Layout from "../Layout";
import { Route } from "react-router-dom";
import SendEmail from "../components/SendEmail/index";
import UploadContact from "../components/UploadContacts";
import Sender from "../components/Sender/sender";
import Tracking from "../components/Admin/tracking";
import Specific from "../components/Stats/Specific";
import Summary from "../components/Summary/Summary";
import Variable from "../components/Admin/variable";
import Domain from "../components/Domain/Domain";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import AccountActivation from "../components/Auth/AccountActivation";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import TestMail from "../components/SendEmail/TestMail/TestMail";
import SelectEditor from "../components/SendEmail/SelectEditor/SelectEditor";
import Contact from "../components/SendEmail/Contact";
import ConfirmSending from "../components/SendEmail/ConfirmSending";

const AllRoute = () => {
  return (
    <>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/auth/activate/:token" component={AccountActivation} />
      <Route
        exact
        path="/auth/password/reset/:token"
        component={ResetPassword}
      />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      {window.location.pathname.includes("/zmailer") && (
        <Layout>
          <PrivateRoute exact path="/zmailer/sendemail" component={SendEmail} />
          <PrivateRoute
            exact
            path="/zmailer/sendemail/selecteditor"
            component={SelectEditor}
          />
          <PrivateRoute
            exact
            path="/zmailer/sendemail/contact"
            component={Contact}
          />
          <PrivateRoute
            exact
            path="/zmailer/sendemail/confirmsending"
            component={ConfirmSending}
          />
          <PrivateRoute
            exact
            path="/zmailer/contact"
            component={UploadContact}
          />
          <PrivateRoute exact path="/zmailer/sender" component={Sender} />
          <PrivateRoute exact path="/zmailer/domain" component={Domain} />
          <PrivateRoute exact path="/zmailer/testmail" component={TestMail} />
          <PrivateRoute exact path="/zmailer/tracking" component={Tracking} />
          <PrivateRoute exact path="/zmailer/variable" component={Variable} />
          <PrivateRoute
            exact
            path="/zmailer/specificcamp"
            component={Specific}
          />
          <PrivateRoute exact path="/zmailer/dashboard" component={Summary} />
        </Layout>
      )}
    </>
  );
};

export default AllRoute;
