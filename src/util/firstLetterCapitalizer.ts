export const capitalizeFirstLetter = (ss: string) => {
  if (typeof ss === 'string')
    return ss
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
  else return '';
};
