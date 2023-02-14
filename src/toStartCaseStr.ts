export function toStartCaseStr(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, (str2, $1, $2) => `${$1} ${$2}`)
    .replace(/([a-z])([0-9])/gi, (str2, $1, $2) => `${$1} ${$2}`)
    .replace(/(\s|^)(\w)/g, (str2, $1, $2) => $1 + $2.toUpperCase())
    .trim();
}
