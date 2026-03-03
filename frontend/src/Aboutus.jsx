import React from 'react';
import Logo from "./BookwormLogo.png";
import { Container, Row, Col, Card } from 'react-bootstrap';
import mayer from "./mayer.png";
import tedas from "./tedas.png";

function Aboutus({ darkMode }) {

    function korkiszam(ev, honap, nap) {
        const ma = new Date();
        const ideiEv = ma.getFullYear();
        const ideiHonap = ma.getMonth() + 1;
        const maiNap = ma.getDate();

        let kor = ideiEv - ev;

        if (ideiHonap < honap) {
            kor = kor - 1;
        } else if (ideiHonap === honap && maiNap < nap) {
            kor = kor - 1;
        }
        return kor;
    }

    const age1 = korkiszam(2007, 3, 13); 
    const age2 = korkiszam(2007, 1, 27);

    return (
        <div style={{ backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1", color: darkMode ? "white" : "black", minHeight: "100vh", paddingTop: "50px", transition: "all 0.3s ease" }}>
            <Container>
                <Card className="shadow" style={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", borderRadius: "15px", border: "none", padding: "20px", marginBottom: "40px" }}>
                    <Row>
                        <Col md={8}>
                            <h2 style={{ color: darkMode ? "#a4e58a" : "#2b4c1e", fontWeight: "bold" }}>A Bookworm Története</h2>
                            <br />
                            <p>A Könyvkölcsönző weboldala 2018-ban indult, elsősorban belső tesztelési célokra. A kezdeti verzió funkciói és megjelenése egy gyors prototípus keretében készültek, a véglegesítést egy későbbi fejlesztési fázisra ütemeztük.</p>
                            <p>2020-ban azonban a járványügyi helyzet miatt hirtelen megnőtt az igény az online kiszolgálás iránt, így döntöttünk úgy, hogy az oldalt élesítjük, hogy olvasóink otthonról is gond nélkül hozzáférhessenek állományunkhoz.</p>
                            <p>Az azóta eltelt időszakban a rendszer folyamatosan, stabilan üzemel. Bár a felület az eredeti prototípus jegyeit viseli magán, a funkciók megbízhatóságát és a kiszolgálás folyamatosságát helyeztük előtérbe. Célunk továbbra is egyszerű: hogy a könyvek eljussanak az olvasókhoz.</p>
                        </Col>
                        <Col md={4} className="d-flex justify-content-center align-items-center">
                            <img 
                                src={Logo} alt="Logo"
                                style={{ width: "100%", maxWidth: "250px", border: "3px solid black", borderRadius: "10px", backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1" }} 
                            />
                        </Col>
                    </Row>
                </Card>

                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card style={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", borderRadius: "30px", border: `3px solid ${darkMode ? "#a4e58a" : "#2b4c1e"}`, padding: "10px", marginBottom: "20px" }}>
                            <Row className="align-items-center">
                                <Col xs={4} className="text-center">
                                    
                                    <img src={tedas} alt="Tedás Etele Marcell" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "2px solid black", display: "inline-block", lineHeight: "55px", backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1" }}/>
                                </Col>
                                <Col xs={8}>
                                    <h4 style={{ margin: 0, fontWeight: "bold" }}>Tedás Etele Marcell</h4>
                                    <p style={{ margin: 0, color: darkMode ? "#a4e58a" : "#2b4c1e", fontWeight: "bold" }}>Életkor: {age1}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col md={5}>
                        <Card style={{ backgroundColor: darkMode ? "#424242" : "white", color: darkMode ? "white" : "black", borderRadius: "30px", border: `3px solid ${darkMode ? "#a4e58a" : "#2b4c1e"}`, padding: "10px", marginBottom: "20px" }}>
                            <Row className="align-items-center">
                                <Col xs={4} className="text-center">
                                    <img src={mayer} alt="Mayer Ádám" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "2px solid black", display: "inline-block", lineHeight: "55px", backgroundColor: darkMode ? "#2c2c2c" : "#e8e6d1" }}/>
                                </Col>
                                <Col xs={8}>
                                    <h4 style={{ margin: 0, fontWeight: "bold" }}>Mayer Ádám</h4>
                                    <p style={{ margin: 0, color: darkMode ? "#a4e58a" : "#2b4c1e", fontWeight: "bold" }}>Életkor: {age2}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    
                </Row>

            </Container>
        </div>
    );
}

export default Aboutus;