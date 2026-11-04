import { useState } from "react";

const wishlistSaveEndpoint = "https://academia.conquerblocks.com/playground/api/v1/wishlist/";

const Form = ({onSuccess}) => {

    const [formState, setFormState] = useState({
        text: "",
        error: ""
    });

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            text: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formState.text);
    }

    const setError = async (e) => {
        e.preventDefault();

        setError()

        try {
            const payload = {
                text: formState.text
            }

            const response = await fetch(wishlistSaveEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json()

                setFormState({
                    ...formState,
                    loading: false
                });

                throw new Error(data.message || "No se pudo guardar el deseo");
            }

            setFormState({
                ...formState,
                text: "",
                loading: false
            })

            if (onSuccess) {
                onSuccess();
            }

        } catch (err) {
            console.error(err);
            
            setError(err.message);
        }
    }

    return [
        <form className="flex flex-col space-y-4 nb-4" onSubmit={onSubmit}>
            <input type="text" placeholder="Texto del deseo" className="p-2 rounded bg-gray-800 text-white" value={formState.text} onChange={handleInputChange}/>
            {formState.error && <p className="text-red-500"> {formState.error} </p>}
            <button type="submit" className="p-2 rounded bg-blue-600 text-white disabled:opacity-50" disabled={formState.loading}> {formState.loading ? "Guardando..." : "Agregar a la lista de deseos"} </button>
        </form>
    ]
}

export default Form;