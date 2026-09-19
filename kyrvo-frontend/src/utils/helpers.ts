export const getFormattedDate = (d: number) => {
  const date = new Date(d);
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
};

export const getMonthName = (dateString?: string) => {
  if (!dateString) return 'Unknown Month';
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'long' });
};

export const getDay = (dateString?: string) => {
  if (!dateString) return 'Unknown Day';
  const date = new Date(dateString);
  return date.getDate();
};

export const getSydneyTime = () => {
  const now = new Date();

  // Define options for time formatting
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Australia/Sydney',
  };

  // Format the time to Sydney's timezone
  const sydneyTime = new Intl.DateTimeFormat('en-AU', options).format(now);
  return sydneyTime.toUpperCase();
};

export const getImageUrl = (id: string) => {
  const uri = import.meta.env.VITE_STATIC_URL;
  return uri + id;
};

export const createDateFromDDMMYYYYHHMM = (dateString: string) => {
  // Split the string into date and time components
  if (dateString) {
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');

    // Adjust month: JavaScript months are 0-based
    const month = parseInt(dateParts[1], 10) - 1;

    // Create a new Date object
    const date = new Date(
      parseInt(dateParts[2]),
      month,
      parseInt(dateParts[0]),
      parseInt(timeParts[0]),
      parseInt(timeParts[1]),
      parseInt(timeParts[2]),
    );
    return date;
  } else {
    return null; // Invalid format
  }
};

export const convertSeconds = (seconds: number) => {
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return { days, hours, minutes, seconds };
};

export const formatCurrencyAUD = (amount: number) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount);
};

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const tryParseJSON = (jsonString: string | null | undefined) => {
  try {
    const o = JSON.parse(jsonString || '{}');
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
