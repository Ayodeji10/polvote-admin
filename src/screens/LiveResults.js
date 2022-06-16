import React, { useState, useEffect, useContext } from 'react'
import LivePollCard from '../components/livePollCard'
import { DataContext } from "../dataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../components/apiRoot";

function LiveResults() {
    // context 
    const { context, setContext } = useContext(DataContext)

    // history 
    const navigate = useNavigate()

    // redirect if user is not logged in 
    useEffect(() => {
        if (localStorage.getItem('admin_token') === null) {
            if (localStorage.getItem('pollofficer_token') === null) {
                navigate('/')
            } else {
                navigate('/liveresults')
            }
        }
    }, [])

    // polls array 
    const [polls, setPolls] = useState([])
    const [parties, setParties] = useState([])

    // fetch current poll and parties
    const fetchcurrentPollAndParties = () => {
        const pollAPI = `${API.API_ROOT}/polls`
        const partiesAPI = `${API.API_ROOT}/parties/parties`

        const getPoll = axios.get(pollAPI)
        const getParties = axios.get(partiesAPI)

        axios.all([getPoll, getParties]).then(
            axios.spread((...allData) => {
                setPolls(allData[0].data)
                setParties(allData[1].data)
            })
        )

    }
    useEffect(() => {
        fetchcurrentPollAndParties()
    }, [])

    return (
        <div className="container mt-4 live">
            <div className="d-flex align-items-center" style={{ marginBottom: "92px" }}>
                <img src="images/Logo.png" alt="logo" id='logo' />
                <div className="searchbar d-flex align-items-center">
                    <input type="text" placeholder='Search for Poll' />
                    <i className="fa-solid fa-magnifying-glass" />
                </div>
            </div>
            {polls.map((poll, index) => {
                return <LivePollCard poll={poll} key={index} parties={parties} />
            })}
            <button id='logout' onClick={() => {
                setContext({ ...context, user: {} });
                localStorage.removeItem('pollofficer_token')
                navigate("/")
            }}>log out</button>
        </div>
    )
}

export default LiveResults