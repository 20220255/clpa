'use server'

import createPayment from '@/utils/actions';
// Webhook for paymongo payments
import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("===Webhook triggered=== Snapwash what")

  if (req.method === "POST") {


    
    console.log("===Webhook triggered=== Snapwash 3")


    const data = await req.body.data

    // Create payment with database
    const amount = await data.attributes.data.attributes.amount
    amount && console.log('amount: ', amount)
    
    const email = await data.attributes.data.attributes.billing.email
    email && console.log('email: ', email)

    const name = await data.attributes.data.attributes.billing.name
    name && console.log('name: ', name)

    const phone = await data.attributes.data.attributes.billing.phone
    phone && console.log('phone: ', phone)

    const currency = await data.attributes.data.attributes.currency
    currency && console.log('currency: ', currency)

    const description = await data.attributes.data.attributes.description
    description && console.log('description: ', description)

    const fee = await data.attributes.data.attributes.fee
    fee && console.log('fee: ', fee)

      const net_amount = await data.attributes.data.attributes.net_amount

      const type = await data.attributes.data.attributes.source.type
      type && console.log('source: ', type)

      const status = await data.attributes.data.attributes.status
      status && console.log('status: ', status)
    
      const payment_intent_id = await data.attributes.data.attributes.payment_intent_id
      payment_intent_id && console.log('payment_intent_id: ', payment_intent_id)

      const statement_descriptor = await data.attributes.data.attributes.statement_descriptor
      statement_descriptor && console.log('statement_descriptor: ', statement_descriptor)

      const userId = statement_descriptor.toString().slice(9)
      userId && console.log('user ID: ', userId)

    console.log('webhook data: ', req.body.data.attributes.data)

    const paymentData = {
      amount,
      email,
      name,
      phone,
      currency,
      description,
      fee,
      net_amount,
      type,
      status,
      payment_intent_id,
      userId, 
    };
    
    const error = await createPayment({paymentData})
    
    console.log('error: ', error)  

    console.log("===webhook end===")

    res.status(200).send("Webhook Received")

  }
  else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;