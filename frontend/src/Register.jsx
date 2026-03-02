import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Fade } from "react-bootstrap";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    // Állapotok a visszajelzéshez
    const [status, setStatus] = useState({ show: false, message: "", variant: "" });

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username, password, email })
            });

            if (res.ok) {
                setStatus({ show: true, message: "Sikeres regisztráció! Üdvözlünk!", variant: "success" });
                setUsername(""); setEmail(""); setPassword("");
            } else {
                setStatus({ show: true, message: "Hiba! Ez a felhasználónév vagy email már foglalt.", variant: "danger" });
            }
        } catch (error) {
            setStatus({ show: true, message: "Szerverhiba történt. Próbáld újra később!", variant: "danger" });
        }
    };

    // Automatikusan eltünteti az üzenetet 4 másodperc után
    useEffect(() => {
        if (status.show) {
            const timer = setTimeout(() => setStatus({ ...status, show: false }), 4000);
            return () => clearTimeout(timer);
        }
    }, [status.show]);

    return (
        <div style={{ 
            backgroundColor: "#e8e6d1", 
            minHeight: "100vh", 
            display: "flex", 
            alignItems: "center",
            paddingBottom: "10vh" // Ez tolja feljebb a kártyát a képernyőn
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        {/* Menőbb visszajelzés alert helyett */}
                        <div style={{ height: "60px" }}> 
                            <Fade in={status.show}>
                                <div>
                                    {status.show && (
                                        <Alert variant={status.variant} className="border-0 shadow-sm text-center">
                                            {status.message}
                                        </Alert>
                                    )}
                                </div>
                            </Fade>
                        </div>

                        <Card 
                            className="border-0 shadow rounded-4" 
                            style={{ backgroundColor: "#f4f3e6", border: "2px solid #5b9b42 !important" }}
                        >
                            <Card.Body className="p-4">
                                <h2 className="text-center mb-4 fw-bold" style={{ color: "#2b4c1e" }}>Regisztráció</h2>
                                
                                <Form onSubmit={handleRegister}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ color: "#2b4c1e", fontWeight: "600" }}>Felhasználónév</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Felhasználónév" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)}
                                            style={{ border: "1px solid #5b9b42", backgroundColor: "#fdfdfb" }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ color: "#2b4c1e", fontWeight: "600" }}>Email cím</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="pelda@email.com" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ border: "1px solid #5b9b42", backgroundColor: "#fdfdfb" }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ color: "#2b4c1e", fontWeight: "600" }}>Jelszó</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="••••••••" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ border: "1px solid #5b9b42", backgroundColor: "#fdfdfb" }}
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        type="submit" 
                                        className="w-100 fw-bold border-0 py-2 shadow-sm"
                                        style={{ backgroundColor: "#5b9b42", transition: "0.3s" }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = "#4a8a36"}
                                        onMouseOut={(e) => e.target.style.backgroundColor = "#5b9b42"}
                                    >
                                        Fiók létrehozása
                                    </Button>
                                </Form>
                                
                                <div className="text-center mt-3 small" style={{ color: "#5b9b42" }}>
                                    Már van fiókod? <a href="/Login" style={{ color: "#2b4c1e", fontWeight: "bold", textDecoration: "none" }}>Jelentkezz be</a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;