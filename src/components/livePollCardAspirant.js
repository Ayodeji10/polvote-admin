import React, { useState } from 'react'
import axios from "axios";
import { API } from "../components/apiRoot";

function LivePollCardAspirant({ aspirant, pollId }) {
    const [liveVote, setLiveVote] = useState("")

    const [loading, setLoading] = useState(false)
    const updateLiveNumber = () => {
        setLoading(true)
        // console.log(pollId)
        // console.log(aspirant.id)
        // console.log(liveVote)
        axios({
            url: `${API.API_ROOT}/polls/livevote/${pollId}`,
            method: "patch",
            data: { aspid: aspirant.id, livevote: liveVote }
        }).then((response) => {
            console.log(response)
            setLiveVote("")
            setLoading(false)
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="row mb-3 align-items-center">
            <div className="col-lg-2">
                <img src={aspirant.image} alt="" className='img-fluid' />
            </div>
            {/* <div className="col-lg-1">
                                    <img src={parties.filter(party => party.partyname === aspirant.politparty).length === 0 ? "/img/user (1) 1.png" : `${parties.filter(party => party.partyname === aspirant.politparty)[0].image}`} alt="party" className="img-fluid" />
                                </div> */}
            <div className="col-lg-4 d-flex flex-column justify-content-center">
                <h3>{aspirant.firstname} {aspirant.lastname}</h3>
                <p>{aspirant.politparty}</p>
            </div>
            <div className="col-lg-3 d-flex align-items-center">
                <input type="number" placeholder='Enter no of votes' value={liveVote} onChange={(e) => setLiveVote(e.target.value)} />
            </div>
            <div className="col-lg-3">
                <button onClick={updateLiveNumber}>{loading ? "Loading..." : "Update Results"}</button>
            </div>
        </div>
    )
}

export default LivePollCardAspirant 