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

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>Please Payment : {order?.mealName}</h2>
    </div>
  );
};

export default Payment;
