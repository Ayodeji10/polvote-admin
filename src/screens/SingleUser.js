import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import axios from "axios";
import { API } from "../components/apiRoot";
// import { DataContext } from '../dataContext';
import { Link, useParams } from "react-router-dom";
// import Modal, { contextType } from 'react-modal'
import Modal from 'react-modal'
Modal.setAppElement('#root')

const SingleUsers = () => {
    const [flaggedPost, setFlaggedPost] = useState(false)

    // context 
    // const { context, setContext } = useContext(DataContext)

    // delete modals
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [userDeletedModal, setUserDeletedModal] = useState(false)

    // blacklist modal 
    const [blacklistUserModal, setBlacklistModal] = useState(false)
    const [userBlacklistedModal, setUserBlacklistedModal] = useState(false)

    // post modal 
    const [flagPostModal, setFlagPostModal] = useState(false)
    const [unflagPostModal, setUnflagPostModal] = useState(false)

    // all users  
    const [users, setUsers] = useState([])
    // fetch aspirants 
    const fetchUsers = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/users/users`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setUsers(response.data)
        // setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // stories 
    const [stories, setStories] = useState([])
    // fetch stories
    const fetchStories = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/story`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setStories(response.data)
    }

    useEffect(() => {
        fetchStories()
    }, [])

    // loading 
    const [pageLoading, setPageLoading] = useState(true)

    // params 
    const { id } = useParams()

    // current user 
    const [currentUser, setCurrentUser] = useState(null)

    // fetch current user 
    const fetchCurrentUser = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/users/singleuser/${id}`)
        setCurrentUser(response.data)
        setPageLoading(false)
    }

    useEffect(() => {
        if (id && id !== '') fetchCurrentUser()
    }, [id])

    if (pageLoading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* single users page */}
            <div className="single-user">
                <div className="row">
                    <div className="col-lg-4 aside">
                        {/* header  */}
                        <div className="row header align-items-center mb-5">
                            <div className="col-lg-2">
                                <Link to="/users"><i className="fas fa-arrow-left" /></Link>
                                {/* <i class="fas fa-long-arrow-alt-left"></i> */}
                            </div>
                            <div className="col-lg-10">
                                <h1>All Users</h1>
                                <p className="mb-0">903.202 Users</p>
                            </div>
                        </div>
                        {/* searchbar  */}
                        <div className="searchbar d-flex justify-content-between align-items-center mb-5">
                            <input type="text" placeholder="Search for User" />
                            <img src="images/search.png" alt="" />
                        </div>
                        {/* list */}
                        <div className="list">
                            {users.map((user => {
                                return (
                                    <Link to={`/single-user/${user._id}`}>
                                        <div className="aspirant">
                                            <div className="row align-items-center">
                                                <div className="col-lg-2">
                                                    <img src={`https://olf.online/ballot/${user.image}`} className="img-fluid" alt="profile-img" />
                                                </div>
                                                <div className="col-lg-8">
                                                    <h3 className="mb-0">{user.name}</h3>
                                                </div>
                                                <div className="col-lg-2 d-flex justify-content-end">
                                                    <i className="fas fa-ellipsis-v" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }))}
                        </div>
                    </div>
                    <div className="col-lg-8 main">
                        <div className="row header mb-5">
                            <div className=" col-lg-3">
                                <img src={`https://olf.online/ballot/${currentUser.image}`} className="img-fluid" alt="profile-img" />
                            </div>
                            <div className="col-lg-8">
                                <h1>{currentUser.name}</h1>
                                <div className="mb-4">
                                    <h3>Username</h3>
                                    <p>{currentUser.username}</p>
                                </div>
                                <div>
                                    <h3>Phone Number</h3>
                                    <p>{currentUser.phonenumber}</p>
                                </div>
                            </div>
                            <div className="col-lg-1 d-flex justify-content-end">
                                <div className="dropdown">
                                    <i className="fas fa-ellipsis-v" />
                                    <div className="dropdown-content">
                                        <p className="mb-2" onClick={() => setBlacklistModal(true)}>Add to Blacklist</p>
                                        <p onClick={() => setDeleteUserModal(true)}>Delete User’s Account</p>
                                    </div>
                                </div>
                            </div>

                            {/* deleteUserModal  */}
                            <Modal isOpen={deleteUserModal} onRequestClose={() => setDeleteUserModal(false)} id="blacklistModal">
                                <h1>Are you sure you want to delete user’s account?</h1>
                                <div className="row align-items-center mb-5">
                                    <div className="col-lg-5">
                                        <img src={`https://olf.online/ballot/${currentUser.image}`} className="img-fluid" alt="profile-img" />
                                    </div>
                                    <div className="col-lg-7">
                                        <h3>{currentUser.name}</h3>
                                        <h4>Username</h4>
                                        <p>{currentUser.username}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <button id="cancel-btn" onClick={() => setDeleteUserModal(false)}>Cancel</button>
                                        </div>
                                        <div className="col-lg-7">
                                            <button id="action-btn" onClick={() => {
                                                setDeleteUserModal(false)
                                                setUserDeletedModal(true)
                                            }}>Delete Account</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            {/* userDeletedModal */}
                            <Modal isOpen={userDeletedModal} onRequestClose={() => setUserDeletedModal(false)} id="blacklistedModal">
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img src="images/checked (1) 1.png" alt="" className="mb-5" />
                                    <h5 className="mb-5">User account has been deleted successfully</h5>
                                    <button id="close-close-poll" onClick={() => setUserDeletedModal(false)}>Close</button>
                                </div>
                            </Modal>

                            {/* blacklistModal  */}
                            <Modal isOpen={blacklistUserModal} onRequestClose={() => setBlacklistModal(false)} id="blacklistModal">
                                <div>
                                    <h1>Are you sure you want to add user to blacklist?</h1>
                                    <div className="row align-items-center mb-5">
                                        <div className="col-lg-5">
                                            <img src={`https://olf.online/ballot/${currentUser.image}`} className="img-fluid" alt="profile-img" />
                                        </div>
                                        <div className="col-lg-7">
                                            <h3>{currentUser.name}</h3>
                                            <h4>Username</h4>
                                            <p>{currentUser.username}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <button id="cancel-btn" onClick={() => setBlacklistModal(false)}>Cancel</button>
                                            </div>
                                            <div className="col-lg-7">
                                                <button id="action-btn" onClick={() => {
                                                    setBlacklistModal(false)
                                                    setUserBlacklistedModal(true)
                                                }}>Add to Blacklist</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            {/* blacklisted Modal  */}
                            <Modal isOpen={userBlacklistedModal} onRequestClose={() => setUserBlacklistedModal(false)} id="blacklistedModal">
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img src="images/checked (1) 1.png" alt="" className="mb-5" />
                                    <h5 className="mb-5">User account has been successfully added to Blacklist</h5>
                                    <button id="close-close-poll" onClick={() => setUserBlacklistedModal(false)}>Close</button>
                                </div>
                            </Modal>



                        </div>
                        <div className="d-flex justify-content-between align-items-center title">
                            <h1>{!flaggedPost ? "Posts" : "Flagged Posts"}</h1>
                            {!flaggedPost ?
                                <p onClick={() => setFlaggedPost(true)}>Flagged Posts<i className="fas fa-angle-right" /></p>
                                :
                                <p onClick={() => setFlaggedPost(false)}>All Posts<i className="fas fa-angle-right" /></p>
                            }
                        </div>
                        {/* flagged post  */}
                        {flaggedPost &&
                            <>
                                {/* {stories.filter((story) => story.userid ===)} */}
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag2.png" alt="" onClick={() => setUnflagPostModal(true)} />
                                        </div>
                                    </div>
                                </div>

                                {/* unflag post modal  */}
                                <Modal isOpen={unflagPostModal} onRequestClose={() => setUnflagPostModal(false)} id="postModal">
                                    <h3>You are about to unflag a post</h3>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <button id="cancel-btn" onClick={() => setUnflagPostModal(false)}>Cancel</button>
                                        </div>
                                        <div className="col-lg-6">
                                            <button id="action-btn">Proceed</button>
                                        </div>
                                    </div>
                                </Modal>

                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        {/* all posts  */}
                        {!flaggedPost &&
                            <>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag.png" alt="flag" onClick={() => setFlagPostModal(true)} />
                                        </div>
                                    </div>
                                </div>

                                {/* flag post modal  */}
                                <Modal isOpen={flagPostModal} onRequestClose={() => setFlagPostModal(false)} id="postModal">
                                    <h3>You are about to flag a post</h3>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <button id="cancel-btn" onClick={() => setFlagPostModal(false)}>Cancel</button>
                                        </div>
                                        <div className="col-lg-6">
                                            <button id="action-btn">Proceed</button>
                                        </div>
                                    </div>
                                </Modal>

                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian Government</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="post mb-3">
                                    <div className="row align-items-center">
                                        <div className=" col-lg-11">
                                            <p>We were paid to come and support the Nigerian</p>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/eye 1.png" alt="" />120</h6>
                                                </div>
                                                <div className="col-lg-2">
                                                    <h6 className="mb-0"><img src="images/blogging 1.png" alt="" />82</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1">
                                            <img src="images/flag.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleUsers;