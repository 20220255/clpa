'use client'

import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import GcashIcon from '/public/GCash_Logo.png';
import MayaIcon from '/public/maya_logo.jpeg';
import GrabIcon from '/public/grab_logo.jpeg';
import Image from 'next/image';

const EWalletPaymentPage = () => {
    return (
        <Box sx={{ py: 4, px: 2 }}>
            <Grid container spacing={0.15} justifyContent="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Payment Options
                            </Typography>
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" gutterBottom marginLeft={4} textAlign={'left'}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <Image src={GcashIcon} alt="GCash Logo" width={20} height={20} style={{ marginRight: '5px' }} />
                                            GCash (2.5% fee)
                                        </span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" marginLeft={4} gutterBottom textAlign={'left'}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <Image src={MayaIcon} alt="GCash Logo" width={20} height={20} style={{ marginRight: '5px' }} />
                                            Maya (2.0% fee)
                                        </span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1" marginLeft={4} gutterBottom textAlign={'left'}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', width: '110%' }}>
                                            <Image src={GrabIcon} alt="GCash Logo" width={20} height={20} style={{ marginRight: '5px' }} />
                                            GrabPay (2.2% fee)
                                        </span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Payment Details
                            </Typography>
                            <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
                                Continue to Payment
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

const handleClick = () => {
    // Create Checkout Session with API
};

export default EWalletPaymentPage;



// 'use client'

// import { Button } from '@mui/material'
// import Link from 'next/link'
// import React from 'react'

// const EWalletPaymentPage = () => {

//     // Create Checkout Session with API
//     const handleClick = () => {

//     }

//     return (
//         <div>
//             <h2>To our valued customer, please be advised that the following charges will be applied: </h2>
//             <ul>
//                 <li>GCash: 2.5% fee</li>
//                 <li>Paymaya: 2.00% fee</li>
//                 <li>GrabPay: 2.20% fee</li>
//             </ul>
//             <Button onClick={ handleClick } variant="contained" size="small" className=" dark:text-white dark:bg-blue-300 mb-2">
//                 {/* <Link href={`/eWallet/points/addPoints/${refId}~${firstName}`}>Add Points</Lin> */}
//                 Continue to Payment
//             </Button>
//         </div>
//     )
// }

// export default EWalletPaymentPage
