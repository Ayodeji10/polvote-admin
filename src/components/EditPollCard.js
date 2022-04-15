import React, { useState } from "react";
import axios from "axios";
import { API } from "../components/apiRoot";
import Modal from 'react-modal'
Modal.setAppElement('#root')

const EditPollCard = ({ aspirant, id }) => {
    // modal 
    const [removeCandidateModal, setRemoveCandidateModal] = useState(false)

    // console.log(id)

    // handle remove candidate 
    const handleRemoveCandidate = async (aspirantId) => {
        // console.log(aspirantId)
        const response = await axios
            .patch(`${API.API_ROOT}/polls/deletepollaspirant/${id}`, { aspiid: aspirantId })
            .catch((error) => [
                console.log('Err', error)
            ]);
        // console.log(response)
        window.location.reload()
    }

    return (
        <div className="candidate mb-4" key={aspirant.id}>
            <div className="row align-items-center">
                <div className="col-lg-2 d-flex">
                    <img src="images/Candidate.png" className="img-fluid" alt="" />
                    <img src="images/download 1.png" className="img-fluid" alt="" />
                </div>
                <div className="col-lg-5">
                    <h1 className="mb-0">{aspirant.firstname} {aspirant.lastname}</h1>
                    <p className="mb-1">{aspirant.politparty}</p>
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
                                <h3>{aspirant.firstname} {aspirant.lastname}</h3>
                                <p>{aspirant.politparty}</p>
                            </div>
                            <div>
                                <h3>25%</h3>
                                <p>206,302 Votes</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button id="cancel-close-poll" onClick={() => setRemoveCandidateModal(false)}>Cancel</button>
                        <button id="close-close-poll" onClick={() => handleRemoveCandidate(aspirant.id)}>Remove from Poll</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EditPollCard;