import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import { GoColumns } from "react-icons/go";
import { FiCreditCard } from "react-icons/fi";
import Spinner from "../components/Spinner";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ShowType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5302/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((rej) => {
        console.log(rej.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Books List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        <div className="flex items-center gap-2 ms-auto w-fit mt-4 mb-2">
          <button onClick={() => setShowType("table")}>
            <GoColumns className="text-2xl" />
          </button>
          <button onClick={() => setShowType("card")}>
            <FiCreditCard className="text-2xl" />
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : ShowType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </>
  );
};

export default Home;
