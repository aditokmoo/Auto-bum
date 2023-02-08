import { Outlet } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from '../shared/Spinner';

const Openroute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if(checkingStatus) {
        return <Spinner />
    }

    return !loggedIn ? <Outlet /> : <Outlet />
}

export default Openroute