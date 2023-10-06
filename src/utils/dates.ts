import moment from 'moment-timezone';
import { useI18n } from 'vue-i18n';

export const timeSince = (date: string | null) => {
  const { t } = useI18n();

  if (!date) {
    return t('common.unknown');
  }

  const seconds = moment.utc().diff(moment.utc(date), 'seconds');
  if (seconds < 1) {
    return t('utils.just_now');
  }

  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} ${t('utils.years_ago')}`;
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} ${t('utils.months_ago')}`;
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} ${t('utils.days_ago')}`;
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} ${t('utils.hours_ago')}`;
  }

  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} ${t('utils.minutes_ago')}`;
  }

  return `${Math.floor(interval)} ${t('utils.seconds_ago')}`;
};
