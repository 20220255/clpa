'use client'

import { getTotalRegisteredCustomers } from "@/utils/actions"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const RegisteredCustomers = () => {

  const [registeredCustomers, setRegisteredCustomers] = useState(0)

  // Get total number of registered customers
  useEffect(() => {
    const getRegisteredCustomers = async () => {
      const { totalCustomers, error } = await getTotalRegisteredCustomers()
      if (error) {
        toast.error(error)
        return
      }
      setRegisteredCustomers(totalCustomers ?? 0)
    }
    getRegisteredCustomers()
  }, [])


  return (
    <div>
      <Button size="medium" variant="contained" color="primary"> {registeredCustomers} Customers</Button>
    </div>
  )
}

export default RegisteredCustomers
