import type { UserProfile } from '../types/user';
import { STORAGE_KEYS } from './constants';

export function createDefaultProfile(): UserProfile {
  return {
    createdAt: Date.now(),
    exploredNodeIds: [],
    bookmarkedNodeIds: [],
    lastOpenedDate: '',
  };
}

export function loadUserProgress(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (raw) {
      return JSON.parse(raw) as UserProfile;
    }
  } catch {
    // corrupted data, reset
  }
  return createDefaultProfile();
}

export function saveUserProgress(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(profile));
}
