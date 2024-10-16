import { useContext,useState, useEffect} from "react";
import img from "../../assets/logo.png";
import { TokenAuthContext } from "../Context/Tokencontext";
import axios from "axios";

export default function Cart() {
  const { token } = useContext(TokenAuthContext);
  const [cart, setCart] = useState([]); // Use useState for cart data

  async function getCart(token) {
    try {
      const response = await axios.get(
        "http://localhost:3001/books/PurchasedList",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCart(response.data.data); // Update the state with the fetched cart data
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }
  async function removeHandler(bookId) {
    try {
      const response = await axios.patch(`http://localhost:3001/books/PurchasedList/remove/${bookId}`, {}, {
        headers: {
          Authorization: token,
        },
      });
  
      // Update the cart state to reflect the changes after removal
      setCart((prevCart) => prevCart.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error removing book from cart:", error.message);
    }
  }
  
  useEffect(() => {
    getCart(token);
  }, [token]); // Run the effect when the token changes
  return (
    <>
      <div className="flex  my-12 gap-3 container m-auto ">
        <div className="   relative overflow-x-auto shadow-md sm:rounded-lg  w-2/3 ">
          {cart==null ? (
            <div className=" flex  flex-col text-5xl  items-center mt-24  ">
              <i className="fa-solid fa-cart-shopping"></i>
              <h1>Empty Cart</h1>
            </div>
          ) : (
            <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 container m-auto ">
              <thead className="text-xs text-gray-700 uppercase bg-main dark:text-gray-400 ">
                <tr className="bg-gray-100">
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr
                      key={product.BookId}
                      className="bg-gray-50  border-b "
                    >
                      <td className="p-4">
                        <img
                          src={product.coverImg}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="title"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-950">
                        {product.title} 
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              console.log("hbebe");

                              // updateHandler(
                              //   product.product._id,
                              //   product.count - 1
                              // );
                            }}
                            disabled
                            // ={product.count === 1}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full "
                            type="button"
                          >
                              <span className="sr-only">Decrease quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              id="first_product "
                              className="bg-gray-50 w-14 border rounded-3xl text-center border-gray-300 text-gray-900 text-sm block px-2.5 py-1"
                              defaultValue={1}
                              required
                            />
                          </div>
                          <button
                            onClick={() => {
                              // updateHandler(
                              //   product.product._id,
                              //   product.count + 1
                              // );
                              console.log("hbebe");
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full"
                            type="button"
                          >
                            <span className="sr-only">Increase quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-950">
                        {product.price+"$"}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => {
                             removeHandler(product._id);
                            console.log("HBEBE");
                          }}
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <br />

        <div className="w-1/3 sticky top-8  border-gray-400 h-[100%] border-solid border-2 p-3 rounded-xl">
          <h2 className="font-bold text-lg mb-3 text-emerald-950">
            Order Summary
          </h2>

          <form className="max-w-md mx-auto ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-950"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                disabled
                type="text"
                id="default-search"
                className="block w-full p-4 text-sm  rounded-lg bg-gray-100"
                placeholder="Coupon code"
                required
              />
              <button
                disabled
                type="submit"
                className=" absolute  text-gray-950 end-2.5 bottom-2.5 bg-main hover:bg-main focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-main"
              >
                Apply
              </button>
            </div>
          </form>

          <div className="group flex  items-center gap-2 mt-3">
            <i className="fa-solid fa-circle-exclamation text-red-600"></i>
            <p className="text-gray-600">
              Coupons are temporarily unavailable.
            </p>
          </div>

          <div className="flex justify-between container mt-3">
            <div>
              <p className="text-gray-400 ">
                {" "}
                subtotal (<span className="font-bold">
                  1
                </span>{" "}
                items)
              </p>
            </div>
            <div>
              <p className="text-gray-400 ">
                {" "}
                EGP
                <span className="font-bold">{}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between container my-3 ">
            <div>
              <p className="text-gray-400 "> Shipping Fee</p>
            </div>
            <div>
              <p className="text-emerald-600 font-bold ">FREE</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between container my-3">
            <div>
              <p className="text-emerald-950 font-bold text-lg">
                Total{" "}
                <span className="text-gray-400 text-sm">
                  (Inclusive of VAT)
                </span>
              </p>
            </div>

            <div>
              <p className="text-emerald-950 font-bold text-lg">EGP 1000
                {/* price */}
                </p>
            </div>
          </div>

          <button
            className="w-full bg-gray-800 rounded-lg p-3 mt-4 text-white hover:bg-gray-900 "
            type="button"
            onClick={
              () => {
                console.log("HBEBE");
              }
              // checkOutHandler
            }
            // disabled
            // ={price === 0}
          >
            Check Out
          </button>

          <button
            className="w-full bg-gray-800 rounded-lg p-3 mt-4 text-white hover:bg-gray-900 "
            type="button"
            onClick={() => {
              // clearHandler();
              console.log("hbebe");
            }}
          >
            Clear All Cart{" "}
          </button>
        </div>
      </div>
    </>
  );
}
