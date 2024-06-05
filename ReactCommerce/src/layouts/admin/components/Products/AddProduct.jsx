// src/components/ProductForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // To get the product ID from the URL
import Swal from 'sweetalert2';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductForm = () => {
    const { id } = useParams(); // Get product ID from URL params
    const [category, setCategory] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const nav = useNavigate();

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
        async function getCategory() {
            try {
                const res = await axios.get('http://127.0.0.1:8001/api/category');
                setCategory(res.data.data);
            } catch (err) {
                console.log('Error fetching category: ' + err);
            }
        }

        async function getProduct() {
            if (id) {
                setIsUpdate(true);
                try {
                    const res = await axios.get(`http://127.0.0.1:8001/api/products/${id}`);
                    const product = res.data;
                    setFormData({
                        ...product,
                        sizes: product.sizes.join(','),
                        colors: product.colors.join(','),
                    });
                } catch (err) {
                    console.log('Error fetching product: ' + err);
                }
            }
        }

        getCategory();
        getProduct();
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
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert colors to lowercase
        const updatedFormData = {
            ...formData,
            colors: formData.colors.split(',').map(color => color.trim().toLowerCase()).join(',')
        };
    
        const data = new FormData();
        Object.keys(updatedFormData).forEach(key => {
            if (key === 'sizes' || key === 'colors') {
                data.append(key, JSON.stringify(updatedFormData[key].split(',')));
            } else if (key === 'images') {
                updatedFormData.images.forEach(image => data.append('images[]', image));
            } else {
                data.append(key, updatedFormData[key]);
            }
        });
    
        try {
            let response;
            if (isUpdate) {
                response = await axios.post(`http://127.0.0.1:8001/api/products/${id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axios.post('http://127.0.0.1:8001/api/products', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 201) {
                    nav('/dashboard/products');
                    toast.success("Success added")
                }
            }
            console.log('Product created/updated successfully:', response.data);
        } catch (error) {
            console.error('Error creating/updating product:', error.response ? error.response.data : error.message);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
            <input type="number" step="0.01" name="original_price" value={formData.original_price} onChange={handleChange} placeholder="Original Price" required />
            <input type="number" step="0.01" name="new_price" value={formData.new_price} onChange={handleChange} placeholder="New Price" />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
            <input type="file" name="images" onChange={handleFileChange} multiple />
            <select name="category_id" value={formData.category_id} onChange={handleChange}>
                <option value="">Marque de produit</option>
                {category.map((c, i) => (
                    <option value={c.id} key={i}>{c.nom}</option>
                ))}
            </select>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" readOnly />
            <input type="number" name="rating_count" value={formData.rating_count} onChange={handleChange} placeholder="Rating Count" readOnly />
            <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" />
            <input type="text" name="colors" value={formData.colors} onChange={handleChange} placeholder="Colors (comma-separated)" />
            <button type="submit">{isUpdate ? 'Update Product' : 'Create Product'}</button>
        </form>
    );
};

export default ProductForm;
