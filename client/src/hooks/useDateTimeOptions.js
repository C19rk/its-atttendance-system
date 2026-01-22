import { useMemo } from "react";

export default function useDateTimeOptions() {
  const dateOptions = useMemo(
    () => ({
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    []
  );

  const timeOptions = useMemo(
    () => ({
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Manila", 
    }),
    []
  );

  const toGMT8 = (utcDate) => {
    if (!utcDate) return null;
    return new Date(utcDate);
  };

  return {
    dateOptions,
    timeOptions,
    toGMT8,
  };
}
