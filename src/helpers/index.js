export const formatMovieTitle = (title) => {
  const RegExp = / |(: )/g;
  return title.toLowerCase().replace(RegExp, "-");
};
