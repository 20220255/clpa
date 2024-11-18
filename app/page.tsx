'use client'

import { Paragraph, Title } from "./HomeStyles"
import Logo from "../public/snapwashLogo.png"
import Image from 'next/image';



const HomePage = () => {
  return (
    <>
    <section className="pt-7">
        <Title  className="dark:text-blue-200">Snapwash</Title>
        <Paragraph className="dark:text-blue-200">Customer Loyalty Points App</Paragraph>
        <Image src={Logo} alt="snapwash logo"  className="w-2/3 h-2/3 pt-0.25 m-auto mt-4" />
    </section>
</>
  )
}

export default HomePage
