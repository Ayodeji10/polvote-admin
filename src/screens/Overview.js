import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Nav from "../components/nav";
import { Link, useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
// import { Chart } from 'react-chartjs-2'
import Modal from 'react-modal'
import AdCard from "../components/adCard";
Modal.setAppElement('#root')

const Home = () => {
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

    // ad modal and states
    const [adManagerModal, setAdManagerModal] = useState(false)
    const [createNewAd, setCreateNewAd] = useState(false)

    const [adtype, setAddtype] = useState("")
    const [text, setText] = useState("")
    const [link, setlink] = useState("")
    const [image, setImage] = useState(null)

    // // get ads 
    const [ads, setAds] = useState([])

    // fetch ads 
    const getAds = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/admanager/getall`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setAds(response.data)
        // console.log(response)
    }
    useEffect(() => {
        getAds()
    }, [])

    // create new ad 
    const createAd = () => {
        // axios.post(`${API.API_ROOT}/admanager/admanager`, { adtype, text, link, image }, { headers: { 'content-type': 'multipart/form-data' } })
        //     .then(response => {
        //         console.log(response)
        //     }).catch(error => {
        //         console.log(error)
        //     })
        console.log(adtype)
        console.log(text)
        console.log(link)
        console.log(image)
        const fd = new FormData()
        fd.append('adtype', adtype)
        fd.append('text', text)
        fd.append('link', link)
        fd.append('image', image)

        axios({
            url: `${API.API_ROOT}/admanager/admanager`,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            data: fd
        }).then((response) => {
            // console.log(response)
            getAds()
            setCreateNewAd(false)
        }, (error) => {
            console.log(error)
        })
    }

    // fetch users 
    const [users, setUsers] = useState("")
    const fetchUsers = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/users/allusers`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setUsers(response.data.length)
    }
    useEffect(() => {
        fetchUsers()
    }, [])

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
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Ongoing Polls</h1>
                    <button id="ad-btn" onClick={() => setAdManagerModal(true)}><i className="fa-solid fa-volume-high" />Ads Manager</button>
                </div>
                <div className="carousel">
                    {polls.map((poll, index) => {
                        return (
                            <div className={`poll ${index === value && "active"}`} key={index} onClick={() => setValue(index)}>
                                <h3>{poll.polltitle}</h3>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <p>Total Poll</p>
                                        <h1>{poll.aspirant.reduce((total, aspirant) => {
                                            let increament = aspirant.votes.length
                                            total += (increament)
                                            return total
                                        }, 0)}</h1>
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
                                            <img src={each.image === undefined ? "/images/user (1) 1.png" : `${each.image}`} alt="candidate-img" className="img-fluid" />
                                            <img src={parties.filter(party => party.partyname === each.politparty).length === 0 ? "/img/user (1) 1.png" : `${parties.filter(party => party.partyname === each.politparty)[0].image}`} alt="party" className="img-fluid" />
                                            <div>
                                                <h3>{each.firstname} {each.lastname}</h3>
                                                <h4 className="mb-0">{each.politparty}</h4>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <h3>{(each.votes.length / aspirant.reduce((total, aspirant) => {
                                                    let increament = aspirant.votes.length
                                                    total += (increament)
                                                    return total
                                                }, 0)) * 100}%</h3>
                                                <h5>{each.votes.length} Votes</h5>
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
                                    <h1 className="mb-0">{users}</h1>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end align-items-end">
                                    <Link to="/users"><p className="mb-0">See All Users<i className=" fas fa-angle-right" /></p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* add-manager */}
            <Modal isOpen={adManagerModal} onRequestClose={() => setAdManagerModal(false)} id="add-modal">
                <i className="fa-solid fa-circle-xmark" onClick={() => setAdManagerModal(false)} />
                <h1>Ads Manager</h1>
                <div className="d-flex justify-content-end mb-3">
                    {createNewAd ? <i className="fa-solid fa-arrow-left-long" onClick={() => setCreateNewAd(false)} /> : <button onClick={() => setCreateNewAd(true)}>Add New Advert</button>}
                </div>
                {createNewAd ?
                    <div>
                        <label htmlFor="position">Advert Position</label>
                        <select name="position" id="position" onChange={(e) => setAddtype(e.target.value)} >
                            <option value="">-- select  Position --</option>
                            <option value="Top banner">Top banner</option>
                            <option value="Bottom banner">Bottom banner</option>
                            <option value="Top side panel">Top side panel</option>
                            <option value="Bottom side panel">Bottom side panel</option>
                            <option value="Story area">Story area</option>
                            <option value="Profile area">Profile area</option>
                        </select>
                        <label htmlFor="text9">Insert text</label>
                        <input type="text" id="text9" placeholder="Type here" value={text} onChange={(e) => setText(e.target.value)} />
                        <label htmlFor="link9">Insert link</label>
                        <input type="url" id="link9" placeholder="Type here" value={link} onChange={(e) => setlink(e.target.value)} />
                        <label htmlFor="image9">Insert image</label>
                        <label htmlFor="image9" className="img-label">Upload image<i className="fa-solid fa-arrow-up-from-bracket" /></label>
                        <input type="file" id="image9" className="ad-img-input" onChange={(e) => setImage(e.target.files[0])} />
                        {image !== null && <img src={URL.createObjectURL(image)} alt="" className="img-fluid mb-3" />}
                        <button onClick={createAd}>Add Advert</button>
                    </div> :
                    <>
                        {ads.map((ad, index) => {
                            return <AdCard ad={ad} key={index} getAds={getAds} />
                        })}
                    </>
                }
            </Modal>
        </div>
    );
};

export default Home;