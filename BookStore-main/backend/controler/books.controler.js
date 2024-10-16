const booksModel = require('../models/books.model');
const Book = require('../models/books.model');
const User = require('../models/user.model');


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ status: "Success" , data: books });
    } catch (error) {
        console.error("Error getting books:", error.message);
        res.status(500).json({  status: "Erorr" , message: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params; 
        

        const book = await Book.findOne({ bookId });

        if (!book) {
            return res.status(404).json({  status: "Erorr" , message: "Book not found" });
        }

        res.status(200).json({status: "Success" , data: book}); 
    } catch (error) {
        console.error("Error getting the book:", error.message);
        res.status(500).json({ status: "Erorr" , message: "Server error" });
    }
};
const getbookcat = async (req, res) => {
    try {
        const { cat } = req.body; 
        console.log("Category:", cat);

        const books = await booksModel.find({ genres: { $regex: cat, $options: 'i' } });

        console.log("Books found:", books.length);


        res.json({ status: "Success", data: books });
    } catch (error) {
        console.error("Error fetching books by category:", error.message);


        res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching books. Please try again later."
        });
    }
};

 const addToPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const { Book_Id } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        if (user.purchasedBooks.includes(Book_Id)) {
            return res.status(400).json({ status: "Error", message: "Book already in wishlist" });
        }

        // Find the book using the correct Book_Id
        const book = await booksModel.findOne({ _id: Book_Id });
        if (!book) {
            return res.status(404).json({ status: "Error", message: "Book not found" });
        }

        // Add the book to the user's purchasedBooks array
        user.purchasedBooks.push(book);
        await user.save();

        return res.status(200).json({
            status: "Success",
            message: "Book added to purchased Books successfully",
            purchasedBooks: user.purchasedBooks
        });
    } catch (error) {
        console.error("Error adding to wishlist:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};

    

const getPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }
        console.log(user.purchasedBooks)
        return res.status(200).json({ status: "Success" , data: user.purchasedBooks });
    } catch (error) {
        console.error("Error getting purchased list:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};
const getSimilarBooks = async (req, res) => {
    try {
      // Get the book ID and genre from query parameters
      const { id, genre } = req.query;
  //console.log(genre);
      // Validate input
      if (!id || !genre) {
        return res.status(400).json({ message: 'Book ID or genre not provided' });
      }
  
      // Find other books in the same genre, excluding the selected book itself
      const similarBooks = await Book.find({
        genres: { $elemMatch: { $eq: genre } }, // Check if the genres array contains the given genre
        _id: { $ne: id },         // Exclude the current book by its ID
      })
        .sort({ average_rating: -1 }) // Sort by highest average rating
        .limit(10); // Limit to the top 10 similar books
      
      console.log(similarBooks)
      res.json({ data: similarBooks });
    } catch (err) {
      console.error("Error retrieving similar books:", err);
      res.status(500).json({ message: 'Error retrieving similar books', error: err.message });
    }
  };
  
  




module.exports = {
    getAllBooks,
    getBookById,
    addToPurchasedList,
    getPurchasedList,
    getbookcat,
    getSimilarBooks
};
