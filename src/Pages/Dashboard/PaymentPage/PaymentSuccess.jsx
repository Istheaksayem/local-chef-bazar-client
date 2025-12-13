import { useSearchParams } from "react-router";
import { useEffect } from "react";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const orderId = params.get("orderId");

    useEffect(() => {
        fetch(`http://localhost:5000/orders/payment/${orderId}`, {
            method: "PATCH",
        });
    }, [orderId]);

    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-green-600">
                Payment Successful 🎉
            </h2>
        </div>
    );
};

export default PaymentSuccess;
