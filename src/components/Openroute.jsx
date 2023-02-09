import { Outlet } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from '../shared/Spinner';

const Openroute = () => {
    const { checkingStatus } = useAuthStatus();

    if(checkingStatus) {
        return <Spinner />
    }

    return <Outlet />
}

export default Openroute