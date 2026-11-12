'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Saved stock ideas ("watchlist"), kept in this browser only. Falls back to memory when
 * storage is blocked. Every component using the hook stays in sync via a window event.
 */
const KEY = 'maa-watchlist';
const EVT = 'maa-watchlist-change';
let memory: string[] = [];

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : memory;
  } catch {
    return memory;
  }
}

function write(ids: string[]) {
  memory = ids;
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* storage blocked: memory only */ }
  window.dispatchEvent(new Event(EVT));
}

export function useWatchlist() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(EVT, sync); window.removeEventListener('storage', sync); };
  }, []);
  const toggle = useCallback((id: string) => {
    const cur = read();
    write(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  }, []);
  return { ids, has: (id: string) => ids.includes(id), toggle };
}
