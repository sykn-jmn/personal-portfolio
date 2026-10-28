'use client';

import { useEffect, useState } from 'react';

/** 30 May 2022, 8:00 AM Asia/Manila (UTC+8). */
const ANCHOR_MS = Date.parse('2022-05-30T08:00:00+08:00');

type Elapsed = {
  hours: number;
  minutes: number;
  seconds: number;
};

function elapsedSinceAnchor(now = Date.now()): Elapsed {
  const totalSeconds = Math.max(0, Math.floor((now - ANCHOR_MS) / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function sameElapsed(a: Elapsed, b: Elapsed): boolean {
  return a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function plural(value: number, singular: string): string {
  const count = value.toLocaleString('en-US');
  return `${count} ${singular}${value === 1 ? '' : 's'}`;
}

function announcementFor(elapsed: Elapsed): string {
  return `Live duration of full-stack development experience: ${plural(elapsed.hours, 'hour')}, ${plural(elapsed.minutes, 'minute')}, ${plural(elapsed.seconds, 'second')}.`;
}

export default function ExperienceTimer() {
  const [elapsed, setElapsed] = useState(elapsedSinceAnchor);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeoutId = 0;
    let intervalId = 0;

    const publish = () => {
      const next = elapsedSinceAnchor();
      setElapsed((current) => (sameElapsed(current, next) ? current : next));
    };

    const stop = () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      timeoutId = 0;
      intervalId = 0;
    };

    const start = () => {
      stop();
      publish();
      if (media.matches) {
        setLive(false);
        return;
      }
      setLive(true);
      const delay = 1000 - (Date.now() % 1000);
      timeoutId = window.setTimeout(() => {
        publish();
        intervalId = window.setInterval(publish, 1000);
      }, delay);
    };

    start();
    media.addEventListener('change', start);
    return () => {
      stop();
      media.removeEventListener('change', start);
    };
  }, []);

  const clock = `${elapsed.hours}:${pad2(elapsed.minutes)}:${pad2(elapsed.seconds)}`;

  return (
    <p className="experience-timer">
      <span className="experience-timer-clock" aria-hidden="true">
        <span className="status-dot" />
        <time dateTime={`PT${elapsed.hours}H${elapsed.minutes}M${elapsed.seconds}S`} className="experience-timer-time" suppressHydrationWarning>
          {Array.from(clock, (character, index) => (
            character === ':'
              ? <span key={index} className="experience-timer-sep">:</span>
              : <span key={index} className="experience-timer-digit" suppressHydrationWarning>{character}</span>
          ))}
        </time>
      </span>
      <span className="experience-timer-label" aria-hidden="true">full-stack development experience</span>
      <span className="sr-only" role="timer" aria-live={live ? 'polite' : 'off'} aria-atomic="true" suppressHydrationWarning>
        {announcementFor(elapsed)}
      </span>
    </p>
  );
}
