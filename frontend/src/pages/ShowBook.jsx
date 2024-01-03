import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen' style={{ backgroundImage: 'url("https://i.pinimg.com/474x/f2/34/91/f2349137ee1d8fbace805b7a5ad804c8.jpg")' }}>
      <BackButton />
      <div className='p-4'>
        <h1 className='text-3xl my-4 text-white'>Show Book</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-yellow-800 rounded-xl w-[600px] p-4 mx-auto' style={{ backgroundImage: 'url("https://i.pinimg.com/564x/14/90/d0/1490d04079a99418fc4b78577f1cee2b.jpg")' }}>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Id</label>
            <span className='text-xl text-yellow-800'>{book._id}</span>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Title</label>
            <span className='text-xl text-yellow-800'>{book.title}</span>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Author</label>
            <span className='text-xl text-yellow-800'>{book.author}</span>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Publish Year</label>
            <span className='text-xl text-yellow-800'>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Create Time</label>
            <span className='text-xl text-yellow-800'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Last Update Time</label>
            <span className='text-xl text-yellow-800'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
