import React, { useEffect, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import axios from 'axios';

const BreakDown = () => {
    const theme = useTheme();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/salesBYcategory');
                setData(response.data.salesByCategory);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return "loading ...";
    }

    const colors = [
        theme.palette.secondary[500] || '#d32f2f', // default red
        theme.palette.secondary[300] || '#f44336', // default lighter red
        theme.palette.secondary[100] || '#e57373', // default even lighter red
        theme.palette.secondary[700] || '#b71c1c', // default darker red
    ];

    const formattedData = data.map((item, i) => ({
        id: item.category,
        label: item.category,
        value: item.sales,
        color: colors[i % colors.length]  // Use modulus to cycle through colors if there are more categories than colors
    }));

    return (
        <Box height="100%" width="100%">
            <ResponsivePie
                data={formattedData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ datum: 'data.color' }}  // Use the color defined in the data
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor={theme.palette.text.primary || '#000'}  // Fallback to black if undefined
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor={theme.palette.text.primary || '#000'}  // Fallback to black if undefined
                theme={{
                    axis: {
                        ticks: {
                            text: { fill: theme.palette.text.primary || '#000' }  // Fallback to black if undefined
                        }
                    },
                    legends: {
                        text: { fill: theme.palette.text.primary || '#000' }  // Fallback to black if undefined
                    },
                    tooltip: {
                        container: { background: theme.palette.background.paper || '#fff', color: theme.palette.text.primary || '#000' }  // Fallback to white and black if undefined
                    }
                }}
            />
        </Box>
    );
};

export default BreakDown;
