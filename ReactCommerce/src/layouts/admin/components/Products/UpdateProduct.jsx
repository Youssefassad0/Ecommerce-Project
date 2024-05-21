
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductUpdateForm = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        gender: '',
        original_price: '',
        new_price: '',
        stock: '',
        images: [],
        category_id: '',
        brand: '',
        rating: 0,
        rating_count: 0,
        sizes: '',
        colors: '',
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const categoryRes = await axios.get('http://127.0.0.1:8001/api/category');
                setCategory(categoryRes.data.data);

                const productRes = await axios.get(`http://127.0.0.1:8001/api/products/${id}`);
                // console.log(productRes.data.data);
                const product = productRes.data.data;
                setFormData({
                    name: product.name,
                    description: product.description,
                    gender: product.gender,
                    original_price: product.original_price,
                    new_price: product.new_price,
                    stock: product.stock,
                    images: [],
                    category_id: product.category_id,
                    brand: product.brand,
                    rating: product.rating,
                    rating_count: product.rating_count,
                    sizes: product.sizes ? product.sizes.join(',') : '',
                    colors: product.colors ? product.colors.join(',') : '',
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            images: [...e.target.files],
        });
    };

 /*    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'sizes' || key === 'colors') {
                data.append(key, JSON.stringify(formData[key].split(',')));
            } else if (key === 'images') {
                formData.images.forEach(image => data.append('images[]', image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(`http://127.0.0.1:8001/api/products/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Product updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }; */

    return (
        <form>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
            <input type="number" step="0.01" name="original_price" value={formData.original_price} onChange={handleChange} placeholder="Original Price" required />
            <input type="number" step="0.01" name="new_price" value={formData.new_price} onChange={handleChange} placeholder="New Price" />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="file" name="images" onChange={handleFileChange} multiple />
            <select name="category_id" value={formData.category_id} onChange={handleChange} >
                <option value="">Select Category</option>
                {category.map((c, i) => (
                    <option value={c.id} key={i}>{c.nom}</option>
                ))}
            </select>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" readOnly />
            <input type="number" name="rating_count" value={formData.rating_count} onChange={handleChange} placeholder="Rating Count" readOnly />
            <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" />
            <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="Colors (comma-separated)" />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default ProductUpdateForm;
