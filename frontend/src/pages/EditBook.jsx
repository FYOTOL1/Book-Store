/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((rej) => {
        setLoading(false);
        alert("An Error Happened.Please Check console");
        console.log(rej.message);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .patch(`/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Updated Successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((rej) => {
        setLoading(false);
        enqueueSnackbar("An Error Occurred. Please Check console", {
          variant: "error",
        });
        console.log(rej.message);
      });
  };

  return (
    <>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Title</label>
              <input
                className="border-2 border-gray-500 px-4 py-2 w-full"
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Author</label>
              <input
                className="border-2 border-gray-500 px-4 py-2 w-full"
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                value={author}
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Publish Year</label>
              <input
                className="border-2 border-gray-500 px-4 py-2 w-full"
                onChange={(e) => setPublishYear(e.target.value)}
                type="number"
                value={publishYear}
              />
            </div>
            <button
              className="p-2 bg-sky-300 m-8 rounded-sm"
              onClick={handleEditBook}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditBook;
