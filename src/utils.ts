export function formatDate(inputDate: string | undefined) {
    if(!inputDate) {
        return ''
    }
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$1/$2/$3 $4');
    return formattedDate;
}

