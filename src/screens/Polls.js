import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link, useNavigate } from "react-router-dom";

const Polls = () => {
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

    const [pageLoading, setPageLoading] = useState(true)

    // polls array 
    const [polls, setPolls] = useState([])
    const [pollsList, setPollsList] = useState([])
    // fetch polls 
    const fetchPolls = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/polls`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setPolls(response.data)
        setPollsList(response.data)
        setPageLoading(false)
    }
    useEffect(() => {
        fetchPolls()
    }, [])

    const searchPolls = (e) => {
        // console.log(e.target.value)
        const filteredPolls = polls.filter(poll => `${poll.polltitle}`.toLowerCase().includes(e.target.value.toLowerCase()) && poll.status === "0")
        // console.log(people)
        setPollsList(filteredPolls)
    }

    if (pageLoading) {
        return (
            <p>loading</p>
        )
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* polls  */}
            <div className="polls-page">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="categories mb-4">
                            <h1 className="mb-3">Sort By Category</h1>
                            <div className="category mb-2">
                                <input type="checkbox" id="All" />
                                <label htmlFor="All">All</label>
                            </div>
                            <div className="category mb-2">
                                <input type="checkbox" id="Presidential" />
                                <label htmlFor="Presidential">Presidential</label>
                            </div>
                            <div className="category mb-2">
                                <input type="checkbox" id="Gubernatorial" />
                                <label htmlFor="Gubernatorial">Gubernatorial</label>
                            </div>
                            <div className="category mb-2">
                                <input type="checkbox" id="Senatorial" />
                                <label htmlFor="Senatorial">Senatorial</label>
                            </div>
                            <div className="category">
                                <input type="checkbox" id="reps" />
                                <label htmlFor="reps">House of Representative</label>
                            </div>
                        </div>
                        <div className="categories mb-4">
                            <h1 className="mb-3">Sort By Time</h1>
                            <div className="category mb-2">
                                <input type="checkbox" id="All2" />
                                <label htmlFor="All2">All</label>
                            </div>
                            <div className="category mb-2">
                                <input type="checkbox" id="recent" />
                                <label htmlFor="recent">Recently Added</label>
                            </div>
                            <div className="category mb-2">
                                <input type="checkbox" id="ongoing" />
                                <label htmlFor="ongoing">Ongoing Poll</label>
                            </div>
                            <div className="category">
                                <input type="checkbox" id="concluded" />
                                <label htmlFor="concluded">Concluded Poll</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="row header mb-4">
                            <div className="col-lg-9">
                                <div className="searchbar d-flex justify-content-between align-items-center">
                                    <input type="text" placeholder="Search for Poll" onChange={(e) => searchPolls(e)} />
                                    <img src="images/search.png" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <Link to="/newpole"><button><img src="images/button 1.png" alt="" />Add New Poll</button></Link>
                            </div>
                        </div>
                        <div className="polls-container">
                            {pollsList.map((poll, index) => {
                                return (
                                    <div className="poll mb-3" key={index}>
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <h1>{poll.polltitle}</h1>
                                                <p className="mb-0">{poll.pollcategory}</p>
                                            </div>
                                            <div className="col-lg-2 d-flex flex-column align-items-end">
                                                <h3>Open Date</h3>
                                                <p className="mb-0">{poll.startdate.substring(0, 10)}</p>
                                            </div>
                                            <div className="col-lg-2 d-flex flex-column align-items-end">
                                                <h3>End Date</h3>
                                                <p className="mb-0">{poll.enddate.substring(0, 10)}</p>
                                            </div>
                                            <div className="col-lg-2 d-flex flex-column align-items-end">
                                                <Link to={`/singlePoll/${poll._id}`}><p className="open mb-0">Open<i className="fas fa-angle-right" /></p></Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }).reverse()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Polls;