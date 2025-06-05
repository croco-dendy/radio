const users = new Set<string>();
const lastSeen = new Map<string, number>();

export interface User {
  nickname: string;
  lastSeen: string;
}

export function addUser(nickname: string) {
  users.add(nickname);
  updateUserLastSeen(nickname);
}

export function removeUser(nickname: string) {
  users.delete(nickname);
  lastSeen.delete(nickname);
}

export function getUsers(): User[] {
  return Array.from(users).map((nickname) => ({
    nickname,
    lastSeen: new Date(lastSeen.get(nickname) ?? Date.now()).toISOString(),
  }));
}

export function updateUserLastSeen(nickname: string) {
  lastSeen.set(nickname, Date.now());
}
