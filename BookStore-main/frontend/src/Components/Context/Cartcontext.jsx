import axios from "axios";
import React, { createContext,  useState } from "react";
import toast from "react-hot-toast";

export const cartcontext = createContext();

export default function Cartcontext({ children }) {
  const [message, setMessage] = useState(null);

  async function Addtocart(bookId, token) {
    return await axios
      .post(
        "https://book-store-back-end-d-mohamedmostafa427s-projects.vercel.app/books/PurchasedList",
        {
          bookId: bookId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
       
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async function getallcart(token) {
    return await axios
      .get(
        "https://book-store-back-end-d-mohamedmostafa427s-projects.vercel.app/books/PurchasedList/",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        return true;
      })
      .catch((err) => {
        console.log("error", err);
        return false;
      });
  }

  return (
    <cartcontext.Provider value={{ Addtocart, getallcart }}>
      {children}
    </cartcontext.Provider>
  );
}
