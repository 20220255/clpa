'use server'

// Webhook for paymongo payments
import createPayment from '@/utils/actions';
import { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    
    const data = await req.body.data

    // Create payment with database
    const amount = await data.attributes.data.attributes.amount
    const email = await data.attributes.data.attributes.billing.email
    const name = await data.attributes.data.attributes.billing.name
    const phone = await data.attributes.data.attributes.billing.phone
    const currency = await data.attributes.data.attributes.currency
    const description = await data.attributes.data.attributes.description
    const fee = await data.attributes.data.attributes.fee
    const net_amount = await data.attributes.data.attributes.net_amount
    const type = await data.attributes.data.attributes.source.type
    const status = await data.attributes.data.attributes.status
    const payment_intent_id = await data.attributes.data.attributes.payment_intent_id
    const statement_descriptor = await data.attributes.data.attributes.statement_descriptor
    // extract user id from statement descriptor
    const userId = statement_descriptor.toString().slice(9)

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
    if (error) console.log('error: ', error)

    res.status(200).send("Webhook Received")

  }
  else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
  }
};

export default handler;