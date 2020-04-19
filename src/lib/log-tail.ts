const logTail: string[] = [];
let tailLength = 10; // default

export function setTailLength(newTailLength: number): void {
  if (newTailLength <= 0) {
    throw Error("Unexpected tailLength");
  }
  tailLength = newTailLength;
}

export function addInfo(s: string): void {
  logTail.push(s);
  if (logTail.length > tailLength) {
    logTail.shift();
  }
}

export function getLogTail(): string[] {
  return logTail;
}

export function formatDate(date: Date): string {
  return date.toISOString().substr(0, 19).replace("T", " ");
}

export function addInfoEx(entries: string | string[]): void {
  entries = Array.isArray(entries) ? entries : [entries];
  addInfo([ formatDate(new Date()), ...entries ].join(", "));
}
