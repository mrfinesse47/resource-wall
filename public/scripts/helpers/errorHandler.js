const errorHandler = (message) => {
  $("#error-msg").slideDown(10);
  $("#error-msg p").text(`${message}`);
};
//Animation for error message component, to be called on forms
