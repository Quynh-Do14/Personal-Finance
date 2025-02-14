import { useEffect, useState } from "react";
import "../../../assets/styles/components/MainLayout.css";
import FooterClient from "./Footer";
import HeaderClient from "./Header";
const LayoutClient = ({ ...props }: any) => {

    const [scrollDirection, setScrollDirection] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastY && currentScrollY > 50) {
                setScrollDirection(true);
            } else if (currentScrollY < lastY) {
                setScrollDirection(false);
            }
            lastY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    console.log("scrollDirection", scrollDirection);

    return (
        <div className="main-layout-client">
            <HeaderClient
                scrollDirection={scrollDirection}
            />
            {/* <div className="overlay"></div> */}
            <div className="content-layout-client bg-[#FFF] flex flex-col scroll-auto">
                <div>
                    {props.children}
                </div>
                <FooterClient />
            </div>
        </div>
    )
}

export default LayoutClient