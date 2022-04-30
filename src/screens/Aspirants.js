import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link } from "react-router-dom";
import Modal from 'react-modal'
Modal.setAppElement('#root')

const Aspirants = () => {
    // aspirants array 
    const [aspirants, setAspirants] = useState([])
    const [aspirantList, setAspirantList] = useState([])
    // fetch aspirants 
    const fetchAspirants = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/aspirant`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setAspirants(response.data)
        setAspirantList(response.data)
    }

    useEffect(() => {
        fetchAspirants()
    }, [])

    // view 
    const [view, setView] = useState("grid")

    const sortAspirants = (param) => {
        switch (param) {
            case 'declined':
                const declined = aspirantList.filter(aspirant => aspirant.status === "2")
                setAspirants(declined)
                break;
            case 'pending':
                const pending = aspirantList.filter(aspirant => aspirant.status === "0")
                setAspirants(pending)
                break;
            case 'approved':
                const approved = aspirantList.filter(aspirant => aspirant.status === "1")
                setAspirants(approved)
                break;
            default:
                setAspirants(aspirantList)
                break;
        }
    }

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
                        <img src="images/sort.png" alt="sort" />
                        {view === "grid" ? <img src="images/list.png" alt="list" onClick={() => setView("list")} /> : <img src="images/grid.png" alt="grid" onClick={() => setView("grid")} />}
                        <div className="searchbar d-flex justify-content-between align-items-center">
                            <input type="text" placeholder="Search for Aspirant Profile" />
                            <img src="images/search.png" alt="search" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="sort">
                            <button onClick={() => sortAspirants("all")}>All Aspirants</button>
                            <button onClick={() => sortAspirants("declined")}>Declined Profiles</button>
                            <button onClick={() => sortAspirants("pending")}>Pending Requests</button>
                            <button onClick={() => sortAspirants("approved")}>Approved Profiles</button>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {view === "grid" &&
                            <div className="row grid">
                                {aspirants.map((aspirant) => {
                                    return (
                                        <div className="col-lg-3">
                                            <div className={`aspirant ${aspirant.status == 0 && 'pending'} ${aspirant.status == 1 && 'approved'} ${aspirant.status == 2 && 'rejected'}`}>
                                                <div className="mb-3 d-flex justify-content-between align-items-center">
                                                    <p className="mb-0">2m ago</p>
                                                    <i className="fa-solid fa-ellipsis" />
                                                </div>
                                                <div className="img-container">
                                                    <img src={aspirant.image === undefined ? "/images/user (1) 1.png" : `${aspirant.image}`} alt="profile-img" />
                                                </div>
                                                <h4>{aspirant.firstname}<br />{aspirant.lastname}</h4>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5 className="mb-0"><i className="fa-solid fa-circle" />{aspirant.status == 0 && "Pending"}{aspirant.status == 1 && "Approved"}{aspirant.status == 2 && "Declined"}</h5>
                                                    <Link to={`/aspirants/${aspirant._id}`}><button>Open</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {view === "list" &&
                            <div className="list">
                                <div className="row header">
                                    <div className="col-lg-5">
                                        <h3>Name</h3>
                                    </div>
                                    <div className="col-lg-2">
                                        <h3>Status</h3>
                                    </div>
                                    <div className="col-lg-2">
                                        <h3>Author</h3>
                                    </div>
                                    <div className="col-lg-2">
                                        <h3>Day Added</h3>
                                    </div>
                                </div>
                                {aspirants.map((aspirant) => {
                                    return (
                                        <div className={`aspirant2 ${aspirant.status == 0 && 'pending'} ${aspirant.status == 1 && 'approved'} ${aspirant.status == 2 && 'rejected'}`}>
                                            <div className="row align-items-center">
                                                <div className=" col-lg-5 d-flex align-items-center">
                                                    <div className="img-container">
                                                        <img src={aspirant.image === undefined ? "/images/user (1) 1.png" : `${aspirant.image}`} alt="profile-img" />
                                                    </div>
                                                    <h4 className="mb-0">{aspirant.firstname} {aspirant.lastname}</h4>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h5 className="mb-0"><i className="fa-solid fa-circle" />{aspirant.status == 0 && "Pending"}{aspirant.status == 1 && "Approved"}{aspirant.status == 2 && "Declined"}</h5>
                                                </div>
                                                <div className="col-lg-2">
                                                    <p>{aspirant.firstname} {aspirant.lastname}</p>
                                                </div>
                                                <div className="col-lg-2">
                                                    <p>2min ago</p>
                                                </div>
                                                <div className="col-lg-1">
                                                    <Link to={`/aspirants/${aspirant._id}`}><button>Open</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aspirants;