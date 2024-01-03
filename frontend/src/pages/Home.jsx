import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen'>
      <div className="bg-cover bg-center bg-fixed h-80 flex items-center justify-center text-white" style={{ backgroundImage: 'url("https://i.pinimg.com/474x/f2/34/91/f2349137ee1d8fbace805b7a5ad804c8.jpg")' }}>
        <div className="text-center">
          <h1 className='text-4xl md:text-5xl font-semibold mb-4'>Welcome to My Vintage Bookstore</h1>
          <p className='text-lg md:text-xl'>Discover a world of classic reads</p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8 ' style={{ backgroundImage: 'url("https://i.pinimg.com/564x/14/90/d0/1490d04079a99418fc4b78577f1cee2b.jpg")' }}>
        <div className='flex justify-between items-center'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-6 text-yellow-900'>Books List</h2>
          <Link to='/books/create'>
            <MdOutlineAddBox className='text-yellow-900 text-4xl' />
          </Link>
        </div>
        
        <div className='flex justify-center mb-6'>
          <button
            className='bg-yellow-900 hover:bg-yellow-700 px-4 py-2 rounded-lg mr-4 text-white'
            onClick={() => setShowType('table')}
          >
            View as Table
          </button>
          <button
            className='bg-yellow-900 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white'
            onClick={() => setShowType('card')}
          >
            View as Cards
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
