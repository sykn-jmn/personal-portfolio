'use client';

import { Fragment, useEffect, useState } from 'react';

/** 30 May 2022, 8:00 AM Asia/Manila (UTC+8, no daylight saving). */
const ANCHOR_MS = Date.parse('2022-05-30T08:00:00+08:00');
const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000;

type Parts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type CalendarElapsed = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS = [
  ['year', 'years'],
  ['month', 'months'],
  ['day', 'days'],
  ['hour', 'hours'],
  ['minute', 'minutes'],
  ['second', 'seconds'],
] as const;

type Unit = (typeof UNITS)[number][0];

function manilaParts(ms: number): Parts {
  const shifted = new Date(ms + MANILA_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    second: shifted.getUTCSeconds(),
  };
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function addMonths(parts: Parts, monthsToAdd: number): Parts {
  const zeroBased = parts.month - 1 + monthsToAdd;
  const year = parts.year + Math.floor(zeroBased / 12);
  const month = ((zeroBased % 12) + 12) % 12 + 1;
  return { ...parts, year, month, day: Math.min(parts.day, daysInMonth(year, month)) };
}

function partsToUtcMs(parts: Parts): number {
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
}

function timeReached(end: Parts, start: Parts): boolean {
  return end.day > start.day
    || (end.day === start.day && (end.hour > start.hour
      || (end.hour === start.hour && (end.minute > start.minute
        || (end.minute === start.minute && end.second >= start.second)))));
}

/** Calendar years, months, and days in Asia/Manila, then the clock remainder. */
function elapsedSinceAnchor(now = Date.now()): CalendarElapsed {
  if (now <= ANCHOR_MS) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const start = manilaParts(ANCHOR_MS);
  const end = manilaParts(now);
  let monthsTotal = (end.year - start.year) * 12 + (end.month - start.month);
  if (!timeReached(end, start)) monthsTotal -= 1;
  if (monthsTotal < 0) monthsTotal = 0;
  const years = Math.floor(monthsTotal / 12);
  const months = monthsTotal % 12;
  const cursor = addMonths(start, monthsTotal);
  const restSeconds = Math.max(0, Math.floor((partsToUtcMs(end) - partsToUtcMs(cursor)) / 1000));
  return {
    years,
    months,
    days: Math.floor(restSeconds / 86400),
    hours: Math.floor((restSeconds % 86400) / 3600),
    minutes: Math.floor((restSeconds % 3600) / 60),
    seconds: restSeconds % 60,
  };
}

function sameElapsed(a: CalendarElapsed, b: CalendarElapsed): boolean {
  return a.years === b.years && a.months === b.months && a.days === b.days
    && a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds;
}

function valueOf(elapsed: CalendarElapsed, unit: Unit): number {
  switch (unit) {
    case 'year': return elapsed.years;
    case 'month': return elapsed.months;
    case 'day': return elapsed.days;
    case 'hour': return elapsed.hours;
    case 'minute': return elapsed.minutes;
    case 'second': return elapsed.seconds;
  }
}

function visibleUnits(elapsed: CalendarElapsed): Array<[Unit, number]> {
  return UNITS.flatMap(([unit]) => {
    const value = valueOf(elapsed, unit);
    return unit === 'second' || value > 0 ? [[unit, value] as [Unit, number]] : [];
  });
}

function unitWord(unit: Unit, value: number): string {
  return value === 1 ? unit : `${unit}s`;
}

function experiencePhrase(elapsed: CalendarElapsed): string {
  return visibleUnits(elapsed).map(([unit, value]) => `${value} ${unitWord(unit, value)}`).join(', ');
}

function announcementFor(elapsed: CalendarElapsed): string {
  return `Live duration of full-stack development experience: ${experiencePhrase(elapsed)}.`;
}

function durationStamp(elapsed: CalendarElapsed): string {
  return `P${elapsed.years}Y${elapsed.months}M${elapsed.days}DT${elapsed.hours}H${elapsed.minutes}M${elapsed.seconds}S`;
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

  const units = visibleUnits(elapsed);

  return (
    <p className="experience-timer">
      <span className="experience-timer-clock" aria-hidden="true">
        <span className="status-dot" />
        <time dateTime={durationStamp(elapsed)} className="experience-timer-time" suppressHydrationWarning>
          {units.map(([unit, value], index) => (
            <Fragment key={unit}>
              {index > 0 ? ' ' : null}
              <span className={`experience-timer-part${unit === 'second' ? ' experience-timer-seconds' : ''}`}>
                <span className="experience-timer-count" suppressHydrationWarning>{value}</span>
                {' '}
                <span className="experience-timer-unit">
                  {unit}
                  {unit === 'second' ? (
                    <span className={value === 1 ? 'experience-timer-plural-pad' : undefined}>s</span>
                  ) : (
                    value === 1 ? null : 's'
                  )}
                </span>
                {index < units.length - 1 ? ',' : null}
              </span>
            </Fragment>
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
