import { useState } from "react"
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm"
import supabase from "../../supabase/supabase-client"
import { useNavigate } from "react-router"

export default function Register() {
    const navigate = useNavigate();
    const [ formSubmitted, setFormSubmitted] = useState(false)
    const [ formErrors, setFormErrors ] = useState({})
    const [ touchedFields, setTouchedFields ] = useState({})
    const [ formState, setFormState ] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
        const errors = getErrors(error);
        setFormErrors(errors);
        console.log(errors);
        } else {
        let { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
            data: {
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.username
            }
            }
        });
        if (error) {
            alert("Signing up error 👎🏻!");
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property])
        setFormErrors((prev) => ({ ...prev, [property]: message}))
        setTouchedFields((prev) => ({ ...prev, [property]: true}))
    }

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property]
        }
        return undefined;
    }

    const setField = (property) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: e.target.value,
        }))
    }
    return (
        <form onSubmit={onSubmit} noValidate className="flex w-full h-screen sm:h-180 items-center justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Registrati</legend>

            <label className="label">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={formState.email}
                onChange={setField("email")}
                onBlur={onBlur("email")}
                aria-invalid={isInvalid("email")}
                className="input" 
                placeholder="Email" 
                required
            />
            {formErrors.email && <small className="text-sm text-error">{formErrors.email}</small>}

            <label className="label">Nome</label>
            <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formState.firstName}
                onChange={setField("firstName")}
                onBlur={onBlur("firstName")}
                aria-invalid={isInvalid("firstName")}
                className="input" 
                placeholder="Nome" 
                required
            />
            {formErrors.firstName && <small className="text-sm text-error">{formErrors.firstName}</small>}

            <label className="label">Cognome</label>
            <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formState.lastName}
                onChange={setField("lastName")}
                onBlur={onBlur("lastName")}
                aria-invalid={isInvalid("lastName")}
                className="input" 
                placeholder="Cognome" 
                required
            />
            {formErrors.lastName && <small className="text-sm text-error">{formErrors.lastName}</small>}

            <label className="label">Username</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                value={formState.username}
                onChange={setField("username")}
                onBlur={onBlur("username")}
                aria-invalid={isInvalid("username")}
                className="input" 
                placeholder="Username" 
                required
            />
            {formErrors.username && <small className="text-sm text-error">{formErrors.username}</small>}

            <label className="label">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                value={formState.password}
                onChange={setField("password")}
                onBlur={onBlur("password")}
                aria-invalid={isInvalid("password")}
                className="input" 
                placeholder="Password" 
                required
            />
            {formErrors.password && <small className="text-sm text-error">{formErrors.password}</small>}

            <button className="btn btn-neutral mt-4">Registrati</button>
            </fieldset>
        </form>
    )
}