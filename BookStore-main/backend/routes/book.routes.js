const express = require("express");
const { getAllBooks,
     getBookById,
     addToPurchasedList,
     getPurchasedList, 
getSimilarBooks,
removeFromPurchasedList,
getbookcat
}
      = require("../controler/books.controler");

const authenticate = require("../middlewares/authMiddleware");
const router = express.Router()


router.route("/getAllBooks")
                .get( authenticate, getAllBooks )

router.route("/getAllBooks/:bookId")
                .get( authenticate , getBookById )



router.route( "/PurchasedList" )
                .patch( authenticate , addToPurchasedList )
                .get( authenticate , getPurchasedList )

router.route( "/GetBooksByCat/" )
                .post( authenticate , addToPurchasedList )
                .get( authenticate , getPurchasedList )
                
router.get('/similar/:category', getSimilarBooks);
router.patch('/PurchasedList/remove/:bookId', authenticate, removeFromPurchasedList);
router.get( "/GetBooksByCat/:category",authenticate,getbookcat )
module.exports = router