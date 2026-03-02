import React, { useState, useEffect } from "react";

function Home() {
    const [books, setBooks] = useState([]);
    const [maiNap, setMaiNap] = useState("");
    const [selectedBook, setSelectBook] = useState(null);

    useEffect(() => {
        const da = new Date();
        const ev = da.getFullYear();
        const honap = String(da.getMonth() + 1).padStart(2, '0');
        const nap = String(da.getDate()).padStart(2, '0');
        const napNevek = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
        const napNev = napNevek[da.getDay()];

        setMaiNap(`${ev}. ${honap}. ${nap}. - ${napNev}`);

        const getBooks = async () => {
            try {
                const res = await fetch("https://localhost:3000/books");
                if (res.ok) {
                    const data = await res.json();
                    setBooks(data);
                }
            } catch (error) {
                console.log("Hiba a könyvek lekérésekor: ", error);
            }
        };

        getBooks();
    }, []);

    return (
        <>
            <div className="home-container">
                <h3 className="date-display">Mai nap: {maiNap}</h3>


                <div className="booklist">
                    {books.map((book) => (
                        <div key={books.id} className="bookcard" onClick={() => setSelectBook(book)}>

                            <div className="bookinfo">
                                <h2>{book.title}</h2>
                                <p><strong>Szerző: </strong> {book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {setSelectBook && (
                    <div className="modal-overlay" onClick={setSelectBook(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={() => setSelectBook(null)}>X</button>
                            <img
                                src={``}
                                alt={``}
                                className="modal-image"
                            />
                            <h2>{``}</h2>
                            <p><strong>Szerző: </strong> {``}</p>
                            <p><strong>Kiadás: </strong> {``}</p>
                            <p>{``}</p>
                        </div>
                    </div>
                )}

            </div>
        </>
    );

}

export default Home;