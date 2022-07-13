import React, { useState } from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#root')

function RejectedTransaction() {
    const [paymentConfirmationModal, setPaymentConfirmationModal] = useState(false)

    return (
        <div className="row">
            <div className="col-lg-1">
                <p>01</p>
            </div>
            <div className="col-lg-2">
                <p>Adesina Flake Akintola</p>
            </div>
            <div className="col-lg-2">
                <p>example@gmail.com</p>
            </div>
            <div className="col-lg-1">
                <p>150</p>
            </div>
            <div className="col-lg-1">
                <p>Zenith Bank</p>
            </div>
            <div className="col-lg-1">
                <p>0012382910</p>
            </div>
            <div className="col-lg-1">
                <p>032943479</p>
            </div>
            <div className="col-lg-2">
                <p>Mon Feb 14, 2022, 3:29 PM</p>
            </div>
            <div className="col-lg-1">
                <button id='approve' onClick={() => setPaymentConfirmationModal(true)}>APPROVE</button>
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
                    <button id='confirm'>Confirm</button>
                </div>
            </Modal>
        </div>
    )
}

export default RejectedTransaction