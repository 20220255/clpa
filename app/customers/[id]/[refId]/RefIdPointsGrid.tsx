'use client'

import React from "react";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import { Point, Reference } from "@prisma/client";


const RefIdPointsGrid = ({ refIdPoints }: { refIdPoints: Point[] | null }) => {

    const rows = refIdPoints?.map((points) => ({
        id: points.id,
        points: points.points,
        pointsDate: points.pointsDate,
        numWashDry: points.numWash + ' wash ' + points.numDry + ' dry',
    }));

    const columns = [
        { field: "pointsDate", width: 160, renderHeader: () => <Typography sx={{ color: 'darkblue', }}>{'Date Points Received'}</Typography> },
        { field: "points", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Points'}</Typography>, },
        { field: "numWashDry", width: 350, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Details'}</Typography>, },
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer style={{ marginTop: '0.5rem' }}>
                <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center', columnGap: '23rem' }}>
                    <div style={{ margin: 'auto', color: 'inherit' }} >
                        <GridToolbarColumnsButton slotProps={{ button: { color: 'inherit' } }} />
                        <GridToolbarFilterButton slotProps={{ button: { color: 'inherit' } }} />
                        <GridToolbarExport slotProps={{ button: { color: 'inherit' } }} />
                    </div>
                </div>
            </GridToolbarContainer>
        )
    }
    return (
        <Container style={{ height: 400, width: '110%', marginLeft: '-5%', }} >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 100]}
                density='standard'
                slots={{
                    toolbar: CustomToolbar,
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                className="dark:text-white dark:bg-blue-900 diplay: flex justify-center"
            />
        </Container>
    )

}
export default RefIdPointsGrid
