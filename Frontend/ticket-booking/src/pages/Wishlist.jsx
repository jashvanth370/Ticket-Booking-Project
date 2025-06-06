import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWishlist, removeWishlistItem } from '../api/wishlistApi';
import '../styles/Wishlist.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await getUserWishlist(userId);
      setWishlist(res.data);
      console.log("Fetched Wishlist:", res.data);
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  // const handleAdd = () => {
  //   const selectItem = wishlist.find(item => item.id === wishlistItemId)
  //   if(selectItem && selectItem.event){
  //     navigate('/bookings',{state: {event : selectItem.event}});
  //   }
  // }

  const handleAdd = (event) => {
    navigate('/bookings', { state: { event } });
  };


  const handleRemove = async (id) => {
    try {
      await removeWishlistItem(id);
      fetchWishlist();
    } catch (err) {
      console.error('Error removing wishlist item', err);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchWishlist();
    }
  }, [userId, token]);

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <div className="wishlist-container">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((item) => (
            <li key={item.id} className="wishlist-item">
              <h3>{item.event.title}</h3>
              <p>{item.event.description}</p>
              <p><strong>Date:</strong> {new Date(item.event.created_at).toLocaleDateString()}</p>
              <div className='btn'>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
                <button className="add-btn" onClick={() => handleAdd(item.event)} disabled={!item.event}>
                  Book
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
