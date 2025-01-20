import { useEffect, useState } from "react";
import "../../../assets/styles/components/MainLayout.css";
import authService from "../../repositories/auth/service/auth.service";
import FooterClient from "./Footer";
import HeaderClient from "./Header";
import { useRecoilState } from "recoil";
import { ProfileState } from "../../../core/atoms/profile/profileState";
import { isTokenStoraged } from "../../utils/storage";
const LayoutClient = ({ ...props }: any) => {
    const [dataProfile, setDataProfile] = useState<any>({});
    // const [, setProfileState] = useRecoilState(ProfileState);
    // const [, setMyCourseState] = useRecoilState(MyCourseState);
    // const [, setCategoryState] = useRecoilState(CategoryState);

    // const token = isTokenStoraged();
    // const getProfileUser = async () => {
    //     if (token) {
    //         try {
    //             await authService.profile(
    //                 () => { }
    //             ).then((response) => {
    //                 if (response) {
    //                     setDataProfile(response)
    //                     setProfileState(
    //                         {
    //                             user: response,
    //                         }
    //                     )
    //                 }
    //             })
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }
    // useEffect(() => {
    //     if (token) {
    //         getProfileUser().then(() => { })
    //     }
    // }, [token])



    return (
        <div className="main-layout-client">
            <HeaderClient />
            <div className="container-layout-client">
                {/* <div className="overlay"></div> */}
                <div className="content-layout-client bg-[#FFF] flex flex-col scroll-auto">
                    <div>
                        {props.children}
                    </div>
                </div>
                <FooterClient />
            </div>
        </div>

    )
}

export default LayoutClient