import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link, useParams } from "react-router-dom";
import Modal from 'react-modal'
import EditPollCard from "../components/EditPollCard";
Modal.setAppElement('#root')

const EditPoll = () => {
    // params 
    const { id } = useParams()

    // modal 
    const [removeCandidateModal, setRemoveCandidateModal] = useState(false)

    // loading 
    const [loading, setLoading] = useState(true)

    // current poll 
    const [currentPoll, setCurrentPoll] = useState(null)

    // fetch current poll 
    const fetchcurrentPoll = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/polls/getsinglepoll/${id}`)
        // setContext({ ...context, currentAspirant: response.data })
        setCurrentPoll(response.data)
        setLoading(false)
    }

    useEffect(() => {
        if (id && id !== '') fetchcurrentPoll()
    }, [id])

    if (loading) {
        return <p>Loading</p>
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            <div className="single-poll edit-polls">
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
                    <div className="col-lg-9">
                        <div className="row header mb-4">
                            <div className="col-lg-9">
                                <h1 className="mb-1">{currentPoll.polltitle}</h1>
                                <h3>All Aspirants {`(${currentPoll.aspirant.length})`}</h3>
                            </div>
                            <div className="col-lg-3">
                                <Link to={`/singlePoll/${id}`}><p><i className="fas fa-angle-left" />Return to Poll</p></Link>
                            </div>
                        </div>
                        <div className="leaderboard">
                            {currentPoll.aspirant.map((aspirant) => {
                                return (
                                    <EditPollCard aspirant={aspirant} id={id} />
                                )
                            })}
                            {/* <div className="candidate mb-4">
                                <div className="row align-items-center">
                                    <div className="col-lg-2 d-flex">
                                        <img src="images/Candidate.png" className="img-fluid" alt="" />
                                        <img src="images/download 1.png" className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-lg-5">
                                        <h1 className="mb-0">Mike Jakande</h1>
                                        <p className="mb-1">Abundant Nigeria Renewal Party</p>
                                        <div className="bar-container">
                                            <div className="bar" style={{ width: '60%' }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 d-flex flex-column align-items-end justify-content-end">
                                        <h1>25%</h1>
                                        <p className="mb-0">206,302 Votes</p>
                                    </div>
                                    <div className="remove col-lg-2 d-flex flex-column align-items-center" onClick={() => setRemoveCandidateModal(true)}>
                                        <i className="fas fa-times" />
                                        <p className="mb-0">Remove</p>
                                    </div>
                                    <Modal isOpen={removeCandidateModal} onRequestClose={() => setRemoveCandidateModal(false)} id="remove-candidate">
                                        <h1 className="mb-5">Are you sure you want to remove from Poll?</h1>
                                        <div className="row mb-5">
                                            <div className="col-lg-5">
                                                <img src="images/african-american-man-with-round-eyeglasses-denim-shirt_273609-19878 1.png" className="img-fluid" alt="candidate" />
                                            </div>
                                            <div className="col-lg-7">
                                                <div>
                                                    <h3>Elliot Jonathan</h3>
                                                    <p>African Action Congress</p>
                                                </div>
                                                <div>
                                                    <h3>25%</h3>
                                                    <p>206,302 Votes</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button id="cancel-close-poll" onClick={() => setRemoveCandidateModal(false)}>Cancel</button>
                                            <button id="close-close-poll">Remove from Poll</button>
                                        </div>
                                    </Modal>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPoll;