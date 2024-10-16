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
        if (!book) {
            return res.status(404).json({  status: "Erorr" , message: "Book not found" });
        }

        res.status(200).json({status: "Success" , data: book}); 
    } catch (error) { const book = await Book.findOne({ bookId });

        console.error("Error getting the book:", error.message);
        res.status(500).json({ status: "Erorr" , message: "Server error" });
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
        const { category } = req.params; 
        console.log("Category:", category);

        // Find books by category, sort by rating, and limit to 5
        const books = await booksModel
            .find({ genres: { $regex: category, $options: 'i' } })
            .sort({ ratingsAverage: -1 }) // Assuming the rating field is named ratingsAverage
            .limit(5); // Limit the result to the top 5 books

        console.log("Books found:", books.length);

        // If no books are found, you can handle it as you see fit
        if (books.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No books found in this category."
            });
        }

        res.json({ status: "Success", data: books });
    } catch (error) {
        console.error("Error fetching books by category:", error.message);

        res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching books. Please try again later."
        });
    }
  };
  const removeFromPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const { bookId } = req.params; // Get the book ID from the request parameters
        console.log(req.params);

        // Ensure the bookId is valid
        if (!bookId) {
            return res.status(400).json({ status: "Error", message: "Book ID is required" });
        }

        // Find the user by their ID
        const user = await User.findById(userId);
        const book = await Book.findById(bookId); // Use findById instead of findOne

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        // Check if the book exists
        if (!book) {
            return res.status(404).json({ status: "Error", message: "Book not found" });
        }

        // Find the index of the book object in the purchasedBooks array
        const bookIndex = user.purchasedBooks.findIndex((purchasedBook) => purchasedBook._id.toString() ==bookId);
        // Check if the bookId is present in the purchasedBooks array
        if (bookIndex === -1) {
            return res.status(404).json({ status: "Error", message: "Book not found in purchased list" });
        }

        // Remove the book object from the purchasedBooks array using splice
        user.purchasedBooks.splice(bookIndex, 1);

        // Save the updated user document
        await user.save();

        // Return the updated purchasedBooks list
        return res.status(200).json({
            status: "Success",
            message: "Book removed from purchased list successfully",
            purchasedBooks: user.purchasedBooks,
        });
    } catch (error) {
        console.error("Error removing book from cart:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};



const getbookcat = async (req, res) => {
    try {
        const {category} = req.params; 
        console.log("Category:", category);

        const books = await booksModel.find({ genres: { $regex: category, $options: 'i' } });

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

  




module.exports = {
    getAllBooks,
    getBookById,
    addToPurchasedList,
    getPurchasedList,
    getSimilarBooks,
    removeFromPurchasedList,
    getbookcat
};
