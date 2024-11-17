'use client'

import { Paragraph, Title } from "./HomeStyles"
import Logo from "../public/snapwashLogo.png"
import Image from 'next/image';


const HomePage = () => {
  return (
    <>
    <section className="pt-7">
        <Title>Snapwash</Title>
        <Paragraph className="pb-10">Customer Loyalty Points App</Paragraph>
        <Image src={Logo} alt="snapwash logo"  className="w-2/3 h-2/3 pt-3 m-auto" />
    </section>
</>
  )
}

export default HomePage
