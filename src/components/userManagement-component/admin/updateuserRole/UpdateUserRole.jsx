import { Form, Button, Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavBarGoGo from "../../../../components/navigatonBar/navbarGoGo";
import styles from "./styles.module.css";
import Swal from "sweetalert2";

const UpdateUserRole = () => {

    const options = ["User", "Delivery Admin", "Store Admind", "User Admin"];

    //state variables
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [mobileNumber, setMobileNumber] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [address, setAddress] = useState("");
    let [district, setDistrict] = useState("");
    let [zipCode, setZipCode] = useState("");
    let [image, setImage] = useState("");
    let [email, setEmail] = useState("");
    let [userRole, setUserRole] = useState(options[0]);

    // Dealing with field changes to update state
    const userRoleUpdate = (event) => {
        setUserRole(event.target.value)
    }
    

    const getUser = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem("loggeduser"));
            console.log("user id: ", user);
            const response = await axios.get('http://localhost:5050/user/' + user);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setMobileNumber(response.data.mobileNumber);
            setPhoneNumber(response.data.phoneNumber);
            setAddress(response.data.address);
            setDistrict(response.data.district);
            setZipCode(response.data.zipCode);
            setImage(response.data.image);
            setEmail(response.data.email);
            setUserRole(response.data.userRole);
        } catch (err) {
            //console.log(err);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const userDetails = {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            phoneNumber: phoneNumber,
            address: address,
            district: district,
            zipCode: zipCode,
            image: image,
            userRole: userRole
        }

        const user = JSON.parse(sessionStorage.getItem("loggeduser"));


        axios.post('http://localhost:5050/user/update-profile/' + user, userDetails)

            .then((res) => {

                Swal.fire({
                    title: "Success!",
                    text: res.data,
                    icon: "success",
                    showConfirmButton: false,
                })

                setTimeout(() => {
                    window.location = "/registered-members";
                }, 2000)
            })


    }

    const CancelButton = () => {
        window.location = "/registered-members";
    }

    return (

        <div>

            <NavBarGoGo />

            <div className={styles.profileUpdate_container}>
                <div className={styles.profileUpdate_form_container}>

                    <div className={styles.left}>
                        <img style={{ width: "220px", height: "220px" }} src={image} alt=""></img>
                        <h2 style={{ color: "white", textAlign: "center" }}> <br></br> {firstName} {lastName}</h2><br></br>
                    </div>

                    <div className={styles.right}>

                        <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>Update User Role</h1>

                        <Form onSubmit={handleSubmit}>
                            <Container>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>First Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your First Name'
                                            name='firstName'
                                            value={firstName}
                                            required
                                            className={styles.input}
                                            readOnly
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }}>Last Name    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='Your Last name'
                                            name='lastName'
                                            value={lastName}
                                            required
                                            className={styles.input}
                                            readOnly
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >Email    :</label><br></br>
                                        <input
                                            type="text"
                                            placeholder='00000'
                                            name='email'
                                            value={email}
                                            required
                                            className={styles.input}
                                            readOnly
                                        />
                                    </Col>
                                    <Col xs={9} md={6}>
                                        <label style={{ fontWeight: "bold" }} >User Role    :</label><br></br>
                                        <select
                                            className={styles.input}
                          
                                            name='userRole'
                                            value={userRole}
                                            onChange={userRoleUpdate}>
                                            
                                            {options.map((value) => (
                                                <option value={value} key={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </Col>
                                    
                                </Row>
                                
                                <table style={{ marginBottom: "50px", marginTop: "20px", marginLeft: "100px" }}>
                                    <tr>
                                        <td><button type='submit' style={{ marginBottom: "50px", marginTop: "35px" }} className={styles.g_button}>Update</button></td>
                                        <td><button onClick={CancelButton} type='button' style={{ marginBottom: "50px", marginTop: "35px" }} className={styles.can_btn}>Cancel</button></td>
                                    </tr>
                                </table>
                            </Container>
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserRole;
