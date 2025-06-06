export const getMelomanLabel = (count: number) => {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return `${count} Меломанів`;
  if (n1 > 1 && n1 < 5) return `${count} Меломани`;
  if (n1 === 1) return `${count} Меломан`;
  return `${count} Меломанів`;
};
