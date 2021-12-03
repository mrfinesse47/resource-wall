const errorHandler = (message) => {
  $("#error-msg").slideDown(10);
  $("#error-msg p").text(`${message}`);
};
