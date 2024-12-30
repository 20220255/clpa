// Ewallet on hold
// 'use client'

// import { getPaymentIntentDetails } from "@/pages/api/get_payment_intent_details";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const SuccessPage = () => {

//     // Add useState here for the fields needed from the payment intent
//     const [payment_intent_id, setPaymentIntentId] = useState('')
//     const [paymentType, setPaymentType] = useState('')
//     const [name, setName] = useState('')
//     const [phone, setPhone] = useState('')
//     const [amount, setAmount] = useState(0)
//     const [email, setEmail] = useState('')

//     useEffect(() => {
//         // Get payment intent details from local storage
//         const payment_intent_id = localStorage.getItem('payment_intent_id');
//         if (!payment_intent_id) {
//             toast.error('Payment Intent/Ref ID not found')
//             return
//         }
//         setPaymentIntentId(payment_intent_id)

//         const runGetPaymentIntentDetails = async () => {
//             // API from paymongo to get payment intent details
//             const {response, payIntentError} = await getPaymentIntentDetails(payment_intent_id as string)
//             if (payIntentError) {
//                 toast.error(payIntentError)
//                 return
//             }
//             console.log('payment intent response: ', response)
//             setPaymentType(response.data.attributes.payments[0].attributes.source.type)
//             setName(response.data.attributes.payments[0].attributes.billing.name)
//             setPhone(response.data.attributes.payments[0].attributes.billing.phone)
//             setAmount(response.data.attributes.amount / 100)
//             setEmail(response.data.attributes.payments[0].attributes.billing.email)
//         }
//         runGetPaymentIntentDetails()
//     }, [])
//     return (
//         <div className="success-page">
//             <div className="container-success dark:bg-blue-900">
//                 <h1 className="title dark:text-blue-200">Payment Successful!</h1>
//                 <div className="table-container">
//                     <table className="table dark:text-white dark:bg-gray-800">
//                         <tbody>
//                             <tr className="bg-sky-100 dark:bg-gray-700">
//                                 <td>Ref ID</td>
//                                 <td>{payment_intent_id}</td>
//                             </tr>
//                             <tr >
//                                 <td>Payment Type</td>
//                                 <td>{paymentType}</td>
//                             </tr>
//                             <tr className="bg-sky-100 dark:bg-gray-700">
//                                 <td>Name</td>
//                                 <td>{name}</td>
//                             </tr>
//                             <tr>
//                                 <td>Phone</td>
//                                 <td>{phone}</td>
//                             </tr>
//                             <tr className="bg-sky-100 dark:bg-gray-700" >
//                                 <td>Amount</td>
//                                 <td>{amount.toFixed(2)}</td>
//                             </tr>
//                             <tr >
//                                 <td>Email</td>
//                                 <td>{email}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default SuccessPage
