import { useEffect, useRef, useState } from "react"

export function useSearch() {
    const [search, setSearch] = useState('')
    const [error, setError] = useState("")

    //Flags
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === "" //No re-renderiza el componente porque no estamos haciendo el setError
            return
        }
        if (search === "") {
            setError("No se puede buscar una pelicula vacia")
            return
        }

        if (search.match(/^\d+$/)) {
            setError("No se puede buscar una pelicula con un numero")
            return
        }

        if (search.length < 3) {
            setError("La busqueda debe tener al menos 3 caracteres")
            return
        }

        setError("")
    }, [search])

    return { search, setSearch, error }
}