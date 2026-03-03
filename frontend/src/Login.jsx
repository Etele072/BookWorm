import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Login({ setLoggedin, darkMode }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (res.ok) {
                setLoggedin(true);
                navigate("/Home");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Hiba:", err);
        }
    };

    return (
        <div style={{ backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1", color: darkMode ? "white" : "black", minHeight: "100vh", display: "flex", alignItems: "center", transition: "all 0.3s ease"}}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card 
                            className="border-0 shadow-sm rounded-4" 
                            style={{ backgroundColor: "#f4f3e6", border: "2px solid #5b9b42 !important" }}
                        >
                            <Card.Body className="p-4">
                                <h2 className="text-center mb-4 fw-bold" style={{ color: "#2b4c1e" }}>Bejelentkezés</h2>
                                
                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ color: "#2b4c1e", fontWeight: "600" }}>Felhasználónév</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Felhasználónév" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)}
                                            style={{ border: "1px solid #5b9b42" }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ color: "#2b4c1e", fontWeight: "600" }}>Jelszó</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Jelszó" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ border: "1px solid #5b9b42" }}
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        type="submit" 
                                        className="w-100 fw-bold border-0 py-2 shadow-sm"
                                        style={{ backgroundColor: "#5b9b42" }}
                                    >
                                        Belépés
                                    </Button>
                                </Form>
                                
                                <div className="text-center mt-3 small" style={{ color: "#5b9b42" }}>
                                    Még nincs fiókod? <a href="/Register" style={{ color: "#2b4c1e", fontWeight: "bold", textDecoration: "none" }}>Regisztrálj itt</a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;