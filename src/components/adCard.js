import React, { useState } from 'react'
import axios from "axios";
import { API } from "../components/apiRoot";
import Modal from 'react-modal'
Modal.setAppElement('#root')

function AdCard({ ad, getAds }) {
    const [editModal, setEditModal] = useState(false)

    const [adtype, setAddtype] = useState("")
    const [text, setText] = useState("")
    const [link, setlink] = useState("")
    const [image, setImage] = useState(null)

    const editAd = () => {
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
            url: `${API.API_ROOT}/admanager/edited/${ad._id}`,
            method: "Patch",
            headers: { "Content-Type": "multipart/form-data" },
            data: fd
        }).then((response) => {
            // console.log(response)
            getAds()
            setEditModal(false)
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="ad">
                <div className="row">
                    <div className="col-4">
                        <h2>Advert Position</h2>
                        <h3>{ad.adtype}</h3>
                    </div>
                    <div className="col-5">
                        <h2>Title</h2>
                        <h3>{ad.text}</h3>
                    </div>
                    <div className="col-3">
                        <button onClick={() => {
                            setAddtype(ad.adtype)
                            setText(ad.text)
                            setlink(ad.link)
                            setEditModal(true)
                        }}>Edit</button>
                    </div>
                </div>
            </div>

            {/* edit modal */}
            <Modal isOpen={editModal} onRequestClose={() => setEditModal(false)} id="add-modal">
                <i className="fa-solid fa-circle-xmark" onClick={() => setEditModal(false)} />
                <h1>Ads Manager</h1>
                <div className="mb-5">
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
                    {image === null && <img src={ad.image} alt={ad.text} className="img-fluid" />}
                    {image !== null && <img src={URL.createObjectURL(image)} alt="" className="img-fluid" />}
                </div>
                <button onClick={editAd}>Submit</button>
            </Modal>
        </>
    )
}

export default AdCard 