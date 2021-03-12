const ErrorComponent = ({ message, color }) => {
    return(
        <div className="wrapper">
            <h3 style={{color: color}}>{message}</h3>
        </div>
    )
}

export default ErrorComponent