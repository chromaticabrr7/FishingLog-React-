import './AppLoadingState.css';
import { IconFishHook } from '@tabler/icons-react';

function AppLoadingState(loading) {

    return(
        <>
            <div className={`loader-content ${loading.loading ? '' : 'fade-out'}`}>
                <IconFishHook stroke={2} />
            </div>
        </>
    );
}

export default AppLoadingState;