export const capitalize = (text: string) => {
    text = text.replaceAll('_', ' ')
    return `${text.charAt(0).toUpperCase()}${text.toLowerCase().slice(1)}`;
}