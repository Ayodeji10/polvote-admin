import React, { useState, useEffect } from 'react';
import ScrollToTop from '../src/components/scrollToTop'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataContext } from './dataContext';
import Home from './screens/Home';
import Polls from './screens/Polls';
import SinglePoll from './screens/SinglePoll';
import EditPoll from './screens/EditPoll';
import CreatePoll from './screens/CreatePoll';
import CreatePoll2 from './screens/CreatePoll2';
import Aspirants from './screens/Aspirants';
import SingleAspirant from './screens/SingleAspirant';
import Users from './screens/Users';
import SingleUsers from './screens/SingleUser';
import Countries from './screens/Countries';
import Parties from './screens/Parties';
import './App.css';


function App() {
  // context 
  const [context, setContext] = useState({

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
          <Route exact path="/" element={<Home />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/singlePoll/:id" element={<SinglePoll />} />
          <Route path="/singlePoll/:id/edit" element={<EditPoll />} />
          <Route path="/newpole" element={<CreatePoll />} />
          <Route path="/add-aspirants" element={<CreatePoll2 />} />
          <Route path="/aspirants" element={<Aspirants />} />
          <Route path="/aspirants/:id" element={<SingleAspirant />} />
          <Route path="/users" element={<Users />} />
          <Route path="/single-user/:id" element={<SingleUsers />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/parties" element={<Parties />} />
        </Routes>
      </DataContext.Provider>
    </Router>
  );
}

export default App;
