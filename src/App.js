import React, { useState, useEffect } from 'react';
import ScrollToTop from '../src/components/scrollToTop'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataContext } from './dataContext';
import Login from './screens/Login';
import Overview from './screens/Overview'
import Polls from './screens/Polls';
import SinglePoll from './screens/SinglePoll';
import CreatePoll from './screens/CreatePoll';
import Aspirants from './screens/Aspirants';
import SingleAspirant from './screens/SingleAspirant';
import Users from './screens/Users';
import SingleUsers from './screens/SingleUser';
import Countries from './screens/Countries';
import Parties from './screens/Parties';
import LiveResults from './screens/LiveResults';
import './App.css';


function App() {
  // context 
  const [context, setContext] = useState({
    user: {}
  })

  // save context to local storage
  useEffect(() => {
    const storedData = localStorage.getItem('bb-admin-context')
    if (storedData) {
      setContext(JSON.parse(storedData))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('bb-admin-context', JSON.stringify(context))
  })

  return (
    <Router>
      <ScrollToTop />
      <DataContext.Provider value={{ context, setContext }}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/overview" element={<Overview />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/singlePoll/:id" element={<SinglePoll />} />
          <Route path="/newpole" element={<CreatePoll />} />
          <Route path="/aspirants" element={<Aspirants />} />
          <Route path="/aspirants/:id" element={<SingleAspirant />} />
          <Route path="/users" element={<Users />} />
          <Route path="/single-user/:id" element={<SingleUsers />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/liveresults" element={<LiveResults />} />
        </Routes>
      </DataContext.Provider>
    </Router>
  );
}

export default App;
