import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal'
Modal.setAppElement('#root')

const SinglePoll = () => {
    // params 
    const { id } = useParams()

    // navigate
    const navigate = useNavigate()

    // modal
    const [closePollModal, setClosePollModal] = useState(false)
    const [editPollModal, setEdditPollMOdal] = useState(false)

    // loading 
    const [loading, setLoading] = useState(true)

    // current poll 
    const [currentPoll, setCurrentPoll] = useState(null)

    // fetch current poll 
    const fetchcurrentPoll = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/polls/getsinglepoll/${id}`)
        setCurrentPoll(response.data)
        setLoading(false)
    }

    // close poll 
    const handleClosePoll = () => {
        // const response = await axios
        //     .patch(`${API.API_ROOT}/polls/closepoll/${id}`)
        // console.log(response)
        // if (response.status === 200) {
        //     navigate('/polls')
        // }



        axios({
            url: `${API.API_ROOT}/polls/closepoll/${id}`,
            method: "patch",
            // headers: { "Content-Type": "application/json" },
            // data: { polltitle: title, startdate: startDate, enddate: endDate }
        }).then((response) => {
            console.log(response)
            // window.location.reload()
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (id && id !== '') fetchcurrentPoll()
    }, [id])

    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const openEditModal = () => {
        setTitle(currentPoll.polltitle)
        setEdditPollMOdal(true)
    }

    // edit poll 
    const [updateLoading, setUpdateLoading] = useState(false)
    const [error, setError] = useState("")
    const editPoll = () => {
        console.log(title, startDate, endDate)
        setUpdateLoading(true)
        axios({
            url: `${API.API_ROOT}/polls/editpoll/${id}`,
            method: "patch",
            headers: { "Content-Type": "application/json" },
            data: { polltitle: title, startdate: startDate, enddate: endDate }
        }).then((response) => {
            setUpdateLoading(false)
            // console.log(response)
            window.location.reload()
        }, (error) => {
            setUpdateLoading(false)
            setError('Something went wrong, please try again')
            // console.log(error)
        })
    }

    if (loading) {
        return <p>Loading</p>
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* single-polls  */}
            <div className="single-poll">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="searchbar d-flex align-items-center justify-content-between mb-5">
                            <input type="text" placeholder="Search for Poll" />
                            <img src="images/search.png" alt="" />
                        </div>
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
                    <div className="col-lg-1" />
                    <div className="col-lg-8">
                        <div className="row header align-items-center mb-4">
                            <div className="col-lg-6">
                                <h1 className="mb-0">{currentPoll.polltitle}</h1>
                            </div>
                            <div className="col-lg-3">
                                {/* <Link to={`/singlePoll/${id}/edit`}> */}
                                <button id="edit" onClick={openEditModal}>Edit Poll<i className="fas fa-angle-down" /></button>
                                {/* </Link> */}
                                <Modal isOpen={editPollModal} onRequestClose={() => setEdditPollMOdal(false)} id="edit-poll">
                                    <i className="fa-solid fa-circle-xmark" onClick={() => setEdditPollMOdal(false)} />
                                    <h1>Edit Poll</h1>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <label htmlFor="title">Change Poll Title</label>
                                            <div className="input">
                                                <input type="text" id="title" placeholder="Ekiti State Gubernatorial Poll" value={title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="">Change Start Date</label>
                                            <div className="input d-flex justify-content-between align-items-center">
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={date => setStartDate(date)}
                                                    dateFormat='yyyy/MM/dd'
                                                    // minDate={context.newPoleForm.startDate}
                                                    minDate={new Date()}
                                                    // maxDate={new Date()}
                                                    // isClearable
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    placeholderText={currentPoll.startdate.substring(0, 10)}
                                                />
                                                <i class="fa-solid fa-calendar-days"></i>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="">Change End Date</label>
                                            <div className="input d-flex justify-content-between align-items-center">
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={date => setEndDate(date)}
                                                    dateFormat='yyyy/MM/dd'
                                                    // minDate={context.newPoleForm.startDate}
                                                    minDate={new Date()}
                                                    // maxDate={new Date()}
                                                    // isClearable
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    placeholderText={currentPoll.startdate.substring(0, 10)}
                                                />
                                                <i class="fa-solid fa-calendar-days"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{error}</p>
                                    <button onClick={editPoll}>{updateLoading ? "loading..." : "Update Changes"}</button>
                                </Modal>
                            </div>
                            <div className="col-lg-3"><button id="close" onClick={() => setClosePollModal(true)}>Close Poll</button></div>
                            <Modal isOpen={closePollModal} onRequestClose={() => setClosePollModal(false)} id="close-poll">
                                <h1 className="mb-5">Are you sure you want to close poll?</h1>
                                <div className="d-flex justify-content-between">
                                    <button id="cancel-close-poll" onClick={() => setClosePollModal(false)}>Cancel</button>
                                    <button id="close-close-poll" onClick={handleClosePoll}>Close Poll</button>
                                </div>
                            </Modal>
                        </div>
                        <div className="graph mb-5">
                            <div className="row">
                                <div className="col-lg-11">
                                    <h1>2022 Ekiti State Gubernatorial Election</h1>
                                    <p className="mb-0">1,403,909 Votes</p>
                                </div>
                                <div className="col-lg-1">
                                    <img src={require("../images/Vector.png").default} className="img-fluid mt-5" alt="" />
                                    <img src={require("../images/Vector2.png").default} className="img-fluid mt-5" alt="" />
                                    <div className="bar-container">
                                        <div className="bar" style={{ width: '60%' }} />
                                    </div>
                                </div>
                            </div>
                            <img src={require("../images/Group 169.png").default} className="img-fluid mt-5" alt="" />
                        </div>
                        <div className="leaderboard">
                            <h1>LeaderBoard</h1>
                            {currentPoll.aspirant.map((aspirant) => {
                                return (
                                    <div className="candidate mb-3">
                                        <div className="row align-items-center">
                                            <div className="col-lg-3 d-flex">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <img src={`https://drive.google.com/thumbnail?id=${aspirant.image}`} className="img-fluid" alt="profile-img" />
                                                    </div>
                                                    <div className="col-6">
                                                        <img src={require("../images/download 1.png").default} className="img-fluid" alt="party" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <h1 className="mb-0">{aspirant.firstname} {aspirant.lastname}</h1>
                                                <p>{aspirant.politparty}</p>
                                                <div className="bar-container">
                                                    <div className="bar" style={{ width: '60%' }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 d-flex flex-column align-items-end">
                                                <h1>25%</h1>
                                                <p>206,302 Votes</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePoll;