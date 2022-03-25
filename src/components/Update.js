import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../Api";
import { useHistory } from "react-router-dom";


const Update = () => {
    
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState([]);

    let history = useHistory();
    let { bookId } = useParams();

    let [book, setBook] = useState({});  

    

    useEffect(() => {
        
        getBookById(bookId);
    }, [title,author,genre,year])
    


    let valid = () => {
        setErrors([]);
        if (book.title === "") {
            setErrors(prev => (
               [...prev,"Title is required"] 
            ));
        }    


        const regex = /\d*/g;
        
        if (regex.test(book.year) == false) {
            setErrors(prev => (
                [...prev,"You cant enter only number"]
            ))
        }

    }

    let getBookById =async (bookId) => {
        let api = new Api();
        try {
            let data = await api.getBookById(bookId);
            setBook(data);        
        } catch (e) {
            throw new Error(e);
        }
    }

    let handleUpdClick = () => {
        let rtx = "";
        if (errors.length == 0) {
            
        } else {
            errors.forEach(e => {
                rtx += e + "\n";
            });
        }
        alert(rtx);
    }

    let handleCancelClick = () => {
        history.push("/");
    }


    let handleChange = (e) => {
        let obj = e.target;  
        if (obj.id === "title") {
            setTitle(obj.value);
        }
        if (obj.id === "author") {
            setAuthor(obj.value);
        }

        if (obj.id === "genre") {
            setGenre(obj.value);
        }
        if (obj.id === "year") {
            setYear(obj.value);
        }

        valid();

    }


    return( 
        <form  id="frmupdbook" onChange={handleChange}>

        <h1>Update Book</h1>
        <div id="err"></div>
        <div class="divupdb">
            <label for="title">Title</label>
                <input type="text" name="title" value={book.title}/>

        </div>
        <div class="divupdb">
            <label for="auth">Author</label>
                <input type="text" name="auth" id="auth" value={book.author}/>

        </div>
        <div class="divupdb">
            <label for="gen">Genre</label>
            <input type="text" name="gen" id="gen" value={book.genre}/>

        </div>

        <div class="divupdb">
            <label for="year">Year</label>
            <input type="text" name="year" id="year" value={book.year}/>

        </div>
        <button id="btn_updb_submit" onClick={handleUpdClick}>Update Book</button>
        <button id="btn_updb_del">Delete Book</button>
        <button id="btn_updb_cancel" onClick={handleCancelClick}>Cancel</button>
    </form>
      )
}

export default Update;