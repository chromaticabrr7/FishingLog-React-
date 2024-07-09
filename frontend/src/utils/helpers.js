import Toast from "../components/Toast/Toast";

export const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const displayToast = (show, heading, description) => {
    const [toastHeading, setToastHeading] = useState(null);
    const [toastDescription, setToastDescription] = useState(null);
    const [showToast, setShowToast] = useState(null);
    const toastContents = {
        heading: toastHeading,
        description: toastDescription,
        status: showToast
    }

    setToastHeading(heading);
    setToastDescription(description);
    setShowToast(show);

    return toastContents;
}