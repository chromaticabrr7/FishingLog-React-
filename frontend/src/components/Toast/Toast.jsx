import React, {useState, useEffect} from 'react';
import {IconCircleCheckFilled, IconCircleXFilled, IconInfoCircleFilled} from '@tabler/icons-react';

const Toast = ({ id, heading, message, type, removeToast }) => {
    const [show, setShow] = useState(false);
    const [icon, setIcon] = useState(null);

    // const iconMapping = {
    //     success: <IconCircleCheckFilled color='rgb(80, 192, 80)'/>,
    //     error: <IconCircleXFilled />,
    //     info: <IconInfoCircleFilled />
    // };

    useEffect(() => {
        const fadeInTimer = setTimeout(() => setShow(true), 10);

        const autoRemoveTimer = setTimeout(() => {
            setShow(false);
            setTimeout(() => removeToast(id), 400);
        }, 3000);

        switch (type) {
            case 'success':
                setIcon(<IconCircleCheckFilled color='rgb(80, 192, 80)'/>);
                break;
            case 'error':
                setIcon(<IconCircleXFilled />);
                break;
            case 'default':
                setIcon(<IconInfoCircleFilled />);
                break;
        };

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(autoRemoveTimer);
        };
    }, [id, removeToast]);

    return(
        <> 
            <div className={`toast ${type} ${show? 'show' : ''}`}>
                {icon}
                <div className="toast-contents">
                    <span className="toast-heading font-medium" id="toast-heading">{`${heading}`}</span>
                    <span className="toast-content text-slate-700" id="toast-content">{`${message}`}</span>
                </div>
            </div>
        </>
    );
};

export default Toast;