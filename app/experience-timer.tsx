'use client';

import { useEffect, useState } from 'react';

/** 30 May 2022, 8:00 AM Asia/Manila. */
const EXPERIENCE_START_MS = Date.parse('2022-05-30T08:00:00+08:00');

function splitElapsed(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return { hours, minutes, seconds };
}

function formatClock(totalSeconds: number) {
  const { hours, minutes, seconds } = splitElapsed(totalSeconds);
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function spokenDuration(totalSeconds: number) {
  const { hours, minutes, seconds } = splitElapsed(totalSeconds);
  return `Live duration of full-stack development experience: ${hours.toLocaleString('en-US')} hours, ${minutes} minutes, ${seconds} seconds.`;
}

export default function ExperienceTimer() {
  const [elapsedSec, setElapsedSec] = useState<number | null>(null);
  const [announced, setAnnounced] = useState('');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let intervalId = 0;

    const update = () => {
      const next = Math.max(0, Math.floor((Date.now() - EXPERIENCE_START_MS) / 1000));
      setElapsedSec(next);
      setAnnounced((prev) => {
        if (!prev || next % 60 === 0) return spokenDuration(next);
        return prev;
      });
    };

    const stop = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = 0;
    };

    const start = () => {
      stop();
      update();
      if (media.matches) return;
      intervalId = window.setInterval(update, 1000);
    };

    const onMotionChange = () => start();
    start();
    media.addEventListener('change', onMotionChange);
    return () => {
      stop();
      media.removeEventListener('change', onMotionChange);
    };
  }, []);

  const clock = elapsedSec === null ? '00000:00:00' : formatClock(elapsedSec);

  return (
    <p className="experience-timer">
      <span className={`experience-timer-visual${elapsedSec === null ? ' is-pending' : ''}`} aria-hidden="true">
        <span className="experience-timer-clock-wrap">
          <span className="status-dot" />
          <span className="experience-timer-clock" translate="no">{clock}</span>
        </span>
        <span className="experience-timer-label">full-stack development experience</span>
      </span>
      <span className="visually-hidden" aria-live="polite">{announced}</span>
    </p>
  );
}
