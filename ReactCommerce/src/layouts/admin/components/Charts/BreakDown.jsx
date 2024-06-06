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
        theme.palette.secondary[400] || '#D895DA', // default red
        theme.palette.secondary[300] || '#D895DA', // default lighter red
        theme.palette.secondary[100] || '#AF47D2', // default even lighter red
        theme.palette.secondary[700] || '#FFD0D0', // default darker red
        theme.palette.secondary[600] || '#FF9EAA', // default darker red
        theme.palette.secondary[700] || '#D895DA', // default darker red
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
                colors={formattedData.map(d => d.color)}  // Assign colors directly from formattedData
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
