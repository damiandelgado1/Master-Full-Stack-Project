import React, { useEffect, useState } from "react";
import List from "./List";
import Form from "./Form";

const wishlistEndpoint = "https://academia.conquerblocks.com/playground/api/v1/wishlist/";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loadingError, setLoadingError] = useState("")

    const loadWishlist = async () => {
        setLoadingError("")
        const wishlistEndpoints = "https://academia.conquerblocks.com/playground/api/v1/wishlist/"

        try {
            const response = await fetch(wishlistEndpoints)

            if (!response.ok) {
                throw new Error("La carga del wishlist ha fallado");
            }

            const data = await response.json()

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