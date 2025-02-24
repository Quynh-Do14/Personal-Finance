import { useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/styles/components/MainLayout.css";
import FooterClient from "./Footer";
import HeaderClient from "./Header";
const LayoutClient = ({ ...props }: any) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollDirection, setScrollDirection] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
            <HeaderClient
                scrollDirection={scrollDirection}
                lastScrollY={lastScrollY}
            />
            {/* <div className="overlay"></div> */}
            <div ref={scrollRef} className="content-layout-client">
                <div>
                    {props.children}
                </div>
                <FooterClient />
            </div>
        </div>
    )
}

export default LayoutClient