// Helper functions, constants etc.

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

const getFormattedCommentDate = (comments) => {
  if (!Array.isArray(comments)) {
    throw new Error(
      "Invalid comments data. Please provide an array of comments."
    );
  }

  const now = new Date();

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  return comments.map((comment) => {
    if (!comment.created_at || !(comment.created_at instanceof Date)) {
      throw new Error(
        "Invalid comment date. Please provide a valid Date object."
      );
    }

    const commentTime = comment.created_at;
    const timeDiff = now - commentTime;
    const seconds = Math.floor(timeDiff / 1000);

    if (seconds < 60) {
      return { ...comment, formattedDate: rtf.format(-seconds, "second") };
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return { ...comment, formattedDate: rtf.format(-minutes, "minute") };
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return { ...comment, formattedDate: rtf.format(-hours, "hour") };
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return { ...comment, formattedDate: rtf.format(-days, "day") };
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return { ...comment, formattedDate: rtf.format(-weeks, "week") };
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return { ...comment, formattedDate: rtf.format(-months, "month") };
    }

    const years = Math.floor(days / 365);
    return { ...comment, formattedDate: rtf.format(-years, "year") };
  });
};

module.exports = { formatDate, getFormattedCommentDate };
