'use client'
import FacebookMsg from "@/components/FacebookMsg.tsx/FacebookMsg"


const HomePage = () => {
  return (
    <>
    <section className="pt-7">
        <h1  className="dark:text-blue-200 text-5xl ">Snapwash</h1>
        <p className="dark:text-blue-200 text-2xl ">Customer Loyalty Points App</p>
        <img src="/snapwashLogo.webp" alt="snapwash logo"  className="w-2/3 h-2/3 pt-0.25 m-auto mt-4" />
    </section>
    <FacebookMsg />
</>
  )
}

export default HomePage
