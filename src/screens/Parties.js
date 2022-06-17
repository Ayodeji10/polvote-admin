import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../components/apiRoot";
import Modal from 'react-modal'
Modal.setAppElement('#root')

function Parties() {
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

    const [addPartyModal, setAddPartyModal] = useState(false)

    // fetch parties and countries
    const [parties, setParties] = useState([])
    const [partyList, setPartyList] = useState([])
    const [countries, setCountries] = useState([])

    // parties 
    const fetchParties = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/parties/parties`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setParties(response.data)
        setPartyList(response.data)
    }

    const searchParties = (e) => {
        // console.log(e.target.value)
        const filteredParties = parties.filter(party => party.partyname.toLowerCase().includes(e.target.value.toLowerCase()))
        // console.log(people)
        setPartyList(filteredParties)
    }

    // countries 
    const fetchCountries = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/countries/countries`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setCountries(response.data)
    }

    useEffect(() => {
        fetchParties()
        fetchCountries()
    }, [])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [country, setCountry] = useState("")
    const [partyName, setPartyName] = useState("")
    const [partyAbb, setpartyAbb] = useState("")
    const [image, setImage] = useState(null)

    // create party 
    const handleCreateParty = () => {
        setLoading(true);
        setError("")
        const fd = new FormData()
        fd.append('country', country)
        fd.append('partyname', partyName)
        fd.append("partyabb", partyAbb)
        fd.append('image', image)
        console.log(Array.from(fd))
        axios({
            url: `${API.API_ROOT}/parties`,
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            data: fd
        }).then((response) => {
            setLoading(false)
            window.location.reload()
        }, (error) => {
            setLoading(false)
            setError('Something went wrong, please try again')
        })
    }

    // delete party 
    const handleDeleteParty = (id) => {
        axios({
            url: `${API.API_ROOT}/parties/deleteparty/${id}`,
            method: "delete",
        }).then((response) => {
            setLoading(false)
            window.location.reload()
        }, (error) => {
            setLoading(false)
            setError('Something went wrong, please try again')
        })
    }

    // toggle party 
    const handleToggleParty = (id) => {
        axios({
            url: `${API.API_ROOT}/parties/switchparty/${id}`,
            method: "patch",
        }).then((response) => {
            setLoading(false)
            window.location.reload()
        }, (error) => {
            setLoading(false)
            setError('Something went wrong, please try again')
        })
    }

    // edit country 
    const [editPartyModal, setEditPartyModal] = useState(false)
    const [editId, setEditId] = useState("")
    const handleEditPartyModal = (party) => {
        setEditPartyModal(true)
        setCountry(party.country)
        setPartyName(party.partyname)
        setpartyAbb(party.partyabb)
        setEditId(party._id)
    }

    // edit party 
    const updateCountry = () => {
        setLoading(true);
        setError("")
        const fd = new FormData()
        fd.append('country', country)
        fd.append('partyname', partyName)
        fd.append("partyabb", partyAbb)
        if (image !== null & image !== undefined) {
            fd.append('image', image)
        }
        console.log(Array.from(fd))

        axios({
            url: `${API.API_ROOT}/parties/editparty/${editId}`,
            method: "patch",
            headers: { "Content-Type": "multipart/form-data" },
            data: fd
        }).then((response) => {
            setLoading(false)
            window.location.reload()
        }, (error) => {
            setLoading(false)
            setError('Something went wrong, please try again')
        })
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            <div className="countries">
                {/* header  */}
                <header>
                    <div className="row">
                        <div className="col-lg-6 d-flex align-items-center">
                            <h1>PolItical Parties</h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-5">
                                    <button onClick={() => setAddPartyModal(true)}><img src="/images/button 1.png" alt="add" />Add New Party</button>
                                </div>
                                <div className="col-lg-7">
                                    <div className="searchbar d-flex align-items-center">
                                        <input type="text" placeholder="Search for Political Party" onChange={(e) => searchParties(e)} />
                                        <img src="/images/search.png" alt="search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className='mb-5'>
                    <div className="row header">
                        <div className="col-lg-4">
                            <h2>POLITICAL PARTIES [5]</h2>
                        </div>
                        <div className="col-lg-1">
                            <h2>ABBV.</h2>
                        </div>
                        <div className="col-lg-2">
                            <h2>ASPIRANTS</h2>
                        </div>
                        <div className="col-lg-2">
                            <h2>DATE ADDED</h2>
                        </div>
                        <div className="col-lg-3">
                            <h2>STATUS</h2>
                        </div>
                    </div>
                    {partyList.map(party => {
                        return (
                            <div className="row align-items-center country" key={party._id}>
                                <div className="col-lg-4 d-flex align-items-center">
                                    <div className="img-container">
                                        <img src={party.image} alt="country" />
                                    </div>
                                    <h2>{party.partyname}</h2>
                                </div>
                                <div className="col-lg-1">
                                    <h2>{party.partyabb}</h2>
                                </div>
                                <div className="col-lg-2">
                                    <h2>402</h2>
                                </div>
                                <div className="col-lg-2">
                                    <h2>{party.createdAt.substring(0, 10)}</h2>
                                </div>
                                <div className="col-lg-2 d-flex align-items-center">
                                    <i className={`fa-solid fa-toggle-${party.status == 0 ? "on" : "off"}`} onClick={() => handleToggleParty(party._id)} />
                                    <p className="mb-0">{party.status == 0 ? "Active" : "Inactive"}</p>
                                </div>
                                <div className="col-lg-1 d-flex align-items-center justify-content-between">
                                    <i className="fa-solid fa-pen" onClick={() => handleEditPartyModal(party)} />
                                    <i className="fa-solid fa-trash-can" onClick={() => handleDeleteParty(party._id)} />
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>

            {/* add party modal  */}
            <Modal isOpen={addPartyModal} onRequestClose={() => setAddPartyModal(false)} id="add-party">
                <i className="fa-solid fa-circle-xmark" onClick={() => setAddPartyModal(false)} />
                <h1>Add Party</h1>
                <label htmlFor="Country">Country</label>
                <select name="category" id="category" onChange={(e) => setCountry(e.target.value)}>
                    <option value="">-- select  Country --</option>
                    {countries.map((nation) => {
                        return <option value={nation.country} key={nation._id}>{nation.country}</option>
                    })}
                </select>
                <label htmlFor="name">Party Name</label>
                <input type="text" id='name' placeholder='Party Name' value={partyName} onChange={(e) => setPartyName(e.target.value)} />
                <label htmlFor="abb">Name Abbreviation</label>
                <input type="text" id='abb' placeholder='Name Abbreviation' value={partyAbb} onChange={(e) => setpartyAbb(e.target.value)} />
                <label htmlFor="flag" id='file'>Upload Party Flag</label>
                <input type="file" id='flag' hidden onChange={(e) => setImage(e.target.files[0])} />
                <p>Upload JPG or PNG File only</p>
                {error}
                <button id='submit' onClick={handleCreateParty}>{loading ? "Loading..." : "Add Country"}</button>
            </Modal>

            {/* edit party modal  */}
            <Modal isOpen={editPartyModal} onRequestClose={() => setEditPartyModal(false)} id="add-party">
                <i className="fa-solid fa-circle-xmark" onClick={() => setEditPartyModal(false)} />
                <h1>Edit {partyName}</h1>
                <label htmlFor="Country">Country</label>
                <select name="category" id="category" onChange={(e) => setCountry(e.target.value)}>
                    <option value="">-- select  Country --</option>
                    {countries.map((nation) => {
                        return <option value={nation.country} selected={country === nation.country} key={nation._id}>{nation.country}</option>
                    })}
                </select>
                <label htmlFor="name">Party Name</label>
                <input type="text" id='name' placeholder='Party Name' value={partyName} onChange={(e) => setPartyName(e.target.value)} />
                <label htmlFor="abb">Name Abbreviation</label>
                <input type="text" id='abb' placeholder='Name Abbreviation' value={partyAbb} onChange={(e) => setpartyAbb(e.target.value)} />
                <label htmlFor="flag" id='file'>Upload Party Flag</label>
                <input type="file" id='flag' hidden onChange={(e) => setImage(e.target.files[0])} />
                <p>Upload JPG or PNG File only</p>
                {error}
                <button id='submit' onClick={updateCountry}>{loading ? "Loading..." : `Update ${partyName}`}</button>
            </Modal>
        </div>
    )
}

export default Parties 