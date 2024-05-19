import React from 'react';
import logo from '../photos/logo.jpeg';

const Navigation = () => {
    return (
        <>
            <div className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/"><img src={logo}/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/services">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/contact">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navigation;