import { useGlobalI18n } from '@/plugins';

const t = useGlobalI18n();
export const required = (value: any) => {

  if (value === undefined || value === null || value === '') {
    return `${t('validation.required_field')}`;
  }

  return true;
};

export const validOptionalEmail = (value: string) => {

  if(!value) return true;

  if (/.+@.+\..+/.test(value)) return true;

  return `${t('validation.valid_email')}`;
};

export const validRequiredEmail = (value: string) => {

  if (value === undefined || value === null || value === '') {
    return `${t('validation.required_field')}`;
  }

  if (/.+@.+\..+/.test(value)) return true;

  return `${t('validation.valid_email')}`;
};

export const requiredPositiveNumber = (value: string | number) => {

  if (!Number(value)) {
    return `${t('validation.required_field')}`;
  }

  return true;
};

export const lessThanOrEqual =
  (upperValue: number, message?: string) => (value: string | number) => {

    if (!value) {
      return true;
    }

    if (Number(value) > upperValue) {
      if (message) {
        return message;
      }

      return `${t('common.less_than_or_equal')} ${upperValue}`;
    }

    return true;
  };
