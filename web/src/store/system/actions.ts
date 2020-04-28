import { SystemState } from "./types";

export function updateSession(newSession: SystemState) {
  return {
    payload: newSession
  };
}
