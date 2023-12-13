export const formatDate = (date: Date) => {
    let formattedDate = '';

    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
        const day = String(date.getDate()).padStart(2, '0');

        formattedDate = `${year}-${month}-${day}`;
    }

    return formattedDate;
};
