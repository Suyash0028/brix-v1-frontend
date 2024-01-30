// Store data with timestamp in localStorage
export const storeDataWithTimestamp = (key, data, expirationMinutes) => {
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + expirationMinutes * 60 * 1000; // Convert minutes to milliseconds

    const item = {
        data,
        expires: expirationTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
};

// Retrieve data from localStorage and check expiration
export const retrieveDataWithTimestamp = (key) => {
    const storedItem = localStorage.getItem(key);

    if (!storedItem) {
        return null; // Item not found
    }

    const { data, expires } = JSON.parse(storedItem);
    const currentTime = new Date().getTime();

    if (currentTime > expires) {
        localStorage.removeItem(key); // Remove expired item
        return null;
    }

    return data;
};