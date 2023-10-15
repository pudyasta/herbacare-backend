export function formatTimeTo(date) {
  const desiredTime = date;
  const time = new Date();
  const [hours, minutes] = desiredTime.split(":");
  time.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return time;
}

export function stripHtml(rtf) {
  rtf = rtf.replace(/\\par[d]?/g, "");
  return rtf
    .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
    .trim();
}
