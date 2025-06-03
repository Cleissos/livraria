import { useState, useRef, useEffect } from "react";
import './index.css';
import api from "../../services/api";

const Card = () => {
    const [books, setBooks] = useState([]);
    const titleRef = useRef();
    const authorRef = useRef();
    const yearRef = useRef();
    const imageRef = useRef();

    async function getBook() {
        try {
            const apiFromBook = api.get('/api/books');

            setBooks((await apiFromBook).data);
        } catch (error) {
            alert(error)
        }
    }

    async function createBook() {
       try {
        await api.post('/api/books', {
            title: titleRef.current.value,
            author: authorRef.current.value,
            year: Number(yearRef.current.value),
            imageUrl: imageRef.current.value
        })
        getBook()
        clear()
       } catch (error) {
        alert(error);
       }
    }

    async function deleteBook(id) {
        try {
            await api.delete(`/api/books/${id}`)
        } catch (error) {
            alert(error)
        }
        getBook()
    }

    useEffect(() => {
        getBook()
    },[])

    function clear() {
        titleRef.current.value = "";
        authorRef.current.value = "";
        yearRef.current.value = "";
        imageRef.current.value = "";
    }

   return(
    <div className="container">
        <header className="header">
            <header className="logo">
                <img src="src/assets/logo2.png" alt="" />
            </header>
            <nav className="navbar">
                <a href="#"className="nave-link">Biografia</a>
                <a href="#"className="nave-link">+55(92)988475862</a>
                <a href="#"className="nave-link">Avaliações</a>
                <a href="#"className="nave-link">Login</a>
            </nav>
        </header>

        <main className="main">
            <div className="main-form">
                <form>
                    <h1>Cadastrar filmes</h1>
                    <input type="text" placeholder="Title:" ref={titleRef} />
                    <input type="text" placeholder="Author:" ref={authorRef} />
                    <input type="number" placeholder="Year:" ref={yearRef}/>
                    <input type="text" placeholder="Image" ref={imageRef} />
                    <button type="button" onClick={createBook}>Postar</button>
                </form>
            </div>
            <div className="card">
                {
                    books.map(book => (
                        <div key={book.id} className="content">
                                <p>Title: <span>{book.title}</span></p>
                                <p>Author: <span>{book.author}</span></p>
                                <p>Year: <span>{book.year}</span></p>
                                <img className="btn-imageUrl" src={book.imageUrl} alt="imagem do filme" />
                                <button className="btn-delete" type="button" onClick={() =>deleteBook(book.id)}><img src="src/assets/delete1.png" alt="" /></button>
                        </div>
                    ))
                }
            </div>
        </main>
    </div>
   )
}

export default Card