export const capitalizeFirstLetter = (ss) => {
  if (typeof ss === 'string')
    return ss
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
};
