import React, {useState, useEffect} from 'react';
import TableActionMenu from './TableActionMenu';
import { IconDots } from '@tabler/icons-react';
import { formatDateToYYYYMMDD } from '../../utils/helpers';

function Table({logs, toggleModal, fetchLogs, handleUpdatedData, setIsUpdate}) {
    // const [showActionMenu, setShowActionMenu] = useState(false);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const [showDetailRow, setShowDetailRow] = useState(false);

    const handler = (event) => {
        if (openActionMenu !==null && !event.target.closest('.action-dropdown-menu')) {
            setOpenActionMenu(null);
        }
    };

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
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

    const toggleDetailRow = () => {
        setShowDetailRow(!showDetailRow);
    }

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
                        <React.Fragment>
                            <tr id="tableRow" key={log._id}>
                                <td className="text-slate-300" style={{width: "140px"}}>{formatDateToYYYYMMDD(log.date)}</td>
                                <td>{log.name}</td>
                                <td className="text-slate-300 text-align-right" style={{width: "120px"}}>{log.latitude}</td>
                                <td className="text-slate-300 text-align-right" style={{width: "120px"}}>{log.longitude}</td>
                                <td className="action-cell" id="actionCell">
                                    <button onClick={() => toggleActionMenu(log._id)} className="action-menu-button font-sm" tabIndex={0}>
                                        <IconDots stroke={2} />
                                    </button>
                                    <TableActionMenu id={log._id} isOpen={openActionMenu === log._id} toggleActionMenu={toggleActionMenu} fetchLogs={fetchLogs} handleUpdatedData={handleUpdatedData} toggleModal={toggleModal} setIsUpdate={setIsUpdate}/>
                                </td>
                            </tr>
                            <tr className={`detail-row`}>
                                <td colSpan={5}>
                                    <div className="detail-row-container">
                                        <div className="heading text-slate-500">Species caught: </div>
                                        <div className="body">{log.species.join(", ")}</div>
                                        <div className="images">
                                            <div className="frame-outer" style={{display: "flex", position: "absolute", right: "16px", top: "16px", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", rotate: "-5deg", background: "white", borderRadius: "8px", border: "1px solid rgb(0, 0, 0, 0.1", boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 4px 7px 0px rgba(0, 0, 0, 0.09), 0px 1.206px 2.11px 0px rgba(0, 0, 0, 0.06), 0px 0.501px 0.877px 0px rgba(0, 0, 0, 0.05), 0px 0.181px 0.317px 0px rgba(0, 0, 0, 0.03)"}}>
                                                <div className="frame-inner" style={{width: "64px", height: "64px", background: "rgb(0, 0, 0, 0.05)", borderRadius: "4px"}}></div>
                                            </div>
                                            <div className="frame-outer" style={{display: "flex", position: "absolute", zIndex: "100", right: "16px", top: "16px", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", rotate: "5deg", background: "white", borderRadius: "8px", border: "1px solid rgb(0, 0, 0, 0.1", boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 4px 7px 0px rgba(0, 0, 0, 0.09), 0px 1.206px 2.11px 0px rgba(0, 0, 0, 0.06), 0px 0.501px 0.877px 0px rgba(0, 0, 0, 0.05), 0px 0.181px 0.317px 0px rgba(0, 0, 0, 0.03)"}}>
                                                <div className="frame-inner" style={{width: "64px", height: "64px", background: "url(https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?cs=srgb&dl=pexels-crisdip-35358-128756.jpg&fm=jpg) lightgray 50% / cover no-repeat", borderRadius: "4px"}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;