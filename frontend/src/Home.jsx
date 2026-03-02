import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";

function Home({ cart, setCart }) {
    const [books, setBooks] = useState([]);
    const [maiNap, setMaiNap] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [isHearted, setIsHearted] = useState(false);
    useEffect(() => {
        const da = new Date();
        const napNevek = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
        setMaiNap(`${da.getFullYear()}. ${String(da.getMonth() + 1).padStart(2, '0')}. ${String(da.getDate()).padStart(2, '0')}. - ${napNevek[da.getDay()]}`);

        const getBooks = async () => {
            try {
                const res = await fetch("http://localhost:3000/books");
                if (res.ok) {
                    const data = await res.json();
                    setBooks(data);
                }
            } catch (error) { console.log(error); }
        };
        getBooks();
    }, []);

    const addToCart = (book) => {
        if (!cart.find(item => item.id === book.id)) {
            setCart([...cart, book]);
        }
        setSelectedBook(null);
    };

    return (
        <div style={{ backgroundColor: "#e8e6d1", minHeight: "100vh" }}>
            <Container className="pt-4">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3" style={{ borderColor: "#5b9b42 !important" }}>
                    <h2 className="fw-bold m-0" style={{ color: "#2b4c1e" }}>Könyvválaszték</h2>
                    <span className="fw-bold" style={{ color: "#5b9b42" }}>{maiNap}</span>
                </div>

                <Row xs={1} md={3} className="g-4 pb-5">
                    {books.map((book) => (
                        <Col key={book.id}>
                            <Card 
                                className="h-100 border-0 shadow-sm rounded-3" 
                                style={{ backgroundColor: "#f4f3e6", cursor: 'pointer' }}
                                onClick={() => {
                                    setSelectedBook(book);
                                    setIsHearted(false);
                                }}
                            >
                                <div style={{ height: '350px', overflow: 'hidden' }}>
                                    <Card.Img variant="top" src={`/images/konyv${book.id}.png`} style={{ height: '100%', objectFit: 'cover' }} />
                                </div>
                                <Card.Body className="text-center">
                                    <Card.Title className="fw-bold" style={{ color: "#2b4c1e" }}>{book.title}</Card.Title>
                                    <Card.Text style={{ color: "#5b9b42" }}>{book.author}</Card.Text>
                                    <Button style={{ backgroundColor: "#5b9b42", border: "none" }} className="w-100">Részletek</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Modal show={selectedBook !== null} onHide={() => setSelectedBook(null)} centered size="lg">
                    <div style={{ backgroundColor: "#e8e6d1", borderRadius: "15px", border: "3px solid #5b9b42" }}>
                        {selectedBook && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title className="fw-bold">{selectedBook.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="p-4">
                                    <Row>
                                        <Col md={5} className="text-center">
                                            <img src={`/images/konyv${selectedBook.id}.png`} className="img-fluid rounded shadow" style={{ maxHeight: '350px' }} />
                                        </Col>
                                        <Col md={7}>
                                            <h4 style={{ color: "#5b9b42" }} className="fw-bold">{selectedBook.author}</h4>
                                            <p style={{ color: "#2b4c1e" }}>{selectedBook.description || "Kiváló olvasmány."}</p>
                                            <div className="d-flex gap-2 mt-4">
                                                <Button style={{ backgroundColor: "#5b9b42", border: "none", flex: 2 }} onClick={() => addToCart(selectedBook)}>Kosárba</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </>
                        )}
                    </div>
                </Modal>
            </Container>
        </div>
    );
}

export default Home;