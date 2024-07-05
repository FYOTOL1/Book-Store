/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((rej) => {
        setLoading(false);
        enqueueSnackbar("Some Error Happened", { variant: "error" });
        console.log(rej.message);
      });
  };

  return (
    <>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Delete Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px p-8 mx-auto">
          <h3 className="text-2xl">
            Are You Sure You Want to Delete This Book?
          </h3>
          <button
            onClick={handleDeleteBook}
            className="p-4 bg-red-600 text-white m-8 w-full"
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBook;
