declare global {
    interface Window {
        FUNC_API_URL: any;
    }
}

export default function getApiBase() {
    if (window.FUNC_API_URL == "$FUNC_API_URL") {
        return "http://localhost:8081/";
    }
    return window.FUNC_API_URL
}
