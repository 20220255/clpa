'use client'

import { redirect } from "next/navigation"
import { toast } from "react-toastify"
import { FaUsers } from "react-icons/fa"

const RegisteredCustomers = ({ totalCustomers, error }: { totalCustomers?: number, error?: string }) => {

  if (error) {
    toast.error(error)
    redirect('/')
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-200 dark:border-blue-700/50">
      <FaUsers className="text-blue-500 dark:text-cyan-400" />
      <span className="font-semibold text-blue-600 dark:text-cyan-400">{totalCustomers}</span>
      <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Customers</span>
    </div>
  )
}

export default RegisteredCustomers

