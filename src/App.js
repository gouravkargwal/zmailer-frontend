import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AllRoute from "./routes";
import { SendEmailProvider } from "./Context/SendEmailContext";

function App() {
  return (
    <SendEmailProvider>
      <Router>
        <Switch>
          <Route component={AllRoute} />
        </Switch>
      </Router>
    </SendEmailProvider>
  );
}

export default App;
