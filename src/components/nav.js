import React, { useContext } from "react";
import { DataContext } from "../dataContext";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    // context 
    const { context, setContext } = useContext(DataContext)

    // history 
    const navigate = useNavigate()

    const logOut = () => {
        setContext({ ...context, user: {} });
        localStorage.removeItem('admin_token')
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to='/overview' className="navbar-brand">
                <img
                    src={require("../images/Logo.png").default}
                    alt="logo"
                />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span />
                <span />
                <span />
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link to='/overview' className="nav-link">Overview</Link></li>
                    <li className="nav-item"><Link to='/polls' className="nav-link">Polls</Link></li>
                    {/* <li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li> */}
                    <li className="nav-item"><Link to="" className="nav-link">Courses</Link></li>
                    <li className="nav-item"><Link to="" className="nav-link">Payment</Link></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Directory</a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li className="dropdown-item"><Link to="/parties">Political Parties</Link></li>
                            <li className="dropdown-item"><Link to="/countries">Countries</Link></li>
                            <li className="dropdown-item"><Link to="/aspirants">Aspirants</Link></li>
                            {/* <li>
                                <a className="dropdown-item" href="#"><img src="img/Group.png" alt="" />Political
                                    Parties</a>
                            </li> */}
                            {/* <li>
                                <Link to="/aspirants" className="dropdown-item"><img src="img/ic_twotone-timeline.png" alt="" />Politian’s Profile</Link>
                            </li> */}
                        </ul>
                    </li>
                    <li className="nav-item"><button onClick={logOut}>Log Out</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;