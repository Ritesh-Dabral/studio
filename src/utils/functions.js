export function convertBytesToKBOrMB(bytes, decimalPlaces = 2) {
    if (bytes < 1024) {
        return bytes.toFixed(decimalPlaces) + " B";
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(decimalPlaces) + " KB";
    } else {
        return (bytes / (1024 * 1024)).toFixed(decimalPlaces) + " MB";
    }
}