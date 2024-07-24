export const returnPathname = () => {
  const { hash } = window.location;

  return `#/${hash.split('/')[1]}`;
};
