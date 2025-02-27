import logo from '../../../assets/images/logo.png';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { Link } from 'react-router-dom';
import NavbarComponent from './Navar';
type Props = {
    collapsed: boolean,
    setCollapsed: Function,
    isLoginClick: boolean,
    setIsLoginClick: Function,
    isOpenModalLogout: boolean,
    setIsOpenModalLogout: Function,
    isOpenModalProfile: boolean,
    setIsOpenModalProfile: Function,
    isOpenModalChangePassword: boolean,
    setIsOpenModalChangePassword: Function,
}
const HeaderMobileComponent = (props: Props) => {
    const {
        collapsed,
        setCollapsed,
        isLoginClick,
        setIsLoginClick,
        isOpenModalLogout,
        setIsOpenModalLogout,
        isOpenModalProfile,
        setIsOpenModalProfile,
        isOpenModalChangePassword,
        setIsOpenModalChangePassword,
    } = props;
    const onNavbarClick = () => {
        setCollapsed(!collapsed)
    }
    return (
        <div className='header-mobile'>
            <div onClick={onNavbarClick} className='cursor-pointer'>
                <i className="fa fa-bars text-[24px] text-[#252525]" aria-hidden="true"></i>
            </div>
            <div>
                <Link to={ROUTE_PATH.HOME_PAGE}>
                    <img className='cursor-pointer' width={80} height={50} src={logo} alt='' />
                </Link>
            </div>
            <NavbarComponent
                isOpen={collapsed}
                closeDrawer={onNavbarClick}
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                isOpenModalLogout={isOpenModalLogout}
                setIsOpenModalLogout={setIsOpenModalLogout}
                isOpenModalProfile={isOpenModalProfile}
                setIsOpenModalProfile={setIsOpenModalProfile}
                isOpenModalChangePassword={isOpenModalChangePassword}
                setIsOpenModalChangePassword={setIsOpenModalChangePassword}
            />
        </div>
    )
}

export default HeaderMobileComponent