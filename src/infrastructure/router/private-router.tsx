import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { isTokenStoraged } from '../utils/storage';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import { useState } from 'react';

export const PrivateRoute = ({ component: RoutePath }: any) => {
    const storage = isTokenStoraged();
    const dataProfile = useRecoilValue(ProfileState).user;

    const isAdmin = dataProfile?.roles == "ADMIN"

    if (isAdmin) {
        if (storage && isAdmin) {
            return RoutePath
        }
        else {
            return <Navigate to={ROUTE_PATH.HOME_PAGE} />
        }
    }
    if (storage) {
        return RoutePath
    }
    else {
        return <Navigate to={ROUTE_PATH.HOME_PAGE} />
    }
}