'use server'

type Response = {
  checkoutError?: string
  response?: any
}

/**
 * 
 * @param amount 
 * @param clerkId 
 * @returns {Promise<Response>}
 */

export const createCheckoutSession = async (amount: number, clerkId: string): Promise<Response> => {

    // retrieves the paymongo secret key from the environment variable
    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    // retrieves the domain name from the environment variable
    const domainName = process.env.DOMAIN_NAME;

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
                    // it is multiplied by 100 to convert since Paymngo divides the amount by 100
                    amount: amount * 100,
                    description: 'Laundry Services',
                    name: 'Wash/Dry/Other Items',
                    quantity: 1
                  }
                ],
                // this is the clerk id of the logged in user, to be used to save the payment in the database
                // and display it on the success page
                statement_descriptor: 'Snapwash-' + clerkId, 
                payment_method_types: ['gcash', 'paymaya', 'grab_pay'],
                success_url: `${domainName}/eWalletPayment/success`,
                cancel_url: `${domainName}/eWalletPayment`
              }
            }
          })
        };
          
        try {
          // send the request to the paymongo api and return the response data
          const res = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
          const response = await res.json();
          return {response: response.data} ;
      } catch (error) {
          return {checkoutError: (error as string) || 'Something went wrong while creating checkout session'}
      }
  }