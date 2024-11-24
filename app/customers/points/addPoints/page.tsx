'use client'

import Card from "@/components/shared/card/Card"
import { Button, InputAdornment, Stack, TextareaAutosize, TextField } from "@mui/material"
import { Fragment, use, useEffect, useState } from "react"

const AddPointsPage = () => {

    const [datePoints, setDatePoints] = useState('')
    const [numWash, setNumWash] = useState(0)
    const [numDry, setNumDry] = useState(0)
    const [comment, setComment] = useState('')
    const [points, setPoints] = useState(0)

    useEffect(() => {
        setPoints(numWash + numDry)
    }, [numWash, numDry])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(datePoints, numWash, numDry, comment)
    }

    return (
        <Card>
            <h1 className="text-2xl font-bold dark:text-blue-200"> {`${points} POINTS`}</h1>
            <form onSubmit={handleSubmit}  >
                <TextField
                    type="date"
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
                <Stack spacing={2} direction="column" sx={{marginBottom: 4, marginTop: 4 }}>
                    <TextField
                        type="number"
                        variant='outlined'
                        color='secondary'
                        // label="Number of Washes"
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
                        variant='outlined'
                        color='secondary'
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
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    // color='black'
                    style={{ width: '100%', marginBottom: 20, border: '1px solid #ccc' }}
                    className="dark:bg-slate-300 "
                />
                <Button variant="contained" fullWidth color="primary" type="submit">Add Points</Button>
            </form>
        </Card>
    )
}

export default AddPointsPage
