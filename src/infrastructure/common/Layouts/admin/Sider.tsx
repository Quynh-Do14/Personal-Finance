import styles from "../../../../assets/styles/admin/layout.module.css";
import logo from "../../../../assets/images/logo-white.png"
import { useLocation, useNavigate } from "react-router-dom";
import Constants from "../../../../core/common/constants";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const location = useLocation();
    const navigate = useNavigate();
    const conditionActive = (link: string) => {
        // if (pathname !== ROUTE_PATH.HOME_PAGE) {
        //     if (pathname.includes(link)) {
        //         return "active"
        //     }
        //     else {
        //         return ""
        //     }
        // }
        // else if (pathname === ROUTE_PATH.HOME_PAGE) {
        if (location.pathname === link) {
            return styles.active
        }
        return ""
        // }
        // else {
        //     return ""
        // }
    }
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <h2 className={styles.logo}>
                <img src={logo} alt="FATS" width={120} height={40} />
            </h2>
            <nav>
                <ul className={styles.menu}>
                    {
                        Constants.Menu.List.map((item, index) => {
                            return (
                                <li key={index} className={`${conditionActive(item.link)}`}>
                                    <a href={item.link}><span>
                                        <i className={item.icon}></i></span>
                                        {item.label}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </aside>
    );
}

