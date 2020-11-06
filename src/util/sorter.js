/**
 * invertSortType
 * @Belingheri
 * @description Inverte il tipo passato in input
 * @param {string} sortType tipo di ordinamento
 * @returns tipo di ordinamento opposto a quallo in input
 */
export function invertSortType(sortType = "asc") {
  if (sortType !== "asc" && sortType !== "desc")
    throw new Error("Input value not valid");
  return sortType === "asc" ? "desc" : "asc";
}
