import { useState, useRef, useEffect } from "react";
import './index.css';
import api from "../../services/api";
import logo from '../../assets/logo2.png';
import imgDelete from '../../assets/delete1.png'
import imgEdit from '../../assets/edit.png'

const Card = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    const titleRef = useRef();
    const authorRef = useRef();
    const yearRef = useRef();
    const imageRef = useRef();

    const editTitleRef = useRef();
    const editAuthorRef = useRef();
    const editYearRef = useRef();
    const editImageRef = useRef();

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

    async function updateBook() {
        try {
            await api.put(`/api/books/${editingBook.id}`, {
                title:editTitleRef.current.value,
                author: editAuthorRef.current.value,
                year: Number(editYearRef.current.value),
                imageUrl: editImageRef.current.value
            });
            setEditingBook(null);
            getBook()
        } catch (error) {
            alert(error);
        }
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

    function startEdit(book) {
        setEditingBook(book);
        setTimeout(() => {
            editTitleRef.current.value = book.title;
            editAuthorRef.current.value = book.author;
            editYearRef.current.value = book.year;
            editImageRef.current.value = book.imageUrl;
        },0);
    }

   return(
    <div className="container">
        <header className="header">
            <header className="logo">
                <img src={logo} alt="" />
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

            {
                editingBook && (
                    <div className="modal-backdrop">
                        <div className="edit-form">
                            <h2>Editar livro</h2>
                            <input type="text" placeholder="Title" ref={editTitleRef} />
                            <input type="text" placeholder="Author" ref={editAuthorRef} />
                            <input type="text" placeholder="Year" ref={editYearRef} />
                            <input type="text" placeholder="Image" ref={editImageRef} />
                            <button type="button" onClick={updateBook}>Atualizar</button>
                            <button type="button" onClick={() => setEditingBook(null)}>Cancelar</button>
                        </div>
                    </div>
                   
                )
            }
            <div className="card">
                {
                    books.map(book => (
                        <div key={book.id} className="content">
                                <p>Title: <span>{book.title}</span></p>
                                <p>Author: <span>{book.author}</span></p>
                                <p>Year: <span>{book.year}</span></p>
                                <img className="content-imageUrl" src={book.imageUrl} alt="imagem do filme" />
                                <div className="buttons">
                                    <button className="btn-delete" type="button" onClick={() =>deleteBook(book.id)}>
                                        <img src={imgDelete} alt="deletar" />
                                    </button>
                                    <button className="btn-edit" onClick={() => startEdit(book)}>
                                        <img src={imgEdit} alt="" />
                                    </button>
                                </div>
                                
                        </div>
                    ))
                }
            </div>
        </main>
    </div>
   )
}

export default Card