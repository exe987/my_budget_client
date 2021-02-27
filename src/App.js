import React from "react";
import User from "./context/users/userState";
import Transaction from "./context/transactions/transactionsState";
import Alert from "./context/alerts/alertState";
import Layout from "./components/Layout";
function App() {
  return (
    <User>
      <Transaction>
        <Alert>
          <Layout />
        </Alert>
      </Transaction>
    </User>
  );
}

export default App;
