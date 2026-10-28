'use client';

/** 14 February 2022, 8:00 AM Asia/Manila (UTC+8, no daylight saving). */
const ANCHOR_MS = Date.parse('2022-02-14T08:00:00+08:00');
const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000;

/** Completed calendar years in Asia/Manila since the anchor. Does not tick. */
export function completedFullYears(now = Date.now()): number {
  if (now < ANCHOR_MS) return 0;
  const manila = new Date(now + MANILA_OFFSET_MS);
  let years = manila.getUTCFullYear() - 2022;
  const month = manila.getUTCMonth() + 1;
  const day = manila.getUTCDate();
  const hour = manila.getUTCHours();
  const beforeAnniversary = month < 2 || (month === 2 && (day < 14 || (day === 14 && hour < 8)));
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}

export function experienceLine(now = Date.now()): string {
  return `${completedFullYears(now)}+ years of full-stack development experience`;
}

export default function ExperienceYears() {
  return (
    <p className="experience-years" suppressHydrationWarning>
      {experienceLine()}
    </p>
  );
}
