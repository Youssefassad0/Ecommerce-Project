import React, { useState } from 'react'
import Loader from '../../../frontend/Loader';

function Product() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  return (
    <div>

        {
            loading ? <Loader/>
            : 
            <h2>Products</h2>
        }
    </div>
  )
}

export default Product