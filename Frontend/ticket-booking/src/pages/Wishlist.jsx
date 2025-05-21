import React, { useEffect, useState } from 'react';
import { getUserWishlist, removeWishlistItem } from '../api/wishlistApi';
import '../styles/Wishlist.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

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
      <h2>💖 My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((item) => (
            <li key={item.id} className="wishlist-item">
              <h3>{item.event.title}</h3>
              <p>{item.event.description}</p>
              <p><strong>Date:</strong> {new Date(item.event.created_at).toLocaleDateString()}</p>
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
