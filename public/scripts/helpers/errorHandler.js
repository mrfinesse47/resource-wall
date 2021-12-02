const errorHandler = (message) => {
  $("#error-msg").slideDown("slow");
  $("#error-msg p").text(`${message}`);
};
