import { useContext, useEffect, useState } from "react";
import book from "../../../public/images/download.jpeg";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { TokenAuthContext } from "../Context/Tokencontext";
import toast from "react-hot-toast";
export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token, id, setId } = useContext(TokenAuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  async function carthandler(bookId, token) {
    try {
      const res = await axios.patch(
        "http://localhost:3001/books/PurchasedList",
        { Book_Id: bookId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (res.data.status === "Success") {
        toast.success("Book added to cart successfully");
        console.log("Book added to cart successfully");
        navigate(`/Cart`)
      } else {
        toast.error(res.data.message || "Error adding to cart");
        console.log("Error:", res.data.message);
      }
    } catch (error) {
      toast.error("Server error while adding to cart");
      console.error("Error adding to cart:", error);
    }
  }
  

  async function getAllProducts() {
    await axios
      .get(
        "http://localhost:3001/books/getAllBooks",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function productHandler(idd) {
    
    navigate(`/productDetails/${idd}`);

    setId(idd); 
    // console.log("idd", idd);
    // console.log("id", id);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="mt-12 flex gap-5 ">
        {
         <div className="w-1/4 bg-600     ">
          <div className=" w-full  sticky top-20 mb-6">
            <div className="flex w-3/4   m-auto flex-col">
              <div className="border-b-2 mb-3">
                <p className="text-lg m-3"> Filter by</p>
              </div>

              <div className=" mb-3">
                <div>
                  <div className="flex justify-start items-start ">
                    <button
                      className="   ms-3 text-lg flex items-center justify-between w-full    "
                      onClick={toggleDropdown}
                    >
                      {selectedCategory ? selectedCategory : "Category"}

                      {isDropdownOpen ? (
                        <i className="fa-solid fa-caret-up"></i>
                      ) : (
                        <i className="fa-solid fa-caret-down"></i>
                      )}
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className=" w-full  rounded-md mt-2 m-3 text-lg">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div> }
        <div className=" flex flex-wrap gap-6 justify-center w-full ">
          {data == null ? (
            <Loading />
          ) : (
            data?.map((book) => (
              <>
                <div
                  key={book._id}
                  className="w-full sm:w-1/2 md:w-1/4 overflow-hidden group my-6 bg-transparent   shadow-2xl rounded-xl hover:scale-110  transition-transform duration-300"
                >
                  <div className=" relative overflow-hidden group">
                    <img
                      className="w-full h-60 object-cover"
                      src={book.coverImg}
                      alt={book.title}
                    />
                    <div
                    
                      onClick={() => {
                        productHandler(book.bookId);
                      }}
                      className=" bg-gray-400 w-full py-4 absolute text-xl opacity-0  group-hover:opacity-90  bottom-0 text-center text-white -translate-y-[-100%] cursor-pointer group-hover:translate-y-0 transition-all duration-500 "
                    >
                      Quick View
                    </div>

                    <div className="absolute top-3 right-2  flex flex-col text-xl  items-center justify-between gap-4">
                      <div
                        onClick={() => {
                          carthandler(book._id, token);
                        }}
                      >
                        <i className="fa-solid fa-cart-plus hover:text-orange-900 cursor-pointer rounded-full bg-white p-2 mb-5 hover:scale-110   transition-transform duration-300"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-2">{book.title}</p>
                  <div className="flex items-center justify-center mt-3">
                    <p className="border-b-2 border-transparent w-1/6"></p>
                  </div>

                  <div className="   py-3 text-2xl  flex items-center justify-between container m-auto   ">
                    <p className="text-center m-3  text-gray-400   text-2xl">
                      {book.price ? `${book.price} €` : "FREE"}
                      {/* <br /> */}
                    </p>

                    <div className=" gap-1  flex items-center justify-center ">
                      {book.rating}
                      <i className="fa-solid fa-star text-yellow-300"></i>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}
