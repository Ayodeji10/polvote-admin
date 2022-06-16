import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../components/apiRoot";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreatePoll = () => {
    // navigate 
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

    const [countrySelected, setCountrySelected] = useState("")
    const [categorySelected, setCategorySelected] = useState("")
    const [subCategorySelected, setSubCategorySelected] = useState(null)
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [livevotedate, setLivevotedate] = useState("")

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

    // create poll 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const createPoll = (e) => {
        e.preventDefault()
        const data = {
            country: countrySelected,
            category: categorySelected,
            subCategory: subCategorySelected,
            polltitle: title,
            startdate: startDate,
            enddate: endDate,
            livevotedate: livevotedate
        };
        setLoading(true)
        setError("")
        axios({
            url: `${API.API_ROOT}/polls/addpoll `,
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: data
        }).then((response) => {
            setLoading(false)
            console.log(response)
            navigate('/polls')
            // window.location.reload();
        }, (error) => {
            setLoading(false)
            setError('Something went wrong, please try again')
            console.log(error)
        })
    }

    return (
        <div className="container">
            {/* nav  */}
            <Nav />
            {/* new poll  */}
            <div className="new-polls">
                <Link to="/polls"><p id="header"><i className="fas fa-angle-left" />Back</p></Link>
                <form action>
                    <h1>Add New Poll</h1>
                    {/* countries  */}
                    <div className="input">
                        <label htmlFor="country">Choose Country</label>
                        <select name="category" id="country" value={countrySelected} onChange={(e) => setCountrySelected(e.target.value)} >
                            <option value="">-- Select Country --</option>
                            {countries.map((each, index) => {
                                return (
                                    <option value={each.country} key={index}>{each.country}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* category  */}
                    <div className="input">
                        <label htmlFor="category">Choose Poll Category</label>
                        <select name="category" id="category" value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)} >
                            <option value="">-- Select Category --</option>
                            {countries.map((country) => {
                                if (country.country == countrySelected) {
                                    return country.category.map((cat, index) => {
                                        return (
                                            <option value={cat.category} key={index}>{cat.category}</option>
                                        )
                                    })
                                }
                            })}
                        </select>
                    </div>
                    {/* subCategory  */}
                    {countrySelected !== "" && categorySelected !== "" && countries.filter(country => country.country === countrySelected)[0].category.filter(cat => cat.category === categorySelected)[0].subCategory.length !== 0 &&
                        <div className="input">
                            <label htmlFor="sub">Choose Poll Subcategory</label>
                            <select name="category" id="sub" value={subCategorySelected} onChange={(e) => setSubCategorySelected(e.target.value)} >
                                <option value={null}>-- Select Category --</option>
                                {countries.filter(country => country.country === countrySelected)[0].category.filter(cat => cat.category === categorySelected)[0].subCategory.map((sub, index) => {
                                    return (
                                        <option value={sub} key={index}>{sub}</option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                    <div className="input">
                        <label htmlFor="title">Poll Title</label>
                        <input type="text" name="title" id="title" placeholder="Ex. Lagos State 2022 Presidential Poll" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input">
                                <label htmlFor="start">Start Date</label>
                                {/* <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    dateFormat='yyyy/MM/dd'
                                    minDate={new Date()}
                                    // maxDate={new Date()}
                                    // isClearable
                                    showYearDropdown
                                    showMonthDropdown
                                    placeholderText="DD/MM/YYYY"
                                /> */}
                                <input type="date" name="date" id="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input">
                                <label htmlFor="end">End Date</label>
                                {/* <DatePicker
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    dateFormat='yyyy/MM/dd'
                                    // minDate={context.newPoleForm.startDate}
                                    minDate={new Date()}
                                    // maxDate={new Date()}
                                    // isClearable
                                    showYearDropdown
                                    showMonthDropdown
                                    placeholderText="DD/MM/YYYY"
                                /> */}
                                <input type="date" name="date" id="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="input">
                        <label htmlFor="live">Change Live Start Date</label>
                        <input type="date" name="date" id="live" value={livevotedate} onChange={(e) => setLivevotedate(e.target.value)} />
                    </div>
                    <p>{error}</p>
                    <button onClick={(e) => createPoll(e)}>{loading ? "loading..." : "Proceed"}<i className="fas fa-angle-right" /></button>
                </form>
            </div>
        </div>
    );
};

export default CreatePoll;