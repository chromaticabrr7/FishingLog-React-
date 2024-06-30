import React, {useState, useEffect} from 'react';
import TableActionMenu from './TableActionMenu';
import { IconDots } from '@tabler/icons-react';
import { formatDateToYYYYMMDD } from '../../utils/helpers';

function Table({logs, toggleModal, fetchLogs, handleUpdatedData, setIsUpdate}) {
    // const [showActionMenu, setShowActionMenu] = useState(false);
    const [openActionMenu, setOpenActionMenu] = useState(null);

    const handler = (event) => {
        if (openActionMenu !==null && !event.target.closest('.action-dropdown-menu')) {
            setOpenActionMenu(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        } 
    }, [openActionMenu]);

    const toggleActionMenu = (key) => {
        setOpenActionMenu(openActionMenu === key ? null : key);
    };

    return(
        <>
            {openActionMenu !== null && <div className="action-menu-overlay"></div>}
            <div className="tab-navigation">
                <div className="tab-navigation-container">
                    <div className="tab-navigation-items-container">
                        <h2 id="tab-navigation-header">Entries</h2>
                    </div>
                    <button onClick={toggleModal} className="font-medium text-slate-700" id="modalBtn"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>Add log</button>
                </div>
            </div>
            <table id="tripTable">
                <thead>
                    
                </thead>
                <tbody id="tripTableBody">
                    {logs.sort((a, b) => new Date(b.date) - new Date(a.date)).map((log) => (
                        <tr id="tableRow" key={log._id}>
                            <td className="text-slate-300">{formatDateToYYYYMMDD(log.date)}</td>
                            <td>{log.name}</td>
                            <td className="text-slate-300 text-align-right">{log.latitude}</td>
                            <td className="text-slate-300 text-align-right">{log.longitude}</td>
                            <td className="action-cell" id="actionCell">
                                <button onClick={() => toggleActionMenu(log._id)} className="action-menu-button font-sm" tabIndex={0}>
                                    <IconDots stroke={2} />
                                </button>
                                <TableActionMenu id={log._id} isOpen={openActionMenu === log._id} toggleActionMenu={toggleActionMenu} fetchLogs={fetchLogs} handleUpdatedData={handleUpdatedData} toggleModal={toggleModal} setIsUpdate={setIsUpdate}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;