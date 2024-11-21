'use client'

import React from "react";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import { Reference } from "@prisma/client";


const CustomerRefGrid = ({ custRefIds }: { custRefIds: Reference[] }) => {

    const rows = custRefIds.map((refIds) => ({
        id: refIds.id,
        refId: refIds.refId,
        claimed: refIds.claimed ? 'Yes' : 'No',
        claimedDate: refIds.claimedDate
    }));

    const columns = [
        { field: "refId", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue', }}>{'Ref ID'}</Typography> },
        { field: "claimed", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Claimed'}</Typography>, },
        { field: "claimedDate", width: 350, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Date Claimed'}</Typography>, },
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
    );
}

export default CustomerRefGrid
