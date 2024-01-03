import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error happened. Please check console', { variant: 'error' });
        console.log(error);
      });
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className=' min-h-screen' style={{ backgroundImage: 'url("https://i.pinimg.com/474x/3c/01/00/3c0100eb36bc3197671fe728f857d7ac.jpg")' }}>
      <BackButton />
      <div className='p-4'>
        <h1 className='text-3xl my-4 text-white'>Edit Book</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-yellow-800 rounded-xl w-[600px] p-4 mx-auto ' style={{ backgroundImage: 'url("https://i.pinimg.com/474x/29/e1/c7/29e1c7ce7d5e453b93f35b78d45ed78f.jpg")' }}>
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
          <button className='p-2 bg-yellow-900 text-white m-8' onClick={handleEditBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
