import { DateTime } from "luxon";

function FormatedDate({ isoDate }) {
  const formattedDate = DateTime
    .fromISO(isoDate)
    .toFormat("HH:mm:ss dd.MM.yyyy");

  return <span>{formattedDate}</span>;
}

export default FormatedDate;