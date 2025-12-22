import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)

    useEffect(() => {
        if (sessionId) {
            fetch("https://local-chef-bazar-server-theta.vercel.app/payment-success", {
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
             <Helmet><title>PaymentSuccess | local chef Bazar</title></Helmet>
            <h2 className="text-3xl font-bold text-green-600">
                Payment Successful 🎉
            </h2>
        </div>
    );
};

export default PaymentSuccess;
