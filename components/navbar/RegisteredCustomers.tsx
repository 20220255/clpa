'use client'

import { getTotalRegisteredCustomers } from "@/utils/actions"
import { Button } from "@mui/material"
import { redirect } from "next/navigation"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const RegisteredCustomers = ( { totalCustomers, error }: { totalCustomers?: number, error?: string } ) => {

  if (error) {
    toast.error(error)
    redirect('/')
  }

  return (
    <div>
      <Button size="medium" variant="contained" color="primary"> {totalCustomers} Customers</Button>
    </div>
  )
}

export default RegisteredCustomers
