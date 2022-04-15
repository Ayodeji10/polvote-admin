import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link } from "react-router-dom";

const Users = () => {
    const [loading, setLoading] = useState(true)
    // aspirants array 
    const [users, setUsers] = useState([])

    // fetch aspirants 
    const fetchUsers = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/users/users`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setUsers(response.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const [allUsers, setAllUsers] = useState(true)
    const [activeUsers, setActiveUsers] = useState(false)

    if (loading) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* users page */}
            <div className="users-page">
                <div className="row">
                    <div className="col-lg-3 aside">
                        <h1>Users</h1>
                        <p className="mb-5">903.202 Users</p>
                        <div className="searchbar d-flex justify-content-between align-items-center mb-5">
                            <input type="text" placeholder="Search for User" />
                            <img src="images/search.png" alt="" />
                        </div>
                        <div className="filter">
                            <div className={`row align-items-center category ${allUsers && "active"}`} onClick={() => {
                                setActiveUsers(false)
                                setAllUsers(true)
                            }} >
                                <div className="col-lg-3">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <img src="images/user.png" alt="active" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <h3 className="mb-0">All Users</h3>
                                </div>
                            </div>
                            <div className={`row align-items-center category ${activeUsers && "active"}`} onClick={() => {
                                setActiveUsers(true)
                                setAllUsers(false)
                            }}>
                                <div className="col-lg-3">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <img src="images/Vector333.png" alt="active" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <h3 className="mb-0">Active Users</h3>
                                </div>
                            </div>
                            <div className="row align-items-center category">
                                <div className="col-lg-3">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <img src="images/Group 318.png" alt="active" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <h3 className="mb-0">Blacklists</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1" />
                    <div className="col-lg-8 main">
                        <h3>{activeUsers && "Active Users"}{allUsers && "All Users"}</h3>
                        <p>{activeUsers && `${users.filter(user => user.status === 1).length} Active Users`}{allUsers && `${users.length} Users`}</p>
                        {/* all users  */}
                        {allUsers &&
                            <>
                                {users.map(user => {
                                    return (
                                        <div className="user mb-3" key={user._id}>
                                            <div className="row align-items-center">
                                                <div className="col-lg-1">
                                                    <img src={`https://olf.online/ballot/${user.image}`} className="img-fluid" alt="profile-img" />
                                                </div>
                                                <div className="col-lg-3">
                                                    <h3>{user.name}</h3>
                                                    <h5>{user.username}</h5>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h4>Phone Number</h4>
                                                    <h5>{user.phonenumber}</h5>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h4>Visit Time</h4>
                                                    <h5>undefined</h5>
                                                </div>
                                                <div className="col-lg-2">
                                                    <Link to={`/single-user/${user._id}`}><span>Open<i className="fas fa-angle-right" /></span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }

                        {/* active users  */}
                        {activeUsers &&
                            <>
                                {users.filter(user => user.status === 1).map(user => {
                                    return (
                                        <div className="user mb-3" key={user._id}>
                                            <div className="row align-items-center">
                                                <div className="col-lg-1">
                                                    <img src={`https://olf.online/ballot/${user.image}`} className="img-fluid" alt="profile-img" />
                                                </div>
                                                <div className="col-lg-3">
                                                    <h3>{user.name}</h3>
                                                    <h5>{user.username}</h5>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h4>Phone Number</h4>
                                                    <h5>{user.phonenumber}</h5>
                                                </div>
                                                <div className="col-lg-3">
                                                    <h4>Visit Time</h4>
                                                    <h5>undefined</h5>
                                                </div>
                                                <div className="col-lg-2">
                                                    <Link to="/single-user"><span>Open<i className="fas fa-angle-right" /></span></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;