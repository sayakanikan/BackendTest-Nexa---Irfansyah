export function successResponse(res, data, message = "Success", statusCode = 200) {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
}

export function errorResponse(res, errors = "Something went wrong", statusCode = 500, message = null) {
  return res.status(statusCode).json({
    status: "error",
    errors,
    message,
  });
}