import { Col, Dropdown, Menu, Row, Space } from 'antd'
import "../../../assets/styles/components/MainLayout.css";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Constants from '../../../core/common/constants'
import { useLocation, useNavigate } from 'react-router-dom';
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
import AnimatedButton from '../components/button/animationButton';
import { FullPageLoading } from '../components/controls/loading';
type Props = {
    scrollDirection: boolean
    lastScrollY: Number
}
const HeaderClient = (props: Props) => {
    const { scrollDirection, lastScrollY } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const [dataProfile, setDataProfile] = useState<any>({});
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false);

    const [isLoginClick, setIsLoginClick] = useState<boolean>(false);
    const [dataLogined, setDataLogined] = useState<boolean>(false)
    const [isRegister, setIsRegisterClick] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // const [, setProfileState] = useRecoilState(ProfileState);
    const token = isTokenStoraged();
    const getProfileUser = async () => {
        if (token) {
            try {
                await authService.profile(
                    () => { }
                ).then((response) => {
                    if (response) {
                        setDataProfile(response)
                        // setProfileState(
                        //     {
                        //         user: response,
                        //     }
                        // )
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
                            <i className="fa fa-list" aria-hidden="true"></i>
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
        if (location.pathname !== ROUTE_PATH.HOME_PAGE) {
            if (location.pathname.includes(link)) {
                return "active"
            }
            else {
                return ""
            }
        }
        else if (location.pathname === ROUTE_PATH.HOME_PAGE) {
            if (location.pathname === link) {
                return "active"
            }
            return ""
        }

        else {
            return ""
        }
    }
    return (
        <div className={`header-common header-layout-client ${scrollDirection ? 'down' : 'up'} ${lastScrollY == 0 ? "bg-change-none" : "bg-change"}`}>
            <nav className="flex items-center justify-between">
                <img className='cursor-pointer' width={80} height={50} src={logo} alt='' />
                <nav className="menu">
                    {
                        Constants.MenuClient.List.map((item, index) => {
                            return (
                                <a
                                    href={item.link}
                                    key={index}
                                    className={`${conditionActive(item.link)}`}
                                >{item.label}</a>
                            )
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
                                        {dataProfile.username}
                                    </div>
                                </Col>
                                <Col>
                                    <Dropdown overlay={listAction} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <div className="avatar-user">
                                                    <div className="grad spin"></div>
                                                    <img src={imageUrl ? imageUrl : avatar} className="avatar-img border-radius" alt='' />
                                                </div>

                                            </Space>
                                        </a>
                                    </Dropdown>
                                </Col>
                            </Row>
                        ) : (
                            <AnimatedButton
                                classColor={'green'}
                                label={'Đăng nhập'}
                                onClick={() => setIsLoginClick(!isLoginClick)}
                            />
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