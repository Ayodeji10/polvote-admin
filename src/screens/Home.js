import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
// import { Chart } from 'react-chartjs-2'

const Home = () => {
    const [pageLoading, setPageLoading] = useState(true)

    // polls array 
    const [polls, setPolls] = useState([])
    const [parties, setParties] = useState([])
    const [value, setValue] = useState(0)

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
                setPageLoading(false)
                // console.log([...allData])
            })
        )

    }
    useEffect(() => {
        fetchcurrentPollAndParties()
    }, [])

    const [graph, setGraph] = useState([
        { name: "Yemi", Votes: 234453 }, { name: "Eniola", Votes: 432345 }, { name: "Femi", Votes: 345324 }
    ])

    if (pageLoading) {
        return (
            <p>loading</p>
        )
    }

    const { _id, aspirant, polltitle } = polls[value]

    const previousPoll = () => {
        if (value !== 0) {
            setValue(value - 1)
        }
    }

    const nextPoll = () => {
        if (value !== polls.length - 1) {
            setValue(value + 1)
        }
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* carousel  */}
            <div className="carousel-container">
                <h1 className="mb-4">Ongoing Polls</h1>
                <div className="carousel">
                    {polls.map((poll, index) => {
                        return (
                            <div className={`poll ${index === value && "active"}`} key={index} onClick={() => setValue(index)}>
                                <h3>{poll.polltitle}</h3>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <p>Total Poll</p>
                                        <h1>2,024,021</h1>
                                    </div>
                                    <div className="col-lg-6 d-flex flex-column justify-content-end align-items-end">
                                        <h5>Closing Date</h5>
                                        <h6>{poll.enddate.substring(0, 10)}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* active poll  */}
            <div className="active-poll mb-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="graph">
                            <div className="row mb-5">
                                <div className="col-lg-11">
                                    <h1>{polltitle}</h1>
                                    <p>1,403,909 Votes</p>
                                </div>
                                <div className="col-lg-1">
                                    <img src="images/Vector.png" alt="" onClick={previousPoll} />
                                    <img src="images/Vector2.png" alt="" onClick={nextPoll} />
                                </div>
                            </div>
                            <img src="images/Group 169.png" className="img-fluid" alt="" />
                            {/* <Line
                                height={50}
                                width={100}
                                data={{
                                    labels: graph.map((each) => each.name),
                                    datasets: [{
                                        label: '# of Votes',
                                        data: graph.map((each) => each.Votes),
                                        backgroundColor: "orange",
                                        borderColor: "#52A9FF",
                                        borderWidth: 2
                                    }]
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="leaderboard mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h1 className="mb-0">Leaderboard</h1>
                                <Link to="/polls"><p className="mb-0">Go to Poll<i className="fas fa-angle-right" /></p></Link>
                            </div>
                            <div className="board">
                                {aspirant.map((each, index) => {
                                    return (
                                        <div className="candidate d-flex justify-content-between align-items-center mb-4" key={index}>
                                            <img src={`https://polvote.com/ballot/${each.image}`} className="img-fluid" alt="profile-img" />
                                            <img src={each.image === undefined ? "images/download 1.png" : `https://polvote.com/ballot/${parties.filter(party => party.partyname === each.politparty)[0].image}`} alt="party" className="img-fluid" />
                                            <div>
                                                <h3>{each.firstname} {each.lastname}</h3>
                                                <h4 className="mb-0">{each.politparty}</h4>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <h3>25%</h3>
                                                <h5>206,302 Votes</h5>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="users">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3>Active Users</h3>
                                    <h1 className="mb-0">200,034</h1>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end align-items-end">
                                    <Link to="/users"><p className="mb-0">See All Users<i className=" fas fa-angle-right" /></p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;