'use client'

import React from "react";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Button, Container, Typography } from "@mui/material";
import { Point } from "@prisma/client";
import Link from "next/link";


const RefIdPointsGrid = ({ refIdPoints, refId }: { refIdPoints: Point[] | null, refId: string }) => {

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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', marginRight: '1rem' }}>
                <GridToolbarContainer style={{ marginTop: '0.5rem' }}>
                    <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center', columnGap: '23rem' }}>
                        <div style={{ margin: 'auto', color: 'inherit' }} >
                            <GridToolbarFilterButton slotProps={{ button: { color: 'inherit' } }} />
                        </div>
                    </div>
                </GridToolbarContainer>
                <Button variant="contained" className="dark:text-white dark:bg-blue-300 mb-2">
                    <Link href={`/customers/points/addPoints/${refId}`}>Add Points</Link>
                </Button>
            </div>
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
