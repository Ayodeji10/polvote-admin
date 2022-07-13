import React, { useState } from 'react'
import axios from "axios";
import { API } from "../components/apiRoot";
import Modal from 'react-modal'
Modal.setAppElement('#root')

function PendingTransaction({ history }) {
    const [paymentConfirmationModal, setPaymentConfirmationModal] = useState(false)
    const [paymentRejectionModal, setPaymentRejectionModal] = useState(false)
    const [rejectionState, setRejectionState] = useState(false)

    const [acceptLoading, setAcceptLoading] = useState(false)
    const acceptTransaction = () => {
        setAcceptLoading(true)
        axios.patch(`${API.API_ROOT}/wallet/accept/${history._id}`, { date: new Date() }, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                setAcceptLoading(false)
                // console.log(response)
                window.location.reload()
            }).catch(error => {
                setAcceptLoading(false)
                console.log(error)
            })
    }

    const [rejectLoading, setRejectLoading] = useState(false)
    const [reason, setReason] = useState("")
    const rejectTransaction = () => {
        console.log(reason)
        setRejectLoading(true)
        axios.patch(`${API.API_ROOT}/wallet/reject/${history._id}`, { date: new Date(), reason }, { headers: { 'content-type': 'application/json' } })
            .then(response => {
                setRejectLoading(false)
                // console.log(response)
                window.location.reload()
            }).catch(error => {
                setRejectLoading(false)
                // console.log(error)
            })
    }

    return (
        <div className="row">
            <div className="col-lg-2">
                <p>{history.accountname}</p>
            </div>
            <div className="col-lg-2">
                <p>{history.email}</p>
            </div>
            <div className="col-lg-1">
                <p>{history.amount}</p>
            </div>
            <div className="col-lg-1">
                <p>{history.bankname}</p>
            </div>
            <div className="col-lg-1">
                <p>{history.accountnumber}</p>
            </div>
            <div className="col-lg-1">
                <p>{history.sortcode}</p>
            </div>
            <div className="col-lg-2">
                <p>{history.createdAt.substring(0, 19)}</p>
            </div>
            <div className="col-lg-2">
                <button id='reject' onClick={() => setPaymentRejectionModal(true)}>{rejectLoading ? "Loading..." : "REJECT"}</button>
                <button id='approve' onClick={() => setPaymentConfirmationModal(true)}>{acceptLoading ? "Loading..." : "APPROVE"}</button>
            </div>

            {/* confirmation modal */}
            <Modal isOpen={paymentConfirmationModal} onRequestClose={() => setPaymentConfirmationModal(false)} id="paymentConfirmationModal">
                <i className="fa-solid fa-circle-xmark" onClick={() => setPaymentConfirmationModal(false)} />
                <h1>Confirm Payment Approval</h1>
                <p>You are about to approve a payment transaction.
                    Ensure you have made a successful payment transaction to user before you confirm payment on this dashboard. <br /><br />
                    Once Confirmed, user would receive a transaction approval on their dashboard
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    <button id='cancel' onClick={() => setPaymentConfirmationModal(false)}>Cancel</button>
                    <button id='confirm' onClick={acceptTransaction}>Confirm</button>
                </div>
            </Modal>

            {/* rejection modal */}
            <Modal isOpen={paymentRejectionModal} onRequestClose={() => {
                setPaymentRejectionModal(false)
                setRejectionState(false)
            }} id="paymentRejectionModal">
                <i className="fa-solid fa-circle-xmark" onClick={() => {
                    setPaymentRejectionModal(false)
                    setRejectionState(false)
                }} />
                {!rejectionState ?
                    <>
                        <h1>Are you sure you want to reject this payment request?</h1>
                        <p>Once request is rejected, details are still accessible on the Reject Page</p>
                        <div className='d-flex justify-content-between align-items-center'>
                            <button id='cancel' onClick={() => setPaymentRejectionModal(false)}>No</button>
                            <button id='confirm' onClick={() => setRejectionState(true)}>Yes, Reject Request</button>
                        </div>
                    </> :
                    <>
                        <h1>State why you’re rejecting this payment request? </h1>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Type here' value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                        <div className='d-flex justify-content-end'>
                            <button id='confirm' onClick={rejectTransaction} >{rejectLoading ? "Loading..." : "Reject"}</button>
                        </div>
                    </>
                }
            </Modal>
        </div>
    )
}

export default PendingTransaction