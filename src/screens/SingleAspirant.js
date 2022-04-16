import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import { useParams, Link } from "react-router-dom";
import { API } from "../components/apiRoot";
import axios from "axios";
import Modal from 'react-modal'
Modal.setAppElement('#root')

function SingleAspirant() {
    // params 
    const { id } = useParams()

    // fetch all aspirants 
    const [aspirants, setAspirants] = useState([])
    const fetchAspirants = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/aspirant`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setAspirants(response.data)
    }
    useEffect(() => {
        fetchAspirants()
    }, [])

    // fetch current aspirant
    const [loading, setLoading] = useState(true)
    const [aspirant, setAspirant] = useState({})
    const fetchSingleAspirant = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/aspirant/getoneaspirant/${id}`)
        setAspirant(response.data)
        setLoading(false)
    }
    useEffect(() => {
        if (id && id !== '') fetchSingleAspirant()
    }, [id])

    // error 
    const [error, setError] = useState("")

    // accept aspirant 
    const [acceptLoading, setAcceptLoading] = useState(false)
    const acceptAspirant = () => {
        setAcceptLoading(true)
        setError("")
        axios({
            url: `${API.API_ROOT}/aspirant/aspirantstatus/${id}`,
            method: "patch",
            headers: { "Content-Type": "application/json" },
            data: { status: 1, reason: null }
        }).then((response) => {
            setAcceptLoading(false)
            // console.log(response)
            window.location.reload();
            // navigate(`/user-profile`)
        }, (error) => {
            setAcceptLoading(false)
            setError('Something went wrong, please try again')
            console.log(error)
        })
    }

    // reject aspirant 
    const [rejectLoading, setRejectLoading] = useState(false)
    const [reason, setReason] = useState("")
    const rejectAspirant = () => {
        setRejectLoading(true)
        setError("")
        axios({
            url: `${API.API_ROOT}/aspirant/aspirantstatus/${id}`,
            method: "patch",
            headers: { "Content-Type": "application/json" },
            data: { status: 2, reason: reason }
        }).then((response) => {
            setRejectLoading(false)
            // console.log(response)
            window.location.reload();
        }, (error) => {
            setRejectLoading(false)
            setError('Something went wrong, please try again')
            console.log(error)
        })
    }

    // modals 
    const [acceptModal, setAcceptModal] = useState(false)
    const [rejectModal, setRejectModal] = useState(false)
    const [reasonModal, setReasonModal] = useState(false)

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* aspirants  */}
            <div className="aspirants">
                <div className="row header mt-4 mb-5">
                    <div className="col-lg-3">
                        <h1>Aspirant Profiles</h1>
                        <p className="mb-0">1080 Aspirant Profiles</p>
                    </div>
                    <div className="col-lg-9 d-flex align-items-center justify-content-end">
                        <div className="searchbar d-flex justify-content-between align-items-center">
                            <input type="text" placeholder="Search for Aspirant Profile" />
                            <img src="/images/search.png" alt="search" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="sort mb-5">
                            <button>All Aspirants</button>
                            <button>Declined Profiles</button>
                            <button>Pending Requests</button>
                            <button>Approved Profiles</button>
                        </div>
                        <div className="all">
                            {aspirants.map((aspirant) => {
                                return (
                                    <Link to={`/aspirants/${aspirant._id}`}>
                                        <div className={`person d-flex justify-content-between align-items-center ${aspirant._id === id && "active"} ${aspirant.status == 0 && 'pending'} ${aspirant.status == 1 && 'approved'} ${aspirant.status == 2 && 'rejected'}`}>
                                            <div className="d-flex align-items-center">
                                                <div className="img-container">
                                                    <img src={aspirant.image === undefined ? "/images/user (1) 1.png" : `https://polvote.com/ballot/${aspirant.image}`} alt="profile-img" />
                                                    {/* <img src="images/politician.png" alt="profile-img" /> */}
                                                </div>
                                                <p className="mb-0">{aspirant.firstname} {aspirant.lastname}</p>
                                            </div>
                                            <i className="fa-solid fa-circle" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-lg-9 view">
                        {loading ? "loading..." :
                            <>
                                <div className="row mb-4">
                                    <div className="col-lg-4">
                                        <img src={aspirant.image === undefined ? "/images/user (1) 1.png" : `https://polvote.com/ballot/${aspirant.image}`} id="profile-img" alt="profile-img" className="img-fluid" />
                                    </div>
                                    <div className="col-lg-8">
                                        <iframe width="100%" height={280} src={aspirant.videourl.includes("watch") ? `https://www.youtube.com/embed/${aspirant.videourl.substring(32, 43)}` : `https://www.youtube.com/embed/${aspirant.videourl.substring(17, 28)}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                    </div>
                                </div>
                                <div className="row header mb-4">
                                    <div className="col-lg-7">
                                        <h1>{aspirant.firstname} {aspirant.lastname}</h1>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <p>Participating Poll</p>
                                                <h2>Presidential Election</h2>
                                            </div>
                                            <div className="col-lg-6">
                                                <p>Participating Poll</p>
                                                <h2>Presidential Election<img src="images/arrow-up-right.png" alt="" /></h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 d-flex justify-content-end align-items-start">
                                        <button className="decline" onClick={() => setRejectModal(true)}>{rejectLoading ? "loading..." : "Decline"}</button>
                                        <button className="accept" onClick={() => setAcceptModal(true)}>Accept</button>
                                        {error}
                                    </div>

                                    {/* accept modal  */}
                                    <Modal isOpen={acceptModal} onRequestClose={() => setAcceptModal(false)} id="acceptModal">
                                        <i className="fa-solid fa-circle-xmark" onClick={() => setAcceptModal(false)} />
                                        <h1>Proceed to Accept Aspirant Profile</h1>
                                        <p>Once you accept this profile, it will be visible to users to read and add to poll</p>
                                        <div className='d-flex justify-content-between'>
                                            <button className='decline' onClick={() => setAcceptModal(false)}>Cancel</button>
                                            <button className='accept' onClick={acceptAspirant}>{acceptLoading ? "loading..." : "Accept Profile"}</button>
                                        </div>
                                    </Modal>

                                    {/* reject modal  */}
                                    <Modal isOpen={rejectModal} onRequestClose={() => setRejectModal(false)} id="acceptModal">
                                        <i className="fa-solid fa-circle-xmark" onClick={() => setRejectModal(false)} />
                                        <h1>Are you sure you want to Decline this Profile</h1>
                                        <p>Once you decline this profile, it will not be visible to users to read and add to poll</p>
                                        <div className='d-flex justify-content-between'>
                                            <button className='decline' onClick={() => setRejectModal(false)}>Cancel</button>
                                            <button className='accept' onClick={() => {
                                                setRejectModal(false)
                                                setReasonModal(true)
                                            }}>Proceed</button>
                                        </div>
                                    </Modal>

                                    {/* reason modal  */}
                                    <Modal isOpen={reasonModal} onRequestClose={() => setReasonModal(false)} id="reasonModal">
                                        <i className="fa-solid fa-circle-xmark" onClick={() => setReasonModal(false)} />
                                        <h1>Why Was this Profile Declined?</h1>
                                        <p>The author of this profile will be notified with your stated reasons</p>
                                        <textarea name="" id="" cols="30" rows="10" placeholder='Type Here' value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                                        <div className='d-flex justify-content-end'>
                                            <button onClick={rejectAspirant}>Proceed</button>
                                        </div>
                                    </Modal>

                                </div>
                                <div className="details">
                                    <h3>Overview</h3>
                                    <p>{aspirant.overview}</p>
                                    <h3>Education</h3>
                                    <p>{aspirant.education}</p>
                                    <h3>Politics</h3>
                                    <p>{aspirant.politics}</p>
                                    <h3>Business Interest</h3>
                                    <p>{aspirant.binterest}</p>
                                    <h3>Activism</h3>
                                    <p>{aspirant.activism}</p>
                                </div>
                                <div className="history">
                                    <h4>Participating Poll History</h4>
                                    {aspirant.polls.map((poll) => {
                                        return (
                                            <div className="row align-items-center mb-3">
                                                <div className="col-lg-3">
                                                    <h5>{poll.pollYear}</h5>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6>{poll.pollTitle}</h6>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6>{poll.numberOfVotes} Votes</h6>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h6>{poll.position} Position</h6>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleAspirant 