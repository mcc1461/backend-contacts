const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  const errorResponse = {
    title: "",
    message: "",
    stackTrace: err.stack,
  };

  switch (statusCode) {
    case 400:
      errorResponse.title = "Validation Failed";
      errorResponse.message = err.message || "Validation error occurred";
      break;
    case 401:
      errorResponse.title = "Unauthorized";
      errorResponse.message = "Access denied";
      break;
    case 403:
      errorResponse.title = "Forbidden";
      errorResponse.message = "Access denied";
      break;
    case 404:
      errorResponse.title = "Not Found";
      errorResponse.message = "Resource not found";
      break;
    case 500:
      errorResponse.title = "Server Error";
      errorResponse.message = "Internal server error";
      break;
    default:
      console.log(err.message);
      return;
  }

  res.json(errorResponse);
};

module.exports = errorHandler;
