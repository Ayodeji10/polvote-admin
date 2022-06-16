import React, { useState } from 'react'
import Modal from 'react-modal'
import LivePollCardAspirant from './livePollCardAspirant'
Modal.setAppElement('#root')

function LivePollCard({ poll, parties }) {
    const [pollModal, setPollModal] = useState(false)

    return (
        <>
            <div className="poll">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>{poll.polltitle}</h1>
                        <h2>{poll.category}</h2>
                    </div>
                    <div className="col-lg-2">
                        <h3>Open Date</h3>
                        <p>{poll.startdate.substring(0, 10)}</p>
                    </div>
                    <div className="col-lg-2">
                        <h3>End Date</h3>
                        <p>{poll.enddate.substring(0, 10)}</p>
                    </div>
                    <div className="col-lg-2">
                        <button onClick={() => setPollModal(true)}>Enter Results</button>
                    </div>
                </div>
            </div>
            <Modal isOpen={pollModal} onRequestClose={() => setPollModal(false)} id="LivePollModal">
                <i className="fa-solid fa-circle-xmark" />
                <h1>{poll.polltitle}</h1>
                <h2>LeaderBoard</h2>
                <div className="candidates">
                    {poll.aspirant.map((aspirant, index) => {
                        return (
                            <LivePollCardAspirant aspirant={aspirant} pollId={poll._id} key={index} />
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}

export default LivePollCard