import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Category.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from '../../../frontend/Loader';

function Category() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/category');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const truncateDescription = (description, maxLength) => {
        if (!description) return description;
        return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
    };

    const deleteCategory = async (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting...';
        try {
            await axios.delete(`http://127.0.0.1:8001/api/category/${id}`);
            setData(data.filter(category => category.id !== id));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category deleted successfully!',
            });
        } catch (error) {
            console.error('Error deleting category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete category!',
            });
        } finally {
            thisClicked.innerText = 'Delete';
        }
    };

    return (
        <>
            <div className="datatableTitle">
                <p>Add New Category</p>
                <Link to="/dashboard/new/cate" className="link">
                    Add New
                </Link>
            </div>

            {loading ? (
                <Loader />
            ) : data.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>No categories found.</p>
                </div>
            ) : (
                <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image</th>
                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td>
                                        <img src={`http://127.0.0.1:8001/${d.image}`} style={{ height: '40px' }} alt="category" />
                                    </td>
                                    <td>{d.nom}</td>
                                    <td>{truncateDescription(d.description, 50)}</td>
                                    <td style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        <Link to={`/dashboard/edit/cate/${d.id}`} className="btn btn-primary">Edit</Link>
                                        <button className="btn btn-danger" onClick={(e) => deleteCategory(e, d.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Category;
