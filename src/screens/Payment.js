import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import axios from "axios";
import { API } from "../components/apiRoot";
import PendingTransaction from '../components/pendingTransaction'
import RejectedTransaction from '../components/rejectedTransaction';

function Payment() {
    const [view, setView] = useState("pending")

    const [history, setHistory] = useState([])
    const fetchHistory = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/wallet`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setHistory(response.data)
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    return (
        <div className="container payment">
            <Nav />
            <div>
                <div className="header d-flex justify-content-between align-items-center mt-5">
                    <h1 className='mb-0'>Payment Request</h1>
                    <div>
                        <button className={view === 'pending' && 'active'} onClick={() => setView("pending")}>Pending</button>
                        <button className={view === 'approved' && 'active'} onClick={() => setView("approved")}>Approved</button>
                        <button className={view === 'rejected' && 'active'} onClick={() => setView("rejected")}>Rejected</button>
                    </div>
                </div>
            </div>

            {/* pending view  */}
            {view === "pending" &&
                <>
                    <h2>Pending Transactions</h2>
                    <div className="log-header mb-3">
                        <div className="row align-items-center">
                            <div className="col-lg-2">
                                <p>Account Name</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Email Address</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Amount</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Bank Name</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Acct Number</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Sort Code</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Date & Time</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Action</p>
                            </div>
                        </div>
                    </div>
                    <div className="log">
                        {history.filter(history => history.status === "1").map((history, index) => {
                            return <PendingTransaction history={history} key={index} />
                        })}
                    </div>
                </>
            }

            {/* approved view  */}
            {view === "approved" &&
                <>
                    <h2>Approved Payment</h2>
                    <div className="log-header mb-3">
                        <div className="row align-items-center">
                            <div className="col-lg-1">
                                <p>S/N</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Account Name</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Email Address</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Amount</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Bank Name</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Acct Number</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Sort Code</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Approval Date & Time</p>
                            </div>
                        </div>
                    </div>
                    {history.filter(history => history.status === "2").map((history, index) => {
                        return (
                            <div className="log row">
                                <div className="col-lg-1">
                                    <p>01</p>
                                </div>
                                <div className="col-lg-2">
                                    <p>{history.accountname}</p>
                                </div>
                                <div className="col-lg-2">
                                    <p>{history.email}hello</p>
                                </div>
                                <div className="col-lg-1">
                                    <p>{history.amount}</p>
                                </div>
                                <div className="col-lg-2">
                                    <p>{history.bankname}</p>
                                </div>
                                <div className="col-lg-1">
                                    <p>{history.accountnumber}</p>
                                </div>
                                <div className="col-lg-2">
                                    <p>{history.sortcode}</p>
                                </div>
                                <div className="col-lg-1">
                                </div>
                            </div>
                        )
                    })}
                </>
            }

            {/* rejected view  */}
            {view === "rejected" &&
                <>
                    <h2>Rejected Payment</h2>
                    <div className="log-header mb-3">
                        <div className="row align-items-center">
                            <div className="col-lg-1">
                                <p>S/N</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Account Name</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Email Address</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Amount</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Bank Name</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Acct Number</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Sort Code</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Approval Date & Time</p>
                            </div>
                            <div className="col-lg-1">
                                <p>Action</p>
                            </div>
                        </div>
                    </div>
                    <div className="log">
                        {history.filter(history => history.status === "3").map((history, index) => {
                            return <RejectedTransaction history={history} key={index} />
                        })}
                    </div>
                </>
            }
        </div>
    )
}

export default Payment