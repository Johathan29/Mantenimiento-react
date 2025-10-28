// hooks/useActivityKeepAlive.js
import { useEffect, useRef } from 'react';
import { keepAlive, logout } from '../Services/authService';

export default function useActivityKeepAlive({ idleTimeoutMinutes = 20, pingIntervalSeconds = 60 } = {}) {
  const lastActivityRef = useRef(Date.now());
  const timerRef = useRef(null);
  const pingRef = useRef(null);

  useEffect(() => {
    const activity = () => {
      lastActivityRef.current = Date.now();
    };

    const events = ['mousemove','mousedown','keydown','touchstart','scroll','click'];

    events.forEach(e => window.addEventListener(e, activity, { passive: true }));

    // periodic ping to keep session alive (only if there is a backendToken)
    pingRef.current = setInterval(async () => {
      const token = localStorage.getItem('backendToken');
      if (!token) return;
      const idleMs = Date.now() - lastActivityRef.current;
      if (idleMs < idleTimeoutMinutes * 60 * 1000) {
        try {
          await keepAlive();
        } catch (err) {
          // If keepAlive failed (session expired), force logout
          localStorage.removeItem('backendToken');
          // optional UI reaction: reload to force route guard
          window.location.href = '/login';
        }
      } else {
        // idle too long -> logout locally
        await logout();
        window.location.href = '/login';
      }
    }, pingIntervalSeconds * 1000);

    return () => {
      events.forEach(e => window.removeEventListener(e, activity));
      clearInterval(pingRef.current);
    };
  }, [idleTimeoutMinutes, pingIntervalSeconds]);
}
