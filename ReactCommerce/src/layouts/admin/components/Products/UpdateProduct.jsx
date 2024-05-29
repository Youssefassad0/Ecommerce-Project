import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const categoryRes = await axios.get('http://127.0.0.1:8001/api/category');
                setCategory(categoryRes.data.data);

                const productRes = await axios.get(`http://127.0.0.1:8001/api/products/${id}`);
                const product = productRes.data.data;

                setFormData({
                    name: product.name || '',
                    description: product.description || '',
                    gender: product.gender || '',
                    original_price: product.original_price || '',
                    new_price: product.new_price || '',
                    stock: product.stock || '',
                    images: [], // Handle images separately
                    category_id: product.category_id || '',
                    brand: product.brand || '',
                    rating: product.rating || 0,
                    rating_count: product.rating_count || 0,
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...e.target.files],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('_method', 'PUT');
        Object.keys(formData).forEach((key) => {
            if (key === 'sizes' || key === 'colors') {
                const value = formData[key].trim();
                data.append(key, value ? JSON.stringify(value.split(',')) : '[]');
            } else if (key === 'images') {
                formData.images.forEach((image) => data.append('images[]', image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(`http://127.0.0.1:8001/api/products/${id}`, data, {
                headers: { 'Content-Type': "multipart/form-data" },
            });
            setSuccessMessage('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container mt-5">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="Gender"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="original_price" className="form-label">Original Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="original_price"
                        name="original_price"
                        value={formData.original_price}
                        onChange={handleChange}
                        placeholder="Original Price"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="new_price" className="form-label">New Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="new_price"
                        name="new_price"
                        value={formData.new_price}
                        onChange={handleChange}
                        placeholder="New Price"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="images" className="form-label">Images</label>
                    <input
                        type="file"
                        className="form-control"
                        id="images"
                        name="images"
                        onChange={handleFileChange}
                        multiple
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category</label>
                    <select
                        className="form-select"
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {category.map((c, i) => (
                            <option value={c.id} key={i}>
                                {c.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating_count" className="form-label">Rating Count</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating_count"
                        name="rating_count"
                        value={formData.rating_count}
                        onChange={handleChange}
                        placeholder="Rating Count"
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sizes" className="form-label">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="sizes"
                        name="sizes"
                        value={formData.sizes}
                        onChange={handleChange}
                        placeholder="Sizes (comma-separated)"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="colors" className="form-label">Colors (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="colors"
                        name="colors"
                        value={formData.colors}
                        onChange={handleChange}
                        placeholder="Colors (comma-separated)"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </div>
    );
};

export default ProductUpdateForm;
