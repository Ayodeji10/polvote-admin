import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from "axios";
import { API } from "../components/apiRoot";
Modal.setAppElement('#root')

function SingleStoryCard({ story }) {
    // post modal 
    const [flagPostModal, setFlagPostModal] = useState(false)
    const [unflagPostModal, setUnflagPostModal] = useState(false)

    const [flagLoader, setFlagLoader] = useState(false)

    // flag and unflag post 
    const flagPost = () => {
        setFlagLoader(true)
        axios({
            url: `${API.API_ROOT}/story/blackliststory/${story._id}`,
            method: "patch",
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            // console.log(response)
            setFlagLoader(false)
            window.location.reload()
        }, (error) => {
            // console.log(error)
            setFlagLoader(false)
        })
    }

    return (
        <>
            <div className="post mb-3">
                <div className="row align-items-center">
                    <div className=" col-lg-11">
                        <p>{story.story}</p>
                        <div className="row">
                            <div className="col-lg-2">
                                <h6 className="mb-0"><img src="/images/eye 1.png" alt="" />{story.storyviews.length}</h6>
                            </div>
                            <div className="col-lg-2">
                                <h6 className="mb-0"><img src="/images/blogging 1.png" alt="" />{story.comments.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1">
                        {story.status === "1" ?
                            <img src="/images/flag.png" alt="flag" onClick={() => setUnflagPostModal(true)} /> :
                            <img src="/images/flag2.png" alt="flag" onClick={() => setFlagPostModal(true)} />
                        }
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
                        <button id="action-btn" onClick={flagPost}>{flagLoader ? "Loading" : "Proceed"}</button>
                    </div>
                </div>
            </Modal>

            {/* unflag post modal  */}
            <Modal isOpen={unflagPostModal} onRequestClose={() => setUnflagPostModal(false)} id="postModal">
                <h3>You are about to unflag a post</h3>
                <div className="row">
                    <div className="col-lg-6">
                        <button id="cancel-btn" onClick={() => setUnflagPostModal(false)}>Cancel</button>
                    </div>
                    <div className="col-lg-6">
                        <button id="action-btn" onClick={flagPost}>{flagLoader ? "Loading" : "Proceed"}</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SingleStoryCard