import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router"

export default function Searchbar() {
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("")
    const [ ariaInvalid , setAriaInvalid ] = useState(null)

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`)
            setSearch('')
        } else {
            setAriaInvalid(true);
        }
    }

    return (
        <>
        <form className="flex items-center gap-2" onSubmit={handleSearch}>
            <input 
                type="text" 
                name="search" 
                placeholder="Cerca..." 
                className="input input-bordered w-24 md:w-auto" 
                onChange={(event) => setSearch(event.target.value)}
                value={search}
                aria-invalid={ariaInvalid}
            />
            <button type="submit" className="btn btn-primary btn-circle"><FaSearch /></button>
        </form>
        </>
    )
}