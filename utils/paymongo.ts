'use server'

type CheckoutResponse = {
    checkoutError?: string
    response?: any
}

/**
 * Create a Paymongo Checkout Session
 * @param amount 
 * @param clerkId 
 * @returns {Promise<CheckoutResponse>}
 */
export const createCheckoutSession = async (amount: number, clerkId: string): Promise<CheckoutResponse> => {
    const secretKey = process.env.PAYMONGO_SECRET_KEY;
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
                            amount: amount * 100,
                            description: 'Laundry Services',
                            name: 'Wash/Dry/Other Items',
                            quantity: 1
                        }
                    ],
                    statement_descriptor: 'Snapwash-' + clerkId,
                    payment_method_types: ['gcash', 'paymaya', 'grab_pay'],
                    success_url: `${domainName}/eWalletPayment/success`,
                    cancel_url: `${domainName}/eWalletPayment`
                }
            }
        })
    };

    try {
        const res = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const response = await res.json();
        return { response: response.data };
    } catch (error) {
        return { checkoutError: (error as string) || 'Something went wrong while creating checkout session' }
    }
}

type IntentResponse = {
    payIntentError?: string
    response?: any
}

/**
 * Get Paymongo Payment Intent Details
 * @param payment_intent_id 
 * @returns {Promise<IntentResponse>}
 */
export const getPaymentIntentDetails = async (payment_intent_id: string): Promise<IntentResponse> => {
    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: `Basic ${secretKey}`,
        }
    };

    try {
        const response = await fetch(`https://api.paymongo.com/v1/payment_intents/${payment_intent_id}`, options);
        const result = await response.json();
        return { response: result }
    } catch (error) {
        return { payIntentError: 'Something went wrong while getting payment intent details ' + error }
    }
}
