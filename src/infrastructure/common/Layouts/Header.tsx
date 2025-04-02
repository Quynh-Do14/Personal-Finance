import { Col, Dropdown, Menu, Row, Space } from 'antd'
import "../../../assets/styles/components/MainLayout.css";
import { useEffect, useState } from 'react'
import Constants from '../../../core/common/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { isTokenStoraged } from '../../utils/storage';
import authService from '../../repositories/auth/service/auth.service';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import ProfileModal from './Profile';
import ChangePasswordModal from '../components/toast/changePassword';
import { configImageURL } from '../../helper/helper';
import LoginModal from '../../../page/Auth/Login';
import RegisterModal from '../../../page/Auth/Register';
import avatar from '../../../assets/images/no-avatar.png';
import logo from '../../../assets/images/logo.png';
import { FullPageLoading } from '../components/controls/loading';
import DialogNotificationCommon from '../components/modal/dialogNotification';
import { ButtonDesign } from '../components/button/buttonDesign';
type Props = {
    scrollDirection: boolean
    lastScrollY: number
    isLoginClick: boolean,
    setIsLoginClick: Function,
    isOpenModalLogout: boolean,
    setIsOpenModalLogout: Function,
    isOpenModalProfile: boolean,
    setIsOpenModalProfile: Function,
    isOpenModalChangePassword: boolean,
    setIsOpenModalChangePassword: Function,

}
const HeaderClient = (props: Props) => {
    const {
        scrollDirection,
        lastScrollY,
        isLoginClick,
        setIsLoginClick,
        isOpenModalLogout,
        setIsOpenModalLogout,
        isOpenModalProfile,
        setIsOpenModalProfile,
        isOpenModalChangePassword,
        setIsOpenModalChangePassword,
    } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const [dataProfile, setDataProfile] = useState<any>({});

    const [dataLogined, setDataLogined] = useState<boolean>(false)
    const [isRegister, setIsRegisterClick] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isOpenModalSuccesss, setIsOpenModalSuccesss] = useState<boolean>(false);

    const [, setProfileState] = useRecoilState(ProfileState);
    const token = isTokenStoraged();
    const getProfileUser = async () => {
        if (token) {
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
    }
    useEffect(() => {
        if (token) {
            getProfileUser().then(() => { })
        }
    }, [dataLogined, token])

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
                setLoading
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

    const listAction = () => {
        return (
            <Menu className='action-admin'>
                {
                    isAdmin
                    &&
                    <Menu.Item className='info-admin' onClick={() => { navigate(ROUTE_PATH.MANAGE_LAYOUT) }}>
                        <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                            <i className="fa fa-task" aria-hidden="true"></i>
                            Quản trị viên
                        </div>
                    </Menu.Item>
                }
                <Menu.Item className='info-admin' onClick={openModalProfile}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <i className='fa fa-user' aria-hidden='true'></i>
                        Thông tin cá nhân
                    </div>
                </Menu.Item>

                <Menu.Item className='info-admin' >
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <a href={ROUTE_PATH.SELECT_CHAT_BOT}>
                            <i className="fa fa-retweet" aria-hidden="true"></i>
                            Thay đổi Bot Chat
                        </a>
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalChangePassword}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <i className="fa fa-key" aria-hidden="true"></i>
                        Đổi mật khẩu
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#fc5a5a]' >
                        <i className='fa fa-sign-out' aria-hidden='true'></i>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu >
        )
    };

    const conditionActive = (link: string) => {
        if (location.pathname === ROUTE_PATH.HOME_PAGE) {
            return link === ROUTE_PATH.HOME_PAGE ? "active" : "";
        }

        if (link === ROUTE_PATH.HOME_PAGE) {
            return "";
        }

        return location.pathname.includes(link) ? "active" : "";
    };

    return (
        <div className={`header-common header-layout-client ${scrollDirection ? 'down' : 'up'} ${lastScrollY == 0 ? "bg-change-none" : "bg-change"}`}>
            <nav className="flex items-center justify-between">
                <Link to={ROUTE_PATH.HOME_PAGE}>
                    <img className='cursor-pointer' width={80} height={50} src={logo} alt='' />
                </Link>
                <nav className="menu">
                    {
                        Constants.MenuClient.List.map((item, index) => {
                            if (!item.private) {
                                return (
                                    <a
                                        href={item.link}
                                        key={index}
                                        className={`${conditionActive(item.link)}`}
                                    >{item.label}</a>
                                )
                            }
                            else {
                                if (!token) {
                                    return (
                                        <a
                                            href={ROUTE_PATH.LOGIN}
                                            // onClick={() => setIsLoginClick(!isLoginClick)}
                                            key={index}
                                            className={`${conditionActive(item.link)} cursor-pointer`}
                                        >{item.label}</a>
                                    )
                                }
                                else {
                                    return (
                                        <a
                                            href={item.link}
                                            key={index}
                                            className={`${conditionActive(item.link)}`}
                                        >{item.label}</a>
                                    )
                                }
                            }
                        })
                    }
                </nav>
                <div className="flex space-x-4">
                    <div>
                        {token ? (
                            <Row align={"middle"} >
                                <Col className='mr-2 flex flex-col justify-center align-bottom'>
                                    <div className='user-name'>
                                        {dataProfile?.name}
                                    </div>
                                    <div className='role'>
                                        {dataProfile.email}
                                    </div>
                                </Col>
                                <Col>
                                    <Dropdown overlay={listAction} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <div className="avatar-user">
                                                    <div className="grad spin"></div>
                                                    <img src={dataProfile?.avatarCode ? configImageURL(dataProfile?.avatarCode) : avatar} className="avatar-img border-radius" alt='' />
                                                </div>

                                            </Space>
                                        </a>
                                    </Dropdown>
                                </Col>
                            </Row>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <ButtonDesign
                                    width={120}
                                    classColor={'transparent'}
                                    title={'Đăng Nhập'}
                                    onClick={() => navigate(ROUTE_PATH.LOGIN)}
                                />
                                <ButtonDesign
                                    width={120}
                                    classColor={'green'}
                                    title={'Đăng Kí'}
                                    onClick={() => navigate(ROUTE_PATH.REGISTER)}
                                />
                            </div>
                        )}
                    </div>


                </div>
            </nav >
            <LoginModal
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                setLoading={setLoading}
                setDataLogined={setDataLogined}
                setIsRegisterClick={setIsRegisterClick}
            />
            <RegisterModal
                setLoading={setLoading}
                isRegister={isRegister}
                setIsRegisterClick={setIsRegisterClick}
                setIsOpenModalSuccesss={setIsOpenModalSuccesss}
            />
            <DialogNotificationCommon
                title={'Đăng kí tài khoản thành công'}
                message={'Đăng ký thành công, vui lòng kiểm tra email (bao gồm spam) để kích hoạt tài khoản'}
                titleCancel={'Đóng'}
                handleCancel={() => setIsOpenModalSuccesss(false)}
                visible={isOpenModalSuccesss}
            />
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={onCloseModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
            <ProfileModal
                handleCancel={onCloseModalProfile}
                visible={isOpenModalProfile}
                loading={loading}
                setLoading={setLoading}
            />
            <ChangePasswordModal
                handleCancel={onCloseModalChangePassword}
                visible={isOpenModalChangePassword}
                isLoading={loading}
            />
            <FullPageLoading isLoading={loading} />
        </div >
    )
}

export default HeaderClient