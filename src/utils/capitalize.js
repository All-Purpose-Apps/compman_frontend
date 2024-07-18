export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str, delimiter = ' ') {
  return str
    .split(delimiter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(delimiter);
}
