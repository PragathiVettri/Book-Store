import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen' style={{ backgroundImage: 'url("https://i.pinimg.com/474x/f2/34/91/f2349137ee1d8fbace805b7a5ad804c8.jpg")' }}>
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4 text-white'>Create Book</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-yellow-800 rounded-xl w-[600px] p-4 mx-auto' style={{ backgroundImage: 'url("https://i.pinimg.com/564x/14/90/d0/1490d04079a99418fc4b78577f1cee2b.jpg")' }}>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-yellow-800 px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-yellow-800 px-4 py-2  w-full '
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-yellow-800'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-yellow-800 px-4 py-2  w-full '
            />
          </div>
          <button className='p-2 bg-yellow-900 text-white m-8' onClick={handleSaveBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;