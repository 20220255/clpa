'use server'

export const createCheckoutSession = async (amount: number, clerkId: string): Promise<unknown> => {

  // retrieves the paymongo secret key from the environment variable
  const secretKey = process.env.PAYMONGO_SECRET_KEY;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${secretKey}`,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          description: 'Laundry Services',
          line_items: [
            {
              currency: 'PHP',
              // this is tha amount entered by the user 
              amount,
              description: 'Test Description',
              name: 'Wash/Dry/Other Items',
              quantity: 1
            }
          ],
          // this is the clerk id of the logged in user, to be used to save the payment in the database
          // and display it on the success page
          statement_descriptor: 'Snapwash-' + clerkId,
          payment_method_types: ['gcash', 'paymaya', 'grab_pay'],

          // TODO: use or create a function to get the domain name
          success_url: 'https://363ebfbe380190.lhr.life/eWalletPayment/success',
          cancel_url: "https://363ebfbe380190.lhr.life/eWalletPayment"
        }
      }
    })
  };

  try {
    // send the request to the paymongo api and return the response data
    const res = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
    const data = await res.json();
    console.log('res_1: ', data);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}