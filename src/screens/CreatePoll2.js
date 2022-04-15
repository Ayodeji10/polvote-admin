import React, { useState, useEffect, useContext } from "react";
import { DataContext } from '../dataContext';
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link, useNavigate } from "react-router-dom";

const CreatePoll2 = () => {
    // context 
    const { context, setContext } = useContext(DataContext)

    // navigate 
    const navigate = useNavigate()

    // search and search term 
    const [searchTerm, setSearchTerm] = useState("")
    const [searching, setSearching] = useState(false)

    // loading and error
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // aspirants array 
    const [aspirants, setAspirants] = useState([])

    // fetch aspirants 
    const fetchAspirants = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/aspirant`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setAspirants(response.data)
        setPageLoading(false)
    }

    useEffect(() => {
        fetchAspirants()
    }, [])

    // add new Aspirants 
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastName] = useState("")
    const [pparty, setPparty] = useState("")
    const [image, setImage] = useState("")

    const handleSubmitProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await axios
            .post(`${API.API_ROOT}/aspirant/register`, { firstname, lastname, pparty, image })
            .catch((error) => {
                setLoading(false)
                if (error.response.status === 401 || error.response.status === 400) {
                    setError(error.response.message)
                }
                else {
                    setError('Something went wrong, please try again')
                }
                console.error(error)
                setLoading(false)
            })
        setLoading(false)
        console.log(response)
        if (response.status === 200) {
            window.location.reload()
        }
    }

    // add aspirant 
    const addToAspirants = (id, aspirant) => {
        const checkDuplicate = context.newPoleForm.aspirants.filter((aspirant) => aspirant.id === id)
        if (checkDuplicate.length < 1) {
            setContext({ ...context, newPoleForm: { ...context.newPoleForm, aspirants: [...context.newPoleForm.aspirants, { id: aspirant._id, firstname: aspirant.firstname, lastname: aspirant.lastname, politparty: aspirant.pparty, image: aspirant.image }] } })
        }
    }

    // remove aspirant 
    const removeAspirant = (aspirant) => {
        const newAspirants = context.newPoleForm.aspirants.filter((aspirants) => aspirants.id !== aspirant.id)
        setContext({ ...context, newPoleForm: { ...context.newPoleForm, aspirants: newAspirants } })
    }

    const launchPoll = async () => {
        // console.log({ pollcategory: context.newPoleForm.category, pollstate: context.newPoleForm.state, senatedistrict: context.newPoleForm.district, constituency: context.newPoleForm.constituency, polltitle: context.newPoleForm.title, startdate: context.newPoleForm.startDate, enddate: context.newPoleForm.endDate, aspirant: context.newPoleForm.aspirants })
        const response = await axios
            .post(`${API.API_ROOT}/polls/addpoll`, { pollcategory: context.newPoleForm.category, pollstate: context.newPoleForm.state, senatedistrict: context.newPoleForm.district, constituency: context.newPoleForm.constituency, polltitle: context.newPoleForm.title, startdate: context.newPoleForm.startDate, enddate: context.newPoleForm.endDate, aspirant: context.newPoleForm.aspirants })
            .catch((error) => {
                setLoading(false)
                if (error.response.status === 401 || error.response.status === 400) {
                    setError(error.response.message)
                }
                else {
                    setError('Something went wrong, please try again')
                }
                console.error(error)
                setLoading(false)
            })
        setLoading(false)
        // console.log(response)
        if (response.status === 200) {
            setContext({ ...context, newPoleForm: { category: "", state: null, district: null, constituency: null, title: "", startDate: "", endDate: "", aspirants: [] } })
            navigate("/polls")
        }
    }

    if (pageLoading) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* new poll  */}
            <div className="new-polls">
                <Link to="/newpole"><p id="header"><i className="fas fa-angle-left" />Back</p></Link>
                <form action className="add-participant">
                    <h1>Add Aspirant to Poll</h1>
                    <div className="input">
                        <label htmlFor="profiles">Add From Profile</label>
                        <div className="searchbar d-flex justify-content-between align-items-center">
                            <input type="text" placeholder="Search Aspirant" id="profiles" value={searchTerm} onChange={(e) => {
                                setSearchTerm(e.target.value);
                                if (e.target.value === '') {
                                    setSearching(false)
                                } else {
                                    setSearching(true)
                                }
                            }} />
                            <img src="images/search.png" alt="search" />
                        </div>
                        {searching ?
                            <div>
                                {aspirants.filter(val => {
                                    if (searchTerm === '') {
                                        return val
                                    } else if (val.firstname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.lastname.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return val
                                    }
                                }).map((aspirant, index) => {
                                    return (
                                        <p key={index} onClick={() => addToAspirants(aspirant._id, aspirant)}>{aspirant.firstname} {aspirant.lastname}</p>
                                    )
                                })}
                            </div> : ""
                        }
                    </div>
                    <div className="or">
                        <div className="row">
                            <div className="col-lg-3 d-flex align-items-end">
                                <div className="underline" />
                            </div>
                            <div className="col-lg-6">
                                <h3>Or Add New Profile</h3>
                            </div>
                            <div className="col-lg-3 d-flex align-items-end">
                                <div className=" underline" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input">
                                <label htmlFor="fname">First Name</label>
                                <input type="text" name="fname" id="fname" placeholder="First Name Here" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input">
                                <label htmlFor="lname">Last Name</label>
                                <input type="text" name="lname" id="lname" placeholder="Last Name Here" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="input">
                        <label htmlFor="party">Political Party</label>
                        <select name="party" id="party" onChange={(e) => setPparty(e.target.value)}>
                            <option disabled selected>Select Category</option>
                            <option value="AAA">AAA</option>
                            <option value="BBBB">BBBB</option>
                            <option value="ASDF">ASDF</option>
                            <option value="RTA">RTA</option>
                        </select>
                    </div>
                    <div className="input">
                        <label htmlFor="image">Upload Aspirant’s Image</label>
                        <input type="text" name="image" id="image" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <button onClick={handleSubmitProfile}>Add Profile</button>
                </form>
                <div className="added-participant">
                    <h1>Participants</h1>
                    {context.newPoleForm.aspirants.length < 1 && <p>No aspirants added</p>}
                    {context.newPoleForm.aspirants.map((aspirant) => {
                        return (
                            <div className="participant" key={aspirant.id}>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <img src={`https://drive.google.com/thumbnail?id=${aspirant.image}`} className="img-fluid" alt="profile-img" />
                                        {/* <img src="images/african-american-man-with-round-eyeglasses-denim-shirt_273609-19878 1.png" alt="participant" className="img-fluid" /> */}
                                    </div>
                                    <div className="col-lg-8 d-flex flex-column justify-content-center">
                                        <h3>{aspirant.firstname} {aspirant.lastname}</h3>
                                        <p className=" mb-0">{aspirant.politparty}</p>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fas fa-times" onClick={() => removeAspirant(aspirant)} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button onClick={launchPoll}>Launch Poll</button>
            </div>
        </div>
    );
};

export default CreatePoll2;