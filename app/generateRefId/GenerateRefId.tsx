'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { redirect } from 'next/dist/server/api-utils';
import { Link } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { AddRefId, getClerkId } from '@/utils/actions';
import { auth } from '@clerk/nextjs/server';
import { get } from 'http';
import { toast } from 'react-toastify';
import { ButtonGroupContext } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type GenerateRefIdProps = {
    userId: string | null;
}

const BasicModal = (userId: GenerateRefIdProps) => {

    const clerkUserId = userId.userId

    const [open, setOpen] = React.useState(true);

    const handleClose = async () => {

        if (!clerkUserId) {
            toast.error('User ID not found')
            return
        }

        const { reference, addRefError } = await AddRefId(clerkUserId)

        if (addRefError) {
            toast.error(addRefError)
            return
        }

        setOpen(false)

        location.href = '/points'
    };

    return (
        <div>
            <form action={handleClose}>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Snapwash Loyalty App
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className='dark:text-blue-800 pb-2' >
                            Welcome to Snapwash Loyalty App Program. Avail our services reularly to earn points and get your free wash.
                        </Typography>
                        <Button type='submit' variant="contained" fullWidth onClick={handleClose}>Continue</Button>
                    </Box>
                </Modal>
            </form>
        </div>
    );
}

export default BasicModal