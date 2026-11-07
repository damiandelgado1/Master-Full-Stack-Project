import React, { useEffect, useState } from "react";
import List from "./List";
import Form from "./Form";
import useApi from "../../hooks/useApi";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loadingError, setLoadingError] = useState("")

    const api = useApi()

    const loadWishlist = async () => {
        setLoadingError("")

        try {
            const data = await api.get("wishlist/")
            setWishlist(data);
        } catch {err} {
            console.error(err);
            setLoadingError(err.message);
        }
    }

    useEffect(() => {
        loadWishlist();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white container mx-auto">
            <Form onSuccess={loadWishlist}/>
            <List items={wishlist} error={loadingError}/>
        </div>
    )
}

export default Wishlist;