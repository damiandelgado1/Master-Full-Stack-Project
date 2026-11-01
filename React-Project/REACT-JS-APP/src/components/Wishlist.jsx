import React, { useEffect, useState } from "react";

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
        }
    }

    useEffect(() => {
        loadWishlist();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white container mx-auto">
            <ul>
                {wishlist.map((item) => {
                    <li key={item.id} className="list-disc">
                        <span className="font-bold">
                            {item.text}
                        </span>
                        <span className="text-gray-400 ml-2 inline-block">
                            Escrito por: {item.author_name}
                        </span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Wishlist;