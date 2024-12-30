// Ewallet on hold
// 'use client'

// import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
// import React, { useRef, useState } from 'react';
// import GcashIcon from '/public/GCash_Logo.png';
// import MayaIcon from '/public/maya_logo.jpeg';
// import GrabIcon from '/public/grab_logo.jpeg';
// import Image from 'next/image';
// import { getClerkIdLoggedIn } from '@/utils/actions';
// import { createCheckoutSession } from '@/pages/api/create_checkout_session';
// import { toast } from 'react-toastify';

// const EWalletPaymentPage = () => {

//     const [amount, setAmount] = useState('');
//     const formRef = useRef<HTMLFormElement>(null)

//     // Handle form submission by getting the amount entered by the user
//     const clientAction = async (formData: FormData) => {
//         // convert payment amount to integer
//         const amount = parseInt(formData.get('amount') as string)
        
//         // gets the clerk id of the logged in user and checks if the user is logged in
//         // clerk id will be used to save the payment in the database
//         const { clerkId, error } = await getClerkIdLoggedIn()
//         if (error) {
//             toast.error(error)
//             return
//         }
//         if (!clerkId) {
//             toast.error('User not found')
//             return
//         }

//         // create checkout session api with the amount and clerk id
//         const {response, checkoutError} = await createCheckoutSession(amount, clerkId)

//         if (checkoutError) {
//             toast.error(checkoutError)
//             return
//         }

//         // gets the checkout url from the response and redirect to the checkout page
//         const checkout_url = await response.attributes.checkout_url
        
//         // save the payment intent id to local storage which will be used to get the payment intent details
//         // and display it on the success page
//         localStorage.setItem('payment_intent_id', await response.attributes.payment_intent.id)
        
//         // redirect to the checkout page
//         window.location.replace(checkout_url)
//     }

//     return (
//         <Box sx={{ py: 4, px: 2 }}>
//             <Grid container spacing={0.15} justifyContent="center">
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }} className='dark:bg-blue-900'  >
//                         <CardContent>
//                             <Typography variant="h5" component="h2" gutterBottom className='dark:text-white'>
//                                 Payment Options
//                             </Typography>
//                             <Grid container spacing={2} marginTop={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="body1" gutterBottom marginLeft={4} textAlign={'left'} className='dark:text-white'>
//                                         <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//                                             <Image src={GcashIcon} alt="GCash Logo" width={20} height={20} style={{ marginRight: '5px' }} />
//                                             GCash (2.5% fee)
//                                         </span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="body1" marginLeft={4} gutterBottom textAlign={'left'} className='dark:text-white'>
//                                         <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//                                             <Image src={MayaIcon} alt="GCash Logo" width={20} height={20} style={{ marginRight: '5px' }} />
//                                             Maya (2.0% fee)
//                                         </span>
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="body1" marginLeft={4} gutterBottom textAlign={'left'} className='dark:text-white'>
//                                         <span style={{ display: 'inline-flex', alignItems: 'center', width: '110%' }}>
//                                             <Image src={GrabIcon} alt="GCash Logo" width={20} height={20} style={{ marginRight: '5px' }} />
//                                             GrabPay (2.2% fee)
//                                         </span>
//                                     </Typography>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4} >
//                     <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }} className='dark:bg-blue-900'>
//                         <CardContent >
//                             <Typography variant="h5" component="h2" gutterBottom className='dark:text-white'>
//                                 Payment
//                             </Typography>
//                             {/* Ewallet on hold */}
//                             {/* <form ref={formRef} action={clientAction}> */}
//                             <form>
//                                 <Grid container spacing={2} marginBottom={1}>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             label="Amount to Pay"
//                                             type="number"
//                                             variant="outlined"
//                                             name='amount'
//                                             value={amount}
//                                             onChange={(event) => setAmount(event.target.value)}
//                                             placeholder="Enter amount"
//                                             fullWidth
//                                         />
//                                     </Grid>
//                                 </Grid>

//                                 <Button variant="contained" fullWidth color="primary" type='submit'>
//                                     Continue to pay
//                                 </Button>
//                             </form>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };



// export default EWalletPaymentPage;



