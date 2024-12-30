
export const getPaymentIntentDetails = async (payment_intent_id: string ) => {

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        // TODO: Place this in the .env file
        authorization: 'Basic c2tfdGVzdF9uYjNqZjR3Wk1tNVgyNjZwcnRnWm4zbmo6'
        }
    };

    try{
        const response = await fetch(`https://api.paymongo.com/v1/payment_intents/${payment_intent_id}`, options);
        const result = await response.json();
        console.log("Get Payment Intent Details", result);
        return result
    } catch (error) {
        console.error(error);
    }
    
    // fetch('https://api.paymongo.com/v1/payment_intents/pi_WEPdgjbSwFVXdTi276zA126S', options)
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err));

}