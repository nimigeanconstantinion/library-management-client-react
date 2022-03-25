class Api{
    api(path, method ='GET', body= null){
        let url = path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
    
            },
          
        };

        if(body !=null){
            options.body = JSON.stringify(body);
        }

        return fetch(url,options);

    }

    getBooks = async () => {


        try {
            let lista = await this.api("http://localhost:8080/api/v1/books");

            return lista.json();
            
        } catch (e) {
            
            throw new Error(e);
        }
    }
    
    getBookById = async (id) => {
        try{
            const response = await this.api(`http://localhost:8080/api/v1/books/book/${id}`,'GET');
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
        
    }
    addBook=async (book)=>{

        try{
            const response = await this.api(`http://localhost:8080/api/v1/books`,'POST', book);
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            console.log(e);

         }
    }

    async updBook(book){
    
        try{
            const response = await this.api(`http://localhost:8080/api/v1/books/${book.id}`,'PUT', book);
            
            if(response.status==200){
                return response.json();

            }else{

                return null;
            }

         }catch(e){

            throw new Error(e);
            

         }
    }

    async delBook(id) {
        try {
            const response = await this.api(`http://localhost:8080/api/v1/books/${id}`, 'DELETE');
            if (response.status == 200) {
                return response.json();
            }
        } catch (e) {
            throw new Error(e);
        }
    }
    
}

export { Api };