import React, { useState, useEffect } from 'react'
import Nav from '../components/nav'
import axios from "axios";
import { API } from "../components/apiRoot";
import Modal from 'react-modal'
import { Children } from 'react/cjs/react.production.min';
Modal.setAppElement('#root')

function Countries() {
    const [addCountryModal, setAddCountryModal] = useState(false)
    const [editCountryModal, setEditCountryModal] = useState(false)

    const [form, setForm] = useState([{ category: "", subCategory: [] }])

    const handleAddCategoory = () => {
        const newCategory = { category: "", subCategory: [] }
        setForm(prev => [...prev, newCategory])
    }

    const handleCategoryInput = (index, e) => {
        e.preventDefault()
        setForm(prev => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item
                }
                return {
                    ...item, category: e.target.value
                }
            })
        })
    }

    const handleRemoveCategory = (index) => {
        if (form.length > 1) {
            setForm(prev => prev.filter((item) => item !== prev[index]))
        }
    }

    // subcategory 
    const handleAddSubCategory = (index) => {
        setForm(prev => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item
                }
                return {
                    ...item, subCategory: [...item.subCategory, ""]
                }
            })
        })
    }

    // hanlle sub input 
    const handleSubInput = (e, item, index, itemIndex) => {
        setForm(prev => {
            return prev.map((item, i) => {
                if (i !== itemIndex) {
                    return item
                }
                return {
                    ...item, subCategory: item.subCategory.map((sub, i) => {
                        if (i !== index) {
                            return sub
                        }
                        return e.target.value
                        // return { name: e.target.value }
                    })
                }
            })
        })
    }

    // handle remove sub 
    const handleRemoveSub = (index, itemIndex) => {
        setForm(prev => {
            return prev.map((item, i) => {
                if (i !== itemIndex) {
                    return item
                }
                return {
                    ...item, subCategory: item.subCategory.filter((i) => i !== item.subCategory[index])
                }
            })
        })
    }

    const [country, setCountry] = useState("")
    const [countryAbb, setCountryAbb] = useState("")
    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleCreateCountry = () => {
        setLoading(true);
        setError("")
        const fd = new FormData()
        fd.append('country', country)
        fd.append('countryAbb', countryAbb)
        fd.append('image', image)
        let formString = JSON.stringify(form)
        fd.append('category', formString)
        // console.log(formString)
        // console.log(JSON.parse(formString))
        // console.log(Array.from(fd))
        axios({
            url: `${API.API_ROOT}/countries`,
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

    // fetch countries 
    const [countries, setCountries] = useState([])
    const fetchCountries = async () => {
        const response = await axios
            .get(`${API.API_ROOT}/countries/countries`)
            .catch((error) => [
                console.log('Err', error)
            ]);
        setCountries(response.data)
    }
    useEffect(() => {
        fetchCountries()
    }, [])

    // edit country 
    const [editCountryCategory, setEditCountryCategory] = useState([])
    const [editId, setEditId] = useState("")
    const handleEditCountryModal = (country) => {
        setEditCountryModal(true)
        setCountry(country.country)
        setCountryAbb(country.countryAbb)
        setEditCountryCategory(country.category)
        setEditId(country._id)
    }

    // edit category input 
    const handleEditCategoryInput = (index, e) => {
        e.preventDefault()
        setEditCountryCategory(prev => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item
                }
                return {
                    ...item, category: e.target.value
                }
            })
        })
    }

    // edit remove category
    const handleEditRemoveCategory = (index) => {
        if (editCountryCategory.length > 1) {
            setEditCountryCategory(prev => prev.filter((item) => item !== prev[index]))
        }
    }

    // edit add category 
    const handleEditAddCategoory = () => {
        const newCategory = { category: "", subCategory: [] }
        setEditCountryCategory(prev => [...prev, newCategory])
    }

    // edit add subCategory
    const handleEditAddSubCategory = (index) => {
        setEditCountryCategory(prev => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item
                }
                return {
                    ...item, subCategory: [...item.subCategory, ""]
                }
            })
        })
    }

    // edit handle sub input 
    const handleEditSubInput = (e, item, index, itemIndex) => {
        setEditCountryCategory(prev => {
            return prev.map((item, i) => {
                if (i !== itemIndex) {
                    return item
                }
                return {
                    ...item, subCategory: item.subCategory.map((sub, i) => {
                        if (i !== index) {
                            return sub
                        }
                        return e.target.value
                    })
                }
            })
        })
    }

    // edit handle remove sub 
    const handleEditRemoveSub = (index, itemIndex) => {
        setEditCountryCategory(prev => {
            return prev.map((item, i) => {
                if (i !== itemIndex) {
                    return item
                }
                return {
                    ...item, subCategory: item.subCategory.filter((i) => i !== item.subCategory[index])
                }
            })
        })
    }

    // edit country 
    const updateCountry = () => {
        setLoading(true);
        setError("")
        const fd = new FormData()
        fd.append('country', country)
        fd.append('countryAbb', countryAbb)
        if (image !== null & image !== undefined) {
            fd.append('image', image)
        }
        let formString = JSON.stringify(editCountryCategory)
        fd.append('category', formString)
        console.log(Array.from(fd))
        axios({
            url: `${API.API_ROOT}/countries/editcountries/${editId}`,
            method: "patch",
            headers: { "Content-Type": "multipart/form-data" },
            data: fd
        }).then((response) => {
            // console.log(response)
            setLoading(false)
            window.location.reload()
        }, (error) => {
            setLoading(false)
            // console.log(error)
            setError('Something went wrong, please try again')
        })
    }

    // delete country 
    const handleDeleteCountry = (id) => {
        axios({
            url: `${API.API_ROOT}/countries/deletecountries/${id}`,
            method: "delete",
        }).then((response) => {
            setLoading(false)
            window.location.reload()
        }, (error) => {
            setLoading(false)
            setError('Something went wrong, please try again')
        })
    }

    // toggle country 
    const handleToggleCountry = (id) => {
        axios({
            url: `${API.API_ROOT}/countries/switchcountry/${id}`,
            method: "patch",
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
            <Nav />
            <div className="countries">
                {/* header  */}
                <header>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1>Countries</h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-5">
                                    <button onClick={() => setAddCountryModal(true)}><img src="/images/button 1.png" alt="add" />Add New Country</button>
                                </div>
                                <div className="col-lg-7">
                                    <div className="searchbar d-flex align-items-center">
                                        <input type="text" placeholder="Search for Political Party" />
                                        <img src="images/search.png" alt="search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* courtries  */}
                <section>
                    <div className="row header">
                        <div className="col-lg-4">
                            <h2>COUNTRIES</h2>
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
                    {countries.map(country => {
                        return (
                            <div className="row align-items-center country" key={country._id}>
                                <div className="col-lg-4 d-flex align-items-center">
                                    <div className="img-container">
                                        <img src={country.image} alt="country" />
                                    </div>
                                    <h2>{country.country}</h2>
                                </div>
                                <div className="col-lg-1">
                                    <h2>{country.countryAbb}</h2>
                                </div>
                                <div className="col-lg-2">
                                    <h2>402</h2>
                                </div>
                                <div className="col-lg-2">
                                    <h2>{country.createdAt.substring(0, 10)}</h2>
                                </div>
                                <div className="col-lg-2 d-flex align-items-center">
                                    <i className={`fa-solid fa-toggle-${country.status == 0 ? "on" : "off"}`} onClick={() => handleToggleCountry(country._id)} />
                                    <p className="mb-0">{country.status == 0 ? "Active" : "Inactive"}</p>
                                </div>
                                <div className="col-lg-1 d-flex align-items-center justify-content-between">
                                    <i className="fa-solid fa-pen" onClick={() => handleEditCountryModal(country)} />
                                    <i className="fa-solid fa-trash-can" onClick={() => handleDeleteCountry(country._id)} />
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>

            {/* add country modal */}
            <Modal isOpen={addCountryModal} onRequestClose={() => setAddCountryModal(false)} id="add-country">
                <i className="fa-solid fa-circle-xmark" onClick={() => setAddCountryModal(false)} />
                <h1>Add Country</h1>
                <label htmlFor="name">Country Name</label>
                <input type="text" id="name" placeholder="Country Name" onChange={(e) => setCountry(e.target.value)} />
                <label htmlFor="ABBV">Name Abbreviation</label>
                <input type="text" id="ABBV" placeholder="ABBV" onChange={(e) => setCountryAbb(e.target.value)} />
                {/* country upload */}
                <input type="file" id='flag' hidden onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="flag" id='file'>Upload Country Flag/Icon</label>
                <p>Upload JPG or PNG File only</p>
                <label htmlFor="name">Political Category</label>
                {form.map((item, index) => {
                    return (
                        <div className="row category align-items-center" key={index} >
                            <div className="col-lg-11">
                                <div className="row align-items-center">
                                    <div className="col-lg-11">
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Category"
                                            value={item.category}
                                            onChange={(e) => handleCategoryInput(index, e)} />
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fa-solid fa-trash-can" onClick={() => handleRemoveCategory(index)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-1">
                                <i className="fa-solid fa-circle-plus" onClick={() => handleAddCategoory(index)} />
                            </div>
                            <h6 onClick={() => handleAddSubCategory(index)}>+ Add Sub field</h6>
                            <div className="col-12" key={index}>
                                <div className="subs">
                                    {item.subCategory.map((sub, index) => {
                                        return (
                                            <div className="row category align-items-center" key={index}>
                                                <div className="col-lg-11">
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-11">
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                placeholder="Sub-Category"
                                                                value={item.subCategory[index]}
                                                                onChange={(e) => handleSubInput(e, item, index, form.indexOf(item))}
                                                            />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            <i className="fa-solid fa-trash-can" onClick={() => handleRemoveSub(index, form.indexOf(item))} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-1">
                                                    <i className="fa-solid fa-circle-plus" />
                                                </div> */}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <p>{error}</p>
                <button id='submit' onClick={handleCreateCountry}>{loading ? "loading..." : "Add Country"}</button>
                {/* {JSON.stringify(form)} */}
            </Modal>

            {/* edit country modal */}
            <Modal isOpen={editCountryModal} onRequestClose={() => setEditCountryModal(false)} id="add-country">
                <i className="fa-solid fa-circle-xmark" onClick={() => setEditCountryModal(false)} />
                <h1>Edit Country</h1>
                <label htmlFor="name">Country Name</label>
                <input type="text" id="name" placeholder="Country Name" value={country} onChange={(e) => setCountry(e.target.value)} />
                <label htmlFor="ABBV">Name Abbreviation</label>
                <input type="text" id="ABBV" placeholder="ABBV" value={countryAbb} onChange={(e) => setCountryAbb(e.target.value)} />
                {/* country upload */}
                <input type="file" id='flag' hidden onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="flag" id='file'>Upload Country Flag/Icon</label>
                <p>Upload JPG or PNG File only</p>
                <label htmlFor="name">Political Category</label>
                {editCountryCategory.map((item, index) => {
                    return (
                        <div className="row category align-items-center" key={index} >
                            <div className="col-lg-11">
                                <div className="row align-items-center">
                                    <div className="col-lg-11">
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Category"
                                            value={item.category}
                                            onChange={(e) => handleEditCategoryInput(index, e)} />
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fa-solid fa-trash-can" onClick={() => handleEditRemoveCategory(index)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-1">
                                <i className="fa-solid fa-circle-plus" onClick={() => handleEditAddCategoory(index)} />
                            </div>
                            <h6 onClick={() => handleEditAddSubCategory(index)}>+ Add Sub field</h6>
                            <div className="col-12" key={index}>
                                <div className="subs">
                                    {item.subCategory.map((sub, index) => {
                                        return (
                                            <div className="row category align-items-center" key={index}>
                                                <div className="col-lg-11">
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-11">
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                placeholder="Sub-Category"
                                                                value={item.subCategory[index]}
                                                                onChange={(e) => handleEditSubInput(e, item, index, editCountryCategory.indexOf(item))}
                                                            />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            <i className="fa-solid fa-trash-can" onClick={() => handleEditRemoveSub(index, editCountryCategory.indexOf(item))} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <p>{error}</p>
                <button id='submit' onClick={updateCountry}>{loading ? "loading..." : `Update ${country}`}</button>
                {/* {JSON.stringify(editCountryCategory)} */}
            </Modal>
        </div>
    )
}

export default Countries