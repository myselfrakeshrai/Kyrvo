export const safelyPraseInt = (n: string) => {
  try {
    const val = parseInt(n);
    if (!isNaN(val)) {
      return val;
    }
    return -100000;
  } catch (error) {
    return -100000;
  }
};

export const getCurrentDateString = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};

export const getDateOffsetByDays = (days: number, date?: Date | null) => {
  const today = date ? date : new Date();
  today.setDate(today.getDate() + days);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
};

export const createDateFromDDMMYYYYHHMM = (dateString: string) => {
  // Split the string into date and time components
  if (dateString) {
    const parts = dateString.split(" ");
    const dateParts = parts[0].split("/");
    const timeParts = parts[1].split(":");

    // Adjust month: JavaScript months are 0-based
    const month = parseInt(dateParts[1], 10) - 1;

    // Create a new Date object
    const date = new Date(
      parseInt(dateParts[2]),
      month,
      parseInt(dateParts[0]),
      parseInt(timeParts[0]),
      parseInt(timeParts[1]),
      parseInt(timeParts[2])
    );
    return date;
  } else {
    return null; // Invalid format
  }
};
