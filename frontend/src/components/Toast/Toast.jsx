import React, {useState, useEffect} from 'react';
import {IconCircleCheckFilled, IconCircleXFilled, IconInfoCircleFilled} from '@tabler/icons-react';

const Toast = ({ id, message, type, removeToast }) => {
    const [show, setShow] = useState(false);

    const iconMapping = {
        success: <IconCircleCheckFilled color='rgb(80, 192, 80)'/>,
        error: <IconCircleXFilled />,
        info: <IconInfoCircleFilled />
    };

    useEffect(() => {
        const fadeInTimer = setTimeout(() => setShow(true), 10);

        const autoRemoveTimer = setTimeout(() => {
            setShow(false);
            setTimeout(() => removeToast(id), 400);
        }, 3000);

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(autoRemoveTimer);
        };
    }, [id, removeToast]);

    return(
        <> 
            <div className={`toast ${type} ${show? 'show' : ''}`}>
                <IconInfoCircleFilled />
                <div className="toast-contents">
                    <span className="toast-heading font-medium" id="toast-heading">{`${message}`}</span>
                    {/* <span className="toast-content text-slate-700" id="toast-content">{`${showToast ? toastDescription : 'This is the content of the lert'}`}</span> */}
                </div>
            </div>
        </>
    );
};

export default Toast;