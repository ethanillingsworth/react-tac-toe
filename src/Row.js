function Row({ props, children }) {
    return (<div className="Row" id={props.id}>
        {children}
    </div>)
}

export default Row