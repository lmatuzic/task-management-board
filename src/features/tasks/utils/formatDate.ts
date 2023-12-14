export const formatDate = (date: Date) => {
    if (!(date instanceof Date)) {
        return '';
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`; // month is 0-indexed
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;

    return `${year}-${month}-${day}`;
};
