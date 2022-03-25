import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../Api";
import { useHistory } from "react-router-dom";


const Update = () => {
    
  
    let { bookId } = useParams();

    let [book, setBook] = useState({});  
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState([]);

    let history = useHistory();
    

    useEffect(() => {
        
        getBookById(bookId);
        
    }, [])
    


    let valid = () => {
        setErrors([]);
        if (title === "") {
            
            setErrors(prev =>(
                 
                [
                    ...prev,
                    "Title is required"
                ])
            )
        }

        const regex = /\d*/g;
        console.log("test " + regex.test(year));
        if (regex.test(year)==false) {
            setErrors(prev => (
                [
                    ...prev,
                    "Year must be number"
                ]
            ))
        } 
        

        
    }

   let  updateBook = async () => {
        let b = {};
        let api = new Api();
        b.id = bookId;
        b.title = title;
        b.author = author;
        b.genre = genre;
        b.year = year;
       console.log(b);
       // await api.updBook(b);

    }

    let getBookById =async (bookId) => {
        let api = new Api();
        try {
            let data = await api.getBookById(bookId);
 
        } catch (e) {
            throw new Error(e);
        }
    }

    let handleUpdClick = async () => {
        let rtx = "";

        if (errors.length == 0) {
            await updateBook();
            history.push("/");
        } else {
            errors.forEach(e => {
                rtx += e + "\n";
            });
            alert(rtx);
        }
        
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
        
    }


    return( 
        <form  id="frmupdbook" onChange={handleChange}>

        <h1>Update Book</h1>
        <div id="err"></div>
        <div className="divupdb">
            <label>Title</label>
                <input type="text" name="title" id="title" defaultValue={book.title}/>

        </div>
        <div className="divupdb">
            <label>Author</label>
                <input type="text" name="auth" id="auth" defaultValue={book.author}/>

        </div>
        <div className="divupdb">
            <label>Genre</label>
            <input type="text" name="gen" id="gen" defaultValue={book.genre}/>

        </div>

        <div className="divupdb">
            <label>Year</label>
            <input type="text" name="year" id="year" defaultValue={book.year}/>

        </div>
        <button id="btn_updb_submit" onClick={handleUpdClick}>Update Book</button>
        <button id="btn_updb_del">Delete Book</button>
        <button id="btn_updb_cancel" onClick={handleCancelClick}>Cancel</button>
    </form>
      )
}

export default Update;