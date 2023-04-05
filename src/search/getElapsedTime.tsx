import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function getElapsedTime(createdAt: string) {
  const timeDiffDuration: Duration = dayjs.duration(dayjs().diff(createdAt));
  const yearDifference: number = parseInt(timeDiffDuration.format('Y'));
  const monthDifference: number = parseInt(timeDiffDuration.format('M'));
  const dateDifference: number = parseInt(timeDiffDuration.format('D'));
  const hourDifference: number = parseInt(timeDiffDuration.format('H'));
  const minuteDifference: number = parseInt(timeDiffDuration.format('m'));
  const secondDifference: number = parseInt(timeDiffDuration.format('s'));

  if (yearDifference > 0) {
    return `${yearDifference}년 전`;
  } else if (monthDifference > 0) {
    return `${monthDifference}달 전`;
  } else if (dateDifference > 0) {
    return `${dateDifference}일 전`;
  } else if (hourDifference > 0) {
    return `${hourDifference}시간 전`;
  } else if (minuteDifference > 0) {
    return `${minuteDifference}분 전`;
  } else if (secondDifference > 0) {
    return `${secondDifference}초 전`;
  } else {
    return '';
  }
}
