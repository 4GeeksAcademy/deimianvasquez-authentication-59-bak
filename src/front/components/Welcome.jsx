import useGlobalReducer from "../hooks/useGlobalReducer";



const Welcome = () => {
    const { store } = useGlobalReducer()
    const { user } = store
    return (
        <>
            {
                store.user != null &&
                <div className="container my-3 ">
                    <p>Hola ¿qué tal {`${user?.lastname}`}?</p>
                    <p>MI correo es: {user?.email}</p>
                    <div>
                        <img className="welcome-image" src={user?.image} alt="" />
                    </div>
                    {
                        !user?.is_active &&
                        <div className="alert alert-warning mt-3" role="alert">
                            Tu cuenta no está activada. Por favor, revisa tu correo electrónico para activar tu cuenta.
                        </div>
                    }
                </div>
            }
        </>

    )
}

export default Welcome;