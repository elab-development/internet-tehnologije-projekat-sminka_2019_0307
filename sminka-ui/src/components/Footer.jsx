import React from 'react';
import {FaFacebook} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {FaMapMarker, FaPhone, FaEnvelope} from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <div className="footer_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="location_text">
                                <ul>
                                    <li>
                                        <a href="#"><span className="padding_left_10"><FaMapMarker /></span>
                                        It is great to see beauty in people,<br/> we just make it easier
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="padding_left_10"><FaPhone /></span>
                                        065 32 32 234
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"><span className="padding_left_10"><FaEnvelope /></span>MSBeauty@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="newslatter_main">
                                <h1 className="useful_text">Follow Us</h1>
                                <div className="footer_social_icon">
                                    <ul>
                                        <li><a href="#"><FaFacebook /></a></li>
                                        <li><a href="#"><FaTwitter /></a></li>
                                        <li><a href="#"><FaLinkedin /></a></li>
                                        <li><a href="#"><FaInstagram /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright_section">
                <div className="container">
                    <p className="copyright_text">2024 All Rights Reserved. Design by Sanja and Milica</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;