module.exports.message = (status, message) => {
  result = {
    status: (status) ? "Success" : "Error",
    message: message,
  };

  return result;
};
