import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router';

const Payment = () => {
  const { id } = useParams();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/order/${id}`)
      return res.json();
    }
  })

  const handlePayment =async() =>{
    const paymentInfo ={
        price:order.price,

    }
    const res =await fetch('http://localhost:5000/create-checkout-session',{
        method:'POST',
        headers:{
             'Content-Type': 'application/json',
        },
        body:JSON.stringify(paymentInfo)

    })
    const data =await res.json()
    console.log(data)

    window.location.replace(data.url)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>Please Payment for ${order.price} : {order?.mealName}</h2>
      <button
      onClick={handlePayment}
      className='btn btn-primary'>Pay</button>
    </div>
  );
};

export default Payment;
