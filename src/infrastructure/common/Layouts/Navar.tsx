import { Drawer } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import "../../../assets/styles/components/MainLayout.css";
import Constants from '../../../core/common/constants';
import { isTokenStoraged } from '../../utils/storage';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { configImageURL } from '../../helper/helper';
import avatar from '../../../assets/images/no-avatar.png';
import authService from '../../repositories/auth/service/auth.service';
import { ButtonDesign } from '../components/button/buttonDesign';
import { useEffect, useState } from 'react';

type Props = {
    isOpen: boolean,
    closeDrawer: () => void,
    isLoginClick: boolean,
    setIsLoginClick: Function,
    isOpenModalLogout: boolean,
    setIsOpenModalLogout: Function,
    isOpenModalProfile: boolean,
    setIsOpenModalProfile: Function,
    isOpenModalChangePassword: boolean,
    setIsOpenModalChangePassword: Function,
}

const NavbarComponent = (props: Props) => {
    const {
        isOpen,
        closeDrawer,
        isLoginClick,
        setIsLoginClick,
        isOpenModalLogout,
        setIsOpenModalLogout,
        isOpenModalProfile,
        setIsOpenModalProfile,
        isOpenModalChangePassword,
        setIsOpenModalChangePassword,
    } = props;
    const [token, setToken] = useState<boolean>(false);
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);
    const [dataProfile, setDataProfile] = useState<any>({});

    const location = useLocation();
    const navigate = useNavigate();

    const [, setProfileState] = useRecoilState(ProfileState);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenS = await isTokenStoraged();
                setToken(tokenS);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingToken(true);
            }
        };

        fetchToken();
    }, []);

    const getProfileUser = async () => {
        const tokenS = isTokenStoraged();
        if (!tokenS) return;
        try {
            await authService.profile(
                () => { }
            ).then((response) => {
                if (response) {
                    setDataProfile(response)
                    setProfileState(
                        {
                            user: response,
                        }
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProfileUser().then(() => { })
    }, [token])

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const onCloseModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                () => { }
            ).then(() => {
                navigate(ROUTE_PATH.HOME_PAGE);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }

    const openModalProfile = () => {
        setIsOpenModalProfile(true);
    };

    const onCloseModalProfile = () => {
        setIsOpenModalProfile(false);
    };

    const openModalChangePassword = () => {
        setIsOpenModalChangePassword(true);
    };

    const onCloseModalChangePassword = () => {
        setIsOpenModalChangePassword(false);
    };

    const conditionActive = (link: string) => {
        // if (location.pathname !== ROUTE_PATH.HOME_PAGE) {
        //     if (location.pathname.includes(link)) {
        //         return "active"
        //     }
        //     else {
        //         return ""
        //     }
        // }
        // else if (location.pathname === ROUTE_PATH.HOME_PAGE) {
        if (location.pathname === link) {
            return "active"
        }
        return ""
        // }
        // else {
        //     return ""
        // }
    }

    return (
        <Drawer
            // title={
            //     <Link to={ROUTE_PATH.HOME_PAGE}>
            //         <img className='cursor-pointer' width={50} height={40} src={logo} alt='' />
            //     </Link>
            // }
            placement="left"
            onClose={closeDrawer}
            open={isOpen}
            headerStyle={{
                background: "linear-gradient(to left, #99cc99, #99cccc)",
            }}
            closeIcon={<i className="fa fa-arrow-left text-[#FFF] text-[20px]" aria-hidden="true"></i>}
        >
            <div className="navbar-container">
                {
                    token ?
                        <div className="profile">
                            <img src={dataProfile?.avatarCode ? configImageURL(dataProfile?.avatarCode) : avatar} className="avatar" alt='' />
                            <div>
                                <p className="name">{dataProfile.name}</p>
                                <p className="phone">{dataProfile.email}</p>
                            </div>
                        </div>
                        :
                        <div className="profile">
                            <ButtonDesign
                                classColor={'green'}
                                title={'Đăng Nhập'}
                                onClick={() => navigate(ROUTE_PATH.LOGIN)}
                            />
                        </div>
                }
                <ul className="menu">
                    {Constants.MenuClient.List.map((item, index) => {
                        if (!item.private) {
                            return (
                                <a
                                    href={item.link}
                                    key={index}
                                >
                                    <li key={index} className={`${conditionActive(item.link)} menu-item`}>
                                        <span className="icon">
                                            <i className={item.icon} aria-hidden="true"></i>
                                        </span>
                                        <span>{item.label}</span>
                                    </li>
                                </a>
                            )
                        }
                        else {
                            if (isLoadingToken) {
                                if (!token) {
                                    return (
                                        <a
                                            key={index}
                                            href={ROUTE_PATH.LOGIN}>
                                            <li key={index} className={`${conditionActive(item.link)} menu-item`}>
                                                <span className="icon">
                                                    <i className={item.icon} aria-hidden="true"></i>
                                                </span>
                                                <span>{item.label}</span>
                                            </li>
                                        </a>
                                    )
                                }
                                else {
                                    return (
                                        <a
                                            href={item.link}
                                            key={index}
                                        >
                                            <li key={index} className={`${conditionActive(item.link)} menu-item`}>
                                                <span className="icon">
                                                    <i className={item.icon} aria-hidden="true"></i>
                                                </span>
                                                <span>{item.label}</span>
                                            </li>
                                        </a>
                                    )
                                }
                            }

                        }

                    })}

                </ul>
                {

                    isLoadingToken
                        ?
                        (token
                            &&
                            < ul className="menu">

                                <li className={`menu-item`} onClick={openModalProfile}>
                                    <span className="icon">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </span>
                                    <span>Thông tin cá nhân</span>
                                </li>
                                <a href={ROUTE_PATH.SELECT_CHAT_BOT}>
                                    <li className={`menu-item`} onClick={openModalChangePassword}>
                                        <span className="icon">
                                            <i className="fa fa-retweet" aria-hidden="true"></i>
                                        </span>
                                        <span>Thay đổi Bot Chat</span>
                                    </li>
                                </a>
                                <li className={`menu-item`} onClick={openModalChangePassword}>
                                    <span className="icon">
                                        <i className="fa fa-key" aria-hidden="true"></i>
                                    </span>
                                    <span>Đổi mật khẩu</span>
                                </li>
                                <li className={`menu-item`} onClick={openModalLogout}>
                                    <span className="icon">
                                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    </span>
                                    <span>Đăng xuất</span>
                                </li>
                            </ul>)
                        :
                        null
                }

            </div >
        </Drawer >
    )
}

export default NavbarComponent