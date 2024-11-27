'use client'

import Card from "@/components/shared/card/Card"
import { addPoints, getClerkId } from "@/utils/actions"
import { Button, FormControlLabel, InputAdornment, Stack, Switch, TextField } from "@mui/material"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify'

const AddPointsForm = ({ refId, fName }: { refId: string, fName: string }) => {

    const [datePoints, setDatePoints] = useState('')
    const [numWash, setNumWash] = useState(0)
    const [numDry, setNumDry] = useState(0)
    const [comment, setComment] = useState('')
    const [points, setPoints] = useState(0)
    const [isFreeWash, setIsFreeWash] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)


    useEffect(() => {
        setPoints(numWash + numDry)
    }, [numWash, numDry])


    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const clientAction = async (formData: FormData) => {

        // convert boolean to string
        const freeWash = isFreeWash.toString();
        formData.append('isFreeWash', freeWash);

        const clerkId = (await getClerkId(refId))?.clerkId ?? ''

        const { error } = await addPoints({ formData, refId, clerkId })
        if (error) {
            toast.error(error)
            return
        } else {
            toast.success('Points added!')
            formRef.current?.reset()
            redirect(`/customers/${clerkId}/${refId}~${fName}`)
        }
    }

    return (
        <Card>
            {isFreeWash
                ? <h1 className="text-2xl font-bold dark:text-blue-200">FREE WASH</h1>
                : <h1 className="text-2xl font-bold dark:text-blue-200"> {`${points} POINTS`}</h1>
            }
            <form ref={formRef} action={clientAction}>
                <TextField
                    type="date"
                    name="pointsDate"
                    variant='outlined'
                    onChange={e => setDatePoints(e.target.value)}
                    value={datePoints}
                    fullWidth
                    required
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">Date: </InputAdornment>,
                        },
                    }}
                    className="dark:bg-slate-300"
                />
                <Stack spacing={2} direction="column" sx={{ marginBottom: 4, marginTop: 4 }}>
                    <TextField
                        type="number"
                        name="numWash"
                        variant='outlined'
                        color='primary'
                        onChange={e => setNumWash(parseInt((e.target.value)))}
                        value={numWash}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">Number of Washes: </InputAdornment>,
                            },
                        }}
                        className="dark:bg-slate-300"
                    />
                    <TextField
                        type="number"
                        name="numDry"
                        variant='outlined'
                        color='primary'
                        onChange={e => setNumDry(parseInt((e.target.value)))}
                        value={numDry}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                startAdornment:
                                    <InputAdornment
                                        position="start"
                                        className="dark: text-white"
                                    >
                                        Number of Dries:
                                    </InputAdornment>,
                            },
                        }}
                        sx={{ mb: 4 }}
                        className="dark:bg-slate-300"
                    />
                </Stack>
                <TextField
                    multiline
                    maxRows={4}
                    minRows={3}
                    placeholder="Comments"
                    name="comment"
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    style={{ width: '100%', marginBottom: 20, border: '1px solid #ccc' }}
                    className="dark:bg-slate-300 "
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={isFreeWash}
                            onChange={e => setIsFreeWash(e.target.checked)}
                            name="isFreeWash"
                        />
                    }
                    className="dark:text-white dark:bg-inherit mb-2"
                    label="Free Wash"
                />
                <div className="flex justify-between gap-4">
                    <Button variant="contained" fullWidth color="secondary" onClick={handleGoBack} >Cancel</Button>
                    <Button variant="contained" fullWidth color="primary" type="submit">Add Points</Button>
                </div>
            </form>
        </Card>
    )
}

export default AddPointsForm
