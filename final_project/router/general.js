const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'Both username and password are required.' });
  }

  
  if (users.find((user) => user.username === req.body.username)) {
    return res.status(409).json({ error: 'Username already exists.' });
  }
  
  if (req.body.username){
    users[req.body.username] = {
        "passwords":req.body.password,
        
        }
    }
    res.send("The user" + (' ')+ (req.body.username) + " Has been added!");
    

});


public_users.get('/',function (req, res) {
  
  res.send(JSON.stringify(books,null,4));
  
});


public_users.get('/isbn/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  
 });
  

public_users.get('/author/:author',function (req, res) {
  
  const author = req.params.author;
  
    const filteredBooks = Object.values(books).filter(book => book.author === author);
    
    res.send(filteredBooks);
  
});


public_users.get('/title/:title',function (req, res) {
  
  const title = req.params.title;
  const filteredTitles = Object.values(books).filter(book => book.title === title);
  res.send(filteredTitles);
  
});


public_users.get('/review/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
  
});

public_users.get('/task10-books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Task 10 completed"));

  });

public_users.get('/task11-books/:isbn',function (req, res) {
    const get_book_details = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    
        if (req.params.isbn <= 10) {
        resolve(res.send(books[isbn]));
    }
        else {
            reject(res.send('ISBN was not found'));
        }
    });
    get_book_details.
        then(function(){
            console.log("Task 11 completed");
   }).
        catch(function () { 
                console.log('ISBN was not found');
  });

});

public_users.get('/task12-books/:author',function (req, res) {

    const book_author_details = new Promise((resolve, reject) => {

    let authorbooks = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        authorbooks.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({authorbooks}, null, 4)));
      }


    });
    reject(res.send("The author is invalid "))
        
    });

    book_author_details.then(function(){
            console.log("Task 12 completed");
   }).catch(function () { 
                console.log('The author is invalid');
  });

  });

public_users.get('/task13-books/:title',function (req, res) {

    const book_title_details = new Promise((resolve, reject) => {

    let titlebooks = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        titlebooks.push({"isbn":isbn,
                            "author":books[isbn]["aauthor"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({titlebooks}, null, 4)));
      }


    });
    reject(res.send("The title is invalid "))
        
    });

    book_title_details.then(function(){
            console.log("Task 13 completed");
   }).catch(function () { 
                console.log('The title is invalid');
  });

  });

module.exports.general = public_users;
