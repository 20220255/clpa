'use client'

import Card from "@/components/shared/card/Card"
import { addPoints, getClerkId } from "@/utils/actions"
import { Button, InputAdornment, Stack, TextField } from "@mui/material"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify'

const AddPointsForm = ({ refId, fName, totalPoints }: { refId: string, fName: string, totalPoints: number | undefined }) => {

    const freeWashPoints = 10
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

        const currentTotalPoints = parseInt(totalPoints!.toString()) + points

        // convert boolean to string
        const freeWash = isFreeWash.toString();
        formData.append('isFreeWash', freeWash);

        // if freeWash is true, free wash points should be equal to total points
        const totalPointsNum = parseInt(totalPoints!.toString())
        if ((freeWashPoints !== totalPointsNum && formData.get('isFreeWash') === 'on')) {
            toast.error(`Customer only has ${totalPointsNum} points. Customer needs to have ${freeWashPoints} points before claiming a free wash`)
            return
        }

        // if current total points is greater than freeWashPoints, 
        if (currentTotalPoints > freeWashPoints && formData.get('isFreeWash') === 'false') {
            toast.error(`Customer points is over ${freeWashPoints} points.`)
            return
        }

        const clerkId = (await getClerkId(refId))?.clerkId ?? ''

        const { error } = await addPoints({ formData, refId, clerkId })
        if (error) {
            toast.error(error)
            return
        } else {
            toast.success('Points added!')
            formRef.current?.reset()
            redirect(`/customers/${clerkId}`)
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
                    value={isFreeWash ? new Date().toISOString().split('T')[0] : datePoints}
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
                        fullWidth
                        inputProps={{ min: 0 }}
                        required
                        {...isFreeWash ? { value: 0 } : { value: numWash }}
                        slotProps={{
                            input: {
                                // Change point system to 1 pt for 1 wash n dry
                                startAdornment: <InputAdornment position="start">Number of Wash & Dry: </InputAdornment>,
                            },
                        }}
                        className="dark:bg-slate-300"
                    />
                    <TextField
                        type="number"
                        name="numDry"
                        variant='outlined'
                        color='primary'
                        inputProps={{ min: 0 }}
                        onChange={e => setNumDry(parseInt((e.target.value)))}
                        {...isFreeWash ? { value: 0 } : { value: numDry }}
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
                        // Hide input field for dry due to changes in point system
                        sx={{ mb: 4, display: 'none' }}
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
                <div className="flex justify-between gap-4">
                    <Button variant="contained" fullWidth color="secondary" onClick={handleGoBack} >Cancel</Button>
                    <Button variant="contained" fullWidth color="primary" type="submit">
                        Add Points
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default AddPointsForm
