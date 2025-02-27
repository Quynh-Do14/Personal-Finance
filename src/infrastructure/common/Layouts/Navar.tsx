import { Drawer } from 'antd'
import logo from '../../../assets/images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import "../../../assets/styles/components/MainLayout.css";
import Constants from '../../../core/common/constants';
import { isTokenStoraged } from '../../utils/storage';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { configImageURL } from '../../helper/helper';
import avatar from '../../../assets/images/no-avatar.png';
import AnimatedButton from '../components/button/animationButton';
import authService from '../../repositories/auth/service/auth.service';

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
    const token = isTokenStoraged();
    const location = useLocation();
    const navigate = useNavigate();
    const profileState = useRecoilValue(ProfileState).user;

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
                background: "#1d9b5e",
            }}
            closeIcon={<i className="fa fa-arrow-left text-[#FFF] text-[20px]" aria-hidden="true"></i>}
        >
            <div className="navbar-container">
                {
                    token ?
                        <div className="profile">
                            <img src={profileState.avatarCode ? configImageURL(profileState.avatarCode) : avatar} className="avatar" alt='' />
                            <div>
                                <p className="name">{profileState.name}</p>
                                <p className="phone">{profileState.email}</p>
                            </div>
                        </div>
                        :
                        <div className="profile">
                            <AnimatedButton
                                classColor={'green'}
                                label={'Đăng nhập'}
                                onClick={() => setIsLoginClick(!isLoginClick)}
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
                                        <a
                                            onClick={() => setIsLoginClick(!isLoginClick)}
                                        >
                                            <span className="icon">
                                                <i className={item.icon} aria-hidden="true"></i>
                                            </span>
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                </a>
                            )
                        }
                        else {
                            if (!token) {
                                return (
                                    <a
                                        onClick={() => setIsLoginClick(!isLoginClick)}
                                        key={index}
                                    >
                                        <li key={index} className={`${conditionActive(item.link)} menu-item`}>
                                            <a
                                                onClick={() => setIsLoginClick(!isLoginClick)}
                                            >
                                                <span className="icon">
                                                    <i className={item.icon} aria-hidden="true"></i>
                                                </span>
                                                <span>{item.label}</span>
                                            </a>
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
                                            <a
                                                onClick={() => setIsLoginClick(!isLoginClick)}
                                            >
                                                <span className="icon">
                                                    <i className={item.icon} aria-hidden="true"></i>
                                                </span>
                                                <span>{item.label}</span>
                                            </a>
                                        </li>
                                    </a>
                                )
                            }
                        }

                    })}

                </ul>
                {
                    token
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
                    </ul>
                }

            </div >
        </Drawer >
    )
}

export default NavbarComponent