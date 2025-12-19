'use client'

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridRowParams } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { GetCustomersReFId } from '@/utils/actions'


const CustomerRefGrid = ({ reference, errorFN }: { reference?: GetCustomersReFId, errorFN?: string }) => {

    const [mounted, setMounted] = useState(false);
    const userId = useParams();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (reference?.error) {
                toast.error('Error retrieving Customer Reference ID');
            }
            if (!errorFN) {
                toast.error('Error getting customer name');
            }
        }
    }, [mounted, reference?.error, errorFN]);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!reference?.reference || reference?.reference.length < 1) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-xl font-bold text-slate-600 dark:text-blue-200">No Reference ID to show.</h1>
            </div>
        )
    }

    if (reference?.error || !errorFN) {
        return null;
    }

    const rows = reference?.reference.map((refIds) => ({
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

    const handleRowClick = (params: GridRowParams) => {
        const refId = params.row.refId;
        const id = userId?.id;
        if (id && refId) {
            location.href = `/customers/${id}/${refId}`
        }
    }

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
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                density='standard'
                slots={{
                    toolbar: CustomToolbar,
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                onRowClick={handleRowClick}
                className="dark:text-white dark:bg-slate-800"
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(224, 224, 224, 0.3)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                        cursor: 'pointer',
                    },
                }}
            />
        </div>
    );
}

export default CustomerRefGrid
