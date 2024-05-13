import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AlreadyLoggedIn() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCounter(prevCounter => prevCounter + 1);
            navigate('/');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container py-5 mb-5 mt-5">
            <div className="row justify-content-center">
                <h2>Already Registered!</h2>
                <p>Redirecting to the home page in {counter} seconds...</p>
            </div>
        </div>
    );
}

export default AlreadyLoggedIn;
