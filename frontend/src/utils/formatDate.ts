export default function formatDate(dt: Date | null) {
  if (!dt) return undefined;
  const date = new Date(dt).toDateString().split(' ');
  return `${date[1]} ${date[2]}, ${date[3]}`;
}
