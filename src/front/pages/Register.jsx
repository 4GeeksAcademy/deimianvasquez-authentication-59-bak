import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner"

const initialUserState = {
    lastname: "",
    email: "",
    avatar: null,
    password: ""
}

const urlBase = import.meta.env.VITE_BACKEND_URL


const Register = () => {

    const [user, setUser] = useState(initialUserState)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({}); // { password: '...', confirm: '...' }
    const fileInputRef = useRef(null)

    const navigate = useNavigate()


    const handleFileChange = (event) => {
        const file = event.target.file[0]

        setUser({
            ...user,
            avatar: file
        })

    }

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })

    }

    const handleConfirmChange = (e) => {
        setConfirmPassword(e.target.value);
        // validar coincidencia en cada cambio para experiencia UX
        if (user.password && e.target.value !== user.password) {
            setErrors(prev => ({ ...prev, confirm: 'Las contraseñas no coinciden' }));
        } else {
            setErrors(prev => ({ ...prev, confirm: null }));
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        // validar que todos los campos esten llenos

        if (user.password !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirm: 'Las contraseñas no coinciden' }));
            return;
        }

        const formData = new FormData()
        formData.append("lastname", user.lastname)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)


        const response = await fetch(`${urlBase}/register`, {
            method: "POST",
            body: formData
        })
        // const data = await response.json()

        if (response.ok) {
            setUser(initialUserState)
            fileInputRef.current.value = null

            setTimeout(() => {
                navigate("/login")

            }, 1500)


        } else if (response.status == 409) {
            toast.error("El uaurio ya existe")
        } else {
            toast.error("Error al registrar uausio intente nuevamente")
        }
    }



    return (
        <div className="container">
            <Toaster position="top-right" />
            <div className="vh-100  d-flex flex-column home-container justify-content-center" >
                <div className="row justify-content-center my-5 p-4">
                    <h2 className="text-center">Registrate en mi web de lista de tareas</h2>

                    <div className="col-12 col-md-6 p-4 border">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group mb-3">
                                <label htmlFor="txtLastname">Nombre Completo</label>
                                <input
                                    type="text"
                                    placeholder="Jhon Doe"
                                    className="form-control "
                                    id="txtLastname"
                                    name="lastname"
                                    onChange={handleChange}
                                    value={user.lastname}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="txtEmail">Correo</label>
                                <input
                                    type="email"
                                    placeholder="usuario@gmail.com"
                                    className="form-control"
                                    id="txtEmail"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                    required />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="txtAvatar">Avatar</label>
                                <input
                                    type="file"
                                    placeholder="Avatar"
                                    className="form-control"
                                    id="txtAvatar"
                                    name="avatar"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}

                                />
                            </div>


                            <div className="form-group mb-3">
                                <label htmlFor="btnPassword">Contraseña:</label>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="form-control"
                                    id="btnPassword"
                                    name="password"
                                    onChange={handleChange}
                                    value={user.password}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="btnValidatePassword">Vuelve a escribir la Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="Contraseña nuevamente"
                                    className="form-control"
                                    id="btnValidatePassword"
                                    name="validatePasword"
                                    value={confirmPassword}
                                    onChange={handleConfirmChange}

                                />
                                {errors.confirm && <div className="text-danger mt-1">{errors.confirm}</div>}
                            </div>

                            <button
                                className="btn btn-outline-primary w-100"
                            >Iniciar Sesión</button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register;