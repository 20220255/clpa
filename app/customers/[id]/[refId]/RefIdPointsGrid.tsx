'use client'

import React from "react";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import { Point } from "@prisma/client";



const RefIdPointsGrid = ({ refIdPoints }: { refIdPoints?: Point[]}) => {

    if (refIdPoints?.length === 0) {
        return (
            <div>
                <h1 className="mt-28 text-2xl font-bold dark:text-blue-200">No points to show yet.</h1>{" "}
                <br></br>
                Visit our shop and avail our laundry services to earn points.
                Thank you!
            </div>
        )
    }

    const rows = refIdPoints?.map((points) => ({
        id: points.id,
        points: points.points,
        pointsDate: points.pointsDate,
        // numWashDry: points.freeWash ? 'Free Wash' : points.numWash + ' wash ' + points.numDry + ' dry' || 'Free Wash',
        // change point system to 1 pt for 1 wash n dry
        numWashDry: points.freeWash 
            ? 'Free Wash' 
            : points.numDry > 0 
                ? points.numWash + ' wash ' + points.numDry + ' dry' || 'Free Wash' 
                : points.numWash + ' wash n dry ' || 'Free Wash',
        comments: points.comment
    }));

    const columns = [
        { field: "pointsDate", width: 160, renderHeader: () => <Typography sx={{ color: 'darkblue', }}>{'Date Points Received'}</Typography> },
        { field: "points", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Points'}</Typography>, },
        { field: "numWashDry", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Details'}</Typography>, },
        { field: "comments", width: 350, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Comments'}</Typography>, },
    ];

    const handleRowClick = async (params: any) => {
        const ptsId = await params.row.id;
        location.href = `/customers/points/editDelPoints/${ptsId}`
    }

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
                onRowClick={handleRowClick}
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
