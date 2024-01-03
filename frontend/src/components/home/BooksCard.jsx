
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
    return (
        <div className='bg-white grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' style={{ backgroundImage: 'url("https://i.pinimg.com/564x/14/90/d0/1490d04079a99418fc4b78577f1cee2b.jpg")' }}>
            {books.map((item) => (
                <BookSingleCard key={item._id} book={item} />

            ))}
        </div>
    );
};

export default BooksCard;