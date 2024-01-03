import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className=' min-h-screen' style={{ backgroundImage: 'url("https://i.pinimg.com/474x/be/ad/24/bead246909bed518b9ac8bdebc8dc084.jpg")' }}>
      <BackButton />
      <div className='p-4'>
        <h1 className='text-3xl my-4 text-white'>Delete Book</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-yellow-800 rounded-xl w-[600px] p-8 mx-auto' style={{ backgroundImage: 'url("https://i.pinimg.com/474x/34/9e/3b/349e3b03076a00e6de63cef447c814f5.jpg")' }}> 
          <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
          <button
            className='p-4 bg-yellow-900 text-white m-8 w-full'
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
