import {
  formatDistance,
  differenceInMinutes,
  format,
  differenceInDays,
} from 'date-fns';

export const dateTimeUtils = {
  toViewDate(date_: string) {
    const date = new Date(date_);
    const now = new Date();

    const needToShowDistance = differenceInDays(now, date) < 1;

    if (needToShowDistance) {
      return formatDistance(date, now, {
        addSuffix: true,
      });
    }

    return format(date, 'HH:mm, dd.MM.yyyy');
  },
};
