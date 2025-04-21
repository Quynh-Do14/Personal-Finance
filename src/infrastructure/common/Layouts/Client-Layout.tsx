import { useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/styles/components/MainLayout.css";
import FooterClient from "./Footer";
import HeaderClient from "./Header";
import HeaderMobileComponent from "./Header-Mobile";
import FormAdvisement from "./Form";

const LayoutClient = ({ ...props }: any) => {
    const [isLoginClick, setIsLoginClick] = useState<boolean>(false);
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollDirection, setScrollDirection] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const currentScrollY = scrollRef.current.scrollTop;
            if (currentScrollY > lastScrollY) {
                setScrollDirection(false);
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection(true);
            }
            setLastScrollY(currentScrollY);

        }
    }, [lastScrollY]);

    useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);

            return () => {
                element.removeEventListener('scroll', handleScroll);
            };
        }
    }, [lastScrollY]);
    return (
        <div className="main-layout-client">
            <HeaderMobileComponent
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                isOpenModalLogout={isOpenModalLogout}
                setIsOpenModalLogout={setIsOpenModalLogout}
                isOpenModalProfile={isOpenModalProfile}
                setIsOpenModalProfile={setIsOpenModalProfile}
                isOpenModalChangePassword={isOpenModalChangePassword}
                setIsOpenModalChangePassword={setIsOpenModalChangePassword}
            />
            <HeaderClient
                scrollDirection={scrollDirection}
                lastScrollY={lastScrollY}
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                isOpenModalLogout={isOpenModalLogout}
                setIsOpenModalLogout={setIsOpenModalLogout}
                isOpenModalProfile={isOpenModalProfile}
                setIsOpenModalProfile={setIsOpenModalProfile}
                isOpenModalChangePassword={isOpenModalChangePassword}
                setIsOpenModalChangePassword={setIsOpenModalChangePassword}
            />
            {/* <div className="overlay"></div> */}
            <div ref={scrollRef} className="content-layout-client">
                <div>
                    {props.children}
                </div>
                <FormAdvisement />
                <FooterClient />
            </div>
        </div>
    )
}

export default LayoutClient