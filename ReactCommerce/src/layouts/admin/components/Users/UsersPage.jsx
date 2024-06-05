import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UsersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8001/api/users');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'mobile', headerName: 'Phone Number', flex: 0.5 },
    {
      field: 'location',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/dashboard/user/${params.row.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
          View Details
        </Link>
      ),
    },
  ];

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
  };

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        <h1>List Of Customers</h1>
        <Box mt="40px"  sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            density="compact"
            components={{
              Toolbar: () => null, // Hide toolbar
            }}
            localeText={{
              noRowsLabel: 'No customers found',
            }}
            renderCell={(params) => {
              if (params.field === 'mobile') {
                return formatPhoneNumber(params.value);
              }
              return params.value;
            }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default UsersPage;
