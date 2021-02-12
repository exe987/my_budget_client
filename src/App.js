import React from 'react';
import User from './context/users/userState'
import Layout from './components/Layout'
function App() {
  return (
    <User>
       <Layout/>
    </User>
   
  );
}

export default App;