const ErrorViewer = ({ errorMessage }) => {
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                    <div className="alert alert-danger text-center" role="alert">
                        <h4 className="alert-heading">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Ocurrió un error
                        </h4>
                        <hr />
                        <p className="mb-0">
                            {errorMessage || "No se pudo completar la operación. Por favor, intentá nuevamente."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ErrorViewer;