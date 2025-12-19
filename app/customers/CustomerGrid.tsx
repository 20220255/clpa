'use client'

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { UserTotalPoints } from "@/utils/actions";

type RowForm = {
    id: string;
    imageUrl: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    createdAt: Date;
    clerkId: string;
    totalPoints: number
}

const CustomerGrid = ({ customersTotalPoints, error }: { customersTotalPoints?: UserTotalPoints[], error?: string }) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (error && mounted) {
            toast.error(error);
        }
    }, [error, mounted]);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return null;
    }

    const rows: RowForm[] = customersTotalPoints?.map((customer): RowForm => ({
        id: customer.totalPoints?.id || '',
        imageUrl: customer.totalPoints?.imageUrl || "",
        firstName: customer.totalPoints?.firstName,
        lastName: customer.totalPoints?.lastName,
        email: customer.totalPoints?.email || '',
        createdAt: customer.totalPoints?.createdAt || new Date(),
        clerkId: customer.totalPoints?.clerkUserId || '',
        totalPoints: customer.totalPoints?.totalPoints || 0
    })) || [];

    const columns = [
        { field: "imageUrl", width: 70, renderHeader: () => <Typography sx={{ color: 'darkblue', }}></Typography>, renderCell: (params: GridRenderCellParams) => <Avatar sx={{ marginTop: '0.25rem', display: 'flex', justifyContent: 'center' }} src={params.row.imageUrl} />, },
        { field: "firstName", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'First Name'}</Typography>, },
        { field: "lastName", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Last Name'}</Typography>, },
        { field: "email", width: 250, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Email'}</Typography>, },
        { field: "createdAt", width: 200, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Date Registered'}</Typography>, },
        { field: "totalPoints", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Total Points'}</Typography>, },
    ];

    const handleRowClick = (params: GridRowParams) => {
        const id = params.row.clerkId;
        if (id) {
            location.href = `/customers/${id}`
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
        <div style={{ height: 500, width: '100%' }}>
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
                className="dark:text-white dark:bg-slate-800"
                onRowClick={handleRowClick}
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

export default CustomerGrid
