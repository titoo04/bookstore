const express = require("express");
const { getAllBooks,
     getBookById,
     addToPurchasedList,
     getPurchasedList, 
     getbookcat,
getSimilarBooks}
      = require("../controler/books.controler");

const authenticate = require("../middlewares/authMiddleware");
const router = express.Router()


router.route("/getAllBooks")
                .get( authenticate, getAllBooks )

router.route("/getBooksByCat/")
                .get( authenticate, getbookcat )

router.route("/getAllBooks/:bookId")
                .get( authenticate , getBookById )



router.route( "/PurchasedList" )
                .patch( authenticate , addToPurchasedList )
                .get( authenticate , getPurchasedList )

router.route( "/GetBooksByCat/" )
                .post( authenticate , addToPurchasedList )
                .get( authenticate , getPurchasedList )
                
router.get('/similar', getSimilarBooks);
  

module.exports = router