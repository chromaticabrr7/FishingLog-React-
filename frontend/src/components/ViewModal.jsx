import React, { useState, useEffect} from 'react';
import Map from './Map';

function ViewModal() {
    const show = true;

    return(
        <>
            <div className={`view-modal ${show? 'show' : ''}`}>
                <div className="view-modal-container">
                    <div className="view-modal-header-container">
                        <div className="view-modal-detail-container">
                            <span className="view-modal-detail-row font-medium" id="location"><span className="text-slate-500">Location: </span><span>Cleary Lake Regional Park </span><span className="text-slate-300">{`[latitude, longitude]`}</span></span>
                            <span className="view-modal-detail-row font-medium" id="location"><span className="text-slate-500">Trip Date: </span><span>Some date </span></span>
                            <span className="view-modal-detail-row font-medium text-slate-500" id="species">{`Species Caught: `}</span>
                        </div>
                        <div className="species-grid">
                            <span className="species-grid-item">{`Species 1`}</span>
                            <span className="species-grid-item">{`Species 2`}</span>
                            <span className="species-grid-item">{`Species 3`}</span>
                            <span className="species-grid-item">{`Species 4`}</span>
                            <span className="species-grid-item">{`Species 5`}</span>
                        </div>
                    </div>
                    <Map latitude={44.691935009406514} longitude={-93.38609171813805}/>
                </div>
            </div>
        </>
    );
};

export default ViewModal;