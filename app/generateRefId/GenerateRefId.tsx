'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AddRefId } from '@/utils/actions';
import { toast } from 'react-toastify';

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

        const { addRefError } = await AddRefId(clerkUserId)

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
                            Welcome to Snapwash Loyalty App Program. Avail our services regularly to earn points and get your free wash.
                        </Typography>
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fullWidth' onClick={handleClose}>Continue</button>
                    </Box>
                </Modal>
            </form>
        </div>
    );
}

export default BasicModal