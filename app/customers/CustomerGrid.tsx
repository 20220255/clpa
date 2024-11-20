'use client'

import React from "react";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Avatar, Container, Typography } from "@mui/material";
import { User } from "@prisma/client";


const CustomerGrid = ({customers}: {customers: User[]} ) => {

  const rows = customers.map((customer) => ({
    id: customer.id,
    imageUrl: customer.imageUrl,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    createdAt: customer.createdAt,
  }));

  const columns = [
    { field: "imageUrl", width: 70, renderHeader: () => <Typography sx={{ color: 'darkblue',  }}></Typography>, renderCell: (params: any) => <Avatar sx={{marginTop: '0.25rem', display: 'flex', justifyContent: 'center'  }} src={params.row.imageUrl} />, },
    { field: "firstName", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'First Name'}</Typography>, } ,
    { field: "lastName", width: 150, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Last Name'}</Typography>, },
    { field: "email", width: 250, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Email'}</Typography>, },
    { field: "createdAt", width: 200, renderHeader: () => <Typography sx={{ color: 'darkblue' }}>{'Date Registered'}</Typography>, },
  ];


  const CustomToolbar = () => {
    return (
        <GridToolbarContainer style={{ marginTop: '0.5rem' }}>
            <div style={{ flexWrap: 'wrap', flexDirection: 'row', display: 'flex', alignContent: 'center', columnGap: '23rem' }}>
                <div style={{ margin: 'auto', color: 'inherit' }} >
                    <GridToolbarColumnsButton slotProps={{button:{color:'inherit'}}} />
                    <GridToolbarFilterButton slotProps={{button:{color:'inherit'}}} />
                    <GridToolbarExport slotProps={{button:{color:'inherit'}}} />
                </div>
            </div>
        </GridToolbarContainer>
    )
}

return (
    <Container style={{ height: 400, width: '110%', marginLeft: '-5%',  }} >
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

export default CustomerGrid
