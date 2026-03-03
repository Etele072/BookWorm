import React, { useState, useEffect } from "react";
import { Container, Card, Badge } from "react-bootstrap";

function Orders({darkMode}) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:3000/my-orders", { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) { console.log(err); }
        };
        fetchOrders();
    }, []);

    return (
        <div style={{ backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1", color: darkMode ? "white" : "black", minHeight: "100vh", paddingTop: "40px", transition: "all 0.3s ease" }}>
            <Container>
                <h2 className="fw-bold mb-4" style={{ color: "#2b4c1e" }}>Rendeléseim</h2>
                {orders.length === 0 ? <p>Még nem rendeltél semmit.</p> : 
                orders.map(o => (
                    <Card key={o.id} className="mb-3 border-0 shadow-sm" style={{ backgroundColor: "#f4f3e6" }}>
                        <Card.Body className="d-flex justify-content-between">
                            <div>
                                <div className="fw-bold">Rendelés: #{o.id}</div>
                                <div className="small text-muted">{o.date}</div>
                            </div>
                            <div className="text-end">
                                <div className="fw-bold">{o.total} Ft</div>
                                <Badge bg="success">{o.status}</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
}

export default Orders;