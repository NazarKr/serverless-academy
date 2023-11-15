function errorTemplate(error, success = false) {
  return { success, error };
}

module.exports = { errorTemplate };