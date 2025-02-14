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
type Props = {
    scrollDirection: boolean
}
const HeaderClient = (props: Props) => {
    const { scrollDirection } = props;
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
                            <svg className='mr-1' width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C12 11.4477 12.4477 11 13 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H13C12.4477 20 12 19.5523 12 19V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M4 5C4 4.44772 4.44772 4 5 4H8C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20H5C4.44772 20 4 19.5523 4 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H13C12.4477 8 12 7.55228 12 7V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            Quản trị viên
                        </div>
                    </Menu.Item>
                }
                <Menu.Item className='info-admin' onClick={openModalProfile}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="4" />
                            <path d="M12 9a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
                        </svg>
                        Thông tin cá nhân
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalChangePassword}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' fill="#808080" height="20px" width="20px" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" enable-background="new 0 0 24 24" >
                            <path d="M24,19v-2h-2.14c-0.09-0.36-0.24-0.7-0.42-1.02l1.52-1.52l-1.41-1.41l-1.52,1.52c-0.32-0.19-0.66-0.33-1.02-0.42V12h-2v2.14
                            c-0.36,0.09-0.7,0.24-1.02,0.42l-1.52-1.52l-1.41,1.41l1.52,1.52c-0.19,0.32-0.33,0.66-0.42,1.02H12v2h2.14
                            c0.09,0.36,0.24,0.7,0.42,1.02l-1.52,1.52l1.41,1.41l1.52-1.52c0.32,0.19,0.66,0.33,1.02,0.42V24h2v-2.14
                            c0.36-0.09,0.7-0.24,1.02-0.42l1.52,1.52l1.41-1.41l-1.52-1.52c0.19-0.32,0.33-0.66,0.42-1.02H24z M18,20c-1.1,0-2-0.9-2-2
                            s0.9-2,2-2s2,0.9,2,2S19.1,20,18,20z M11,7.41l3.29,3.29l1.41-1.41L12.41,6L13,5.41l2.29,2.29l1.41-1.41L14.41,4L15,3.41l3.29,3.29
                            l1.41-1.41L16.41,2l0.29-0.29l-1.41-1.41L6.89,8.7C6.19,8.26,5.38,8,4.5,8C2.02,8,0,10.02,0,12.5S2.02,17,4.5,17S9,14.98,9,12.5
                            c0-0.88-0.26-1.69-0.7-2.39L11,7.41z M4.5,15C3.12,15,2,13.88,2,12.5S3.12,10,4.5,10S7,11.12,7,12.5S5.88,15,4.5,15z"/>
                        </svg>
                        Đổi mật khẩu
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#fc5a5a]' >
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
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
        <div className={`header-common header-layout-client ${scrollDirection ? 'down' : 'up'}`}>
            <nav className="flex items-center justify-between">
                <img className='rounded-full cursor-pointer' width={80} height={50} src={logo} alt='' />
                <nav className="flex space-x-8">
                    <a href="/">Trang chủ</a>
                    <a href="/goal-spending">Tài chính</a>
                    <a href="/team">Quỹ nhóm</a>
                    <a href="/contact">Liên hệ</a>
                </nav>
                <div className="flex space-x-4">
                    <div>
                        {token ? (
                            <Row align={"middle"} >
                                <Col className='mr-2 flex flex-col align-bottom'>
                                    <div className='user-name'>
                                        {dataProfile?.name}
                                    </div>
                                    {/* <div className='role'>
                                                      {dataProfile.roles[0]?.name}
                                                  </div> */}
                                </Col>
                                <Col>
                                    <Dropdown overlay={listAction} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <img className='rounded-full cursor-pointer' width={50} height={50} src={imageUrl ? imageUrl : avatar} alt='' />
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
            {/*  


            <ModalReservationShow
                handleCancel={onCloseModalReservationShow}
                visible={isOpenModalReservationShow}
                isLoading={loading}
            />
            <ModalHistory
                handleCancel={onCloseModalHistoryShow}
                visible={isOpenModalHistoryShow}
                isLoading={loading}
            /> */}
        </div >
    )
}

export default HeaderClient