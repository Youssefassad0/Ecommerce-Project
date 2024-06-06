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
                const response = await axios.get('http://localhost:8001/api/sales-category');
                setData(response.data.salesbyCategory);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return "loading ...";
    }

    // Check if theme colors are defined and fall back to default colors if not
    const colors = [
        theme.palette.secondary?.[500] || '#D6589F', // default red
        theme.palette.secondary?.[300] || '#C4E4FF', // default lighter red
        theme.palette.secondary?.[100] || '#D895DA', // default even lighter red
        theme.palette.secondary?.[700] || '#D20062', // default darker red
    ];

    const formattedData = Object.entries(data).map(([category, sales], i) => (
        {
            id: category,
            label: category,
            value: sales,
            color: colors[i % colors.length]  // Use modulus to cycle through colors if there are more categories than colors
        }
    ));

    return (
        <Box m="1.5rem 1.2rem">
            <Box mt="10px" height="40vh">
                <Box height={"100%"} width="100%">
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
            </Box>
        </Box>
    );
};

export default BreakDown;
