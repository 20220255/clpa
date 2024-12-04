import { getCustomersTotalPoints } from "@/utils/actions"
import { Suspense } from "react"
import TopCustomer from "./TopCustomer"
import Spinner from "@/components/shared/Spinner"


const TopCustomerPage = async () => {

    // Get the total points for each customer
    const {customersTotalPoints, error} = await getCustomersTotalPoints()


  return (
    <div>
        <h1 className="text-1xl font-bold dark:text-blue-200 mt-2 ">TOP 25 CUSTOMERS</h1>
        <Suspense fallback={<Spinner />}>
            <TopCustomer customersTotalPoints={customersTotalPoints} error={error} />
        </Suspense>
      
    </div>
  )
}

export default TopCustomerPage
