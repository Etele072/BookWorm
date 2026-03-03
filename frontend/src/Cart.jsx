import React from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

function Cart({ cart, setCart, darkMode }) {
    const total = cart.reduce((sum, item) => sum + (item.price  || 3500), 0);

    const handleOrder = async () => {
        if (cart.length === 0) return;
        try {
            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ items: cart, total: total })
            });
            if (res.ok) {
                alert("Sikeres rendelés!");
                setCart([]);
            }
        } catch (error) { console.log(error); }
    };

    return (
        <div style={{ backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1", color: darkMode ? "white" : "black", minHeight: "100vh", paddingTop: "40px", transition: "all 0.3s ease" }}>
            <Container>
                <Card className="border-0 shadow-sm p-4" style={{ backgroundColor: darkMode ? "#3a3939" : "#f4f3e6", color: darkMode ? "white" : "black" }}>
                    <h2 className="fw-bold mb-4" style={{ color: "#2b4c1e" }}>Kosár tartalma</h2>
                    {cart.length === 0 ? <p>A kosarad jelenleg üres.</p> : (
                        <>
                            <Table hover style={{color: "#2b4c1e" }}>
                                <thead><tr><th>Cím</th><th>Ár</th><th>Művelet</th></tr></thead>
                                <tbody>
                                    {cart.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.title}</td>
                                            <td>{item.price || 3500} Ft</td>
                                            <td><Button variant="outline-danger" size="sm" onClick={() => setCart(cart.filter(c => c.id !== item.id))}>X</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <h4 className="fw-bold">Összesen: {total} Ft</h4>
                                <Button style={{ backgroundColor: "#5b9b42", border: "none" }} size="lg" onClick={handleOrder}>Rendelés leadása</Button>
                            </div>
                        </>
                    )}
                </Card>
            </Container>
        </div>
    );
}

export default Cart;