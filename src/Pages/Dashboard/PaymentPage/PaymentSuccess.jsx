import { useEffect } from "react";
import { useSearchParams } from "react-router";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)

    useEffect(() => {
        if (sessionId) {
            fetch("http://localhost:5000/payment-success", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ session_id: sessionId }),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Backend response:", data);
                })
                .catch(err => console.error(err));
        }
    }, [sessionId]);
    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-green-600">
                Payment Successful 🎉
            </h2>
        </div>
    );
};

export default PaymentSuccess;
