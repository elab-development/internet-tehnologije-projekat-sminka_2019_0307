import React, {useEffect, useState} from 'react';
import {Alert, Container, Row, Table} from "react-bootstrap";
import axiosInstance from "../axios-instance/axios-call";
import {Chart} from "react-google-charts";

const Admin = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        text: ""
    });
    const [users, setUsers] = useState([]);

    const ulogovaniKorisnik = JSON.parse(window.sessionStorage.getItem("user"));
    const isAdmin = ulogovaniKorisnik.role === "admin";

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axiosInstance.get("/grouped-data")
            .then(res => {
                console.log(res.data);
                let data = [["Service Type", "Count"]];
                res.data.data.forEach((service) => {
                    data.push([service.type_name, parseInt(service.total)]);
                });
                setChartData(data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

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
                                            }>Change Role</button>
                                        }</td>
                                    </tr>
                                )
                            })

                        }
                        </tbody>
                    </Table>
                </Row>

                <Row className="mt-3">
                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={
                            {
                                title: "Services per type",
                                is3D: true
                            }
                        }
                        width={"100%"}
                        height={"400px"}
                    />
                </Row>

            </Container>
        </>
    );
};

export default Admin;