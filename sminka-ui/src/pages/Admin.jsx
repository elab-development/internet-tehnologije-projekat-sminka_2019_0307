import React, {useEffect, useState} from 'react';
import {Alert, Container, Row, Table} from "react-bootstrap";
import axiosInstance from "../axios-instance/axios-call";

const Admin = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: ""
    });
    const [users, setUsers] = useState([]);

    const ulogovaniKorisnik = JSON.parse(window.sessionStorage.getItem("user"));
    const isAdmin = ulogovaniKorisnik.role === "admin";

    useEffect(() => {

        axiosInstance.get("/users")
            .then(res => {
                console.log(res.data);
                setUsers(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, [showMessage]);

    const promeniRolu = (id) => {
        axiosInstance.get("/change-role/" + id)
            .then(res => {
                console.log(res.data);
                setShowMessage(true);
                setMessage({
                    type: "success",
                    text: "Role changed successfully"
                });

            })
    }

    return (
        <>
            <Container>
                <Row>
                    <h1 className="text-center text-black-50 mt-3">Administration</h1>
                    {
                        showMessage && <>
                            <Alert key={message.type} variant={message.type}>
                                {message.text}
                            </Alert>
                        </>
                    }
                </Row>
                <Row>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users && users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{
                                            user.role === 'user' && isAdmin &&
                                            <button className="btn btn-dark" onClick={
                                                () => {
                                                    promeniRolu(user.id)
                                                }
                                            }>Promeni Rolu</button>
                                        }</td>
                                    </tr>
                                )
                            })

                        }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
};

export default Admin;