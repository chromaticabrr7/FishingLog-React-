import React, {useState, useEffect, useRef} from 'react';
import { IconEyeglass2 } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { useToast } from '../../contexts/ToastContext';
import { deleteLog, fetchLogs } from '../../services/api';

function TableActionMenu({id, isOpen, toggleActionMenu, handleUpdatedData, toggleModal, setIsUpdate}) {
    const [actionMenuClass, setActionMenuClass] = useState('');
    const addToast = useToast();
    let menuRef = useRef(null);

    const viewDetails = (id, toggleActionMenu) => {
        console.log('View details of', id);
        toggleActionMenu(id);
    }
    
    const editLog = () => {
        console.log('Edit details for', id);
        setIsUpdate(id);
        toggleModal();
    }

    const deleteProcess = async (id, toggleActionMenu) => {
        console.log('Delete log', id);

        const response = await deleteLog(id);

        if (response.ok) {
            addToast('Deletion successful', 'The log you selected was successfully deleted.', 'success');
            setTimeout(() => {
                const updatedLogs = fetchLogs();
                handleUpdatedData(updatedLogs);
            }, 200);
        } else {
            console.log('Error deleting course');
            addToast('Error deleting course');
        }

        toggleActionMenu(id);
    }

    useEffect(() => {
        if (isOpen) {
            setActionMenuClass('show');
        } else {
            if (menuRef.current && menuRef.current.classList.contains('show')) {
                setActionMenuClass('');
            }
        }

        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setActionMenuClass('');
            }
        };

        document.addEventListener('mousedown', handler);

        return() => {
            document.removeEventListener('mousedown', handler);
        };
    }, [isOpen]);

    return(
        <>
            <div ref={menuRef} className={`action-dropdown-menu font-medium ${actionMenuClass}`}>
                <button onClick={() => viewDetails(id, toggleActionMenu)} className="dropdown-menu-item" style={{border: 'none'}}>
                    <IconEyeglass2 stroke={2} />
                    <span>View Details</span>
                </button>
                <button onClick={editLog} className="dropdown-menu-item" style={{border: 'none'}}>
                    <IconPencil stroke={2} />
                    <span>Edit</span>
                </button>
                <button onClick={() => deleteProcess(id, toggleActionMenu)} className="dropdown-menu-item" style={{border: 'none'}}>
                    <IconTrash stroke={2} />
                    <span>Delete</span>
                </button>
            </div>
        </>
    );
}



export default TableActionMenu;