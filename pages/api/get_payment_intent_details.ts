'use server'

type Response = {
    payIntentError?: string
    response?: any
  }
  
  /**
   * 
   * @param amount 
   * @param clerkId 
   * @returns {Promise<Response>}
   */

export const getPaymentIntentDetails = async (payment_intent_id: string ): Promise<Response> => {

    // retrieves the paymongo secret key from the environment variable
    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    console.log('secret key: ', secretKey);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: `Basic ${secretKey}`,
        }
    };

    try{
        const response = await fetch(`https://api.paymongo.com/v1/payment_intents/${payment_intent_id}`, options);
        const result = await response.json();
        console.log('payment intent details result: ', result);
        return {response: result}
    } catch (error) {
        return {payIntentError: 'Something went wrong while getting payment intent details ' + error}
    }
    
}