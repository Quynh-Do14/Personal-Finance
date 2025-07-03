"use client"
import styles from "../../../../assets/styles/admin/layout.module.css";
import Sidebar from "./Sider";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ProfileState } from "../../../../core/atoms/profile/profileState";
import { CategoryBlogState } from "../../../../core/atoms/category/categoryState";
import { isTokenStoraged } from "../../../utils/storage";
import authService from "../../../repositories/auth/service/auth.service";
import categoryBlogService from "../../../repositories/category/categoryBlog.service";

export default function AdminLayout({ breadcrumb, title, redirect, children }: any) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [dataProfile, setDataProfile] = useState<any>({});
    const [, setProfileState] = useRecoilState(ProfileState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);

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
            getProfileUser().then(() => { });
        }
    }, [token]);

    const onGetListCategoryBlogAsync = async () => {
        try {
            await categoryBlogService.GetCategory(
                {},
                () => { }
            ).then((response) => {
                setCategoryBlogState(
                    {
                        data: response.content,
                    }
                )
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListCategoryBlogAsync().then(() => { });
    }, []);
    return (
        <div className={styles.wrapper}>
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.full : ''}`}>
                <Header
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    breadcrumb={breadcrumb}
                    title={title}
                    redirect={redirect}
                />
                <div className={styles.pageContent}>{children}</div>
            </div>
        </div>
    );
}
