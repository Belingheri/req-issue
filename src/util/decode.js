/**
 * decocdeError
 * @description estrae il messaggio di errore dall'oggeto restituito dal db
 * @Belingheri
 * @param {string} errorObj message from db
 */
export function decodeError(errorObj) {
  return errorObj && errorObj.err && errorObj.err.message
    ? errorObj.err.message
    : errorObj;
}
