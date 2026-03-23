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

        if (search.length < 3) {
            setError("La busqueda debe tener al menos 3 caracteres")
            return
        }

        if (search !== "") {
            localStorage.setItem("lastSearch", search)
        }

        setError("")
    }, [search])

    useEffect(() => {
        const savedSearch = localStorage.getItem("lastSearch")
        if (savedSearch) {
            setSearch(savedSearch)
        }
    }, [])

    return { search, setSearch, error }
}