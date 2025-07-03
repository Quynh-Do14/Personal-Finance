import React, { useEffect, useState } from 'react'
import styles from '../../../assets/styles/admin/Management.module.css';
import { Col, Row } from 'antd';
import { useRecoilValue } from 'recoil';
import { CategoryBlogState } from '../../../core/atoms/category/categoryState';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import blogService from '../../../infrastructure/repositories/blog/blog.service';
import { configImageURL } from '../../../infrastructure/helper/helper';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import AdminLayout from '../../../infrastructure/common/Layouts/admin/MainLayout';
import { ButtonDesign } from '../../../infrastructure/common/components/button/buttonDesign';
import UploadAvatar from '../../../infrastructure/common/components/input/upload-avatar';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import InputSelectCategoryCommon from '../../../infrastructure/common/components/input/select-category-common';
import InputTextAreaCommon from '../../../infrastructure/common/components/input/text-area-common';
import TextEditorCommon from '../../../infrastructure/common/components/input/text-editor-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import UploadAvatarBlog from '../../../infrastructure/common/components/input/upload-avatar-blog';

const SlugBlogManagement = () => {
    const [detail, setDetail] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [originalImage, setOriginalImage] = useState<string | null>(null);

    const categoryBlogState = useRecoilValue(CategoryBlogState).data
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const navigate = useNavigate();
    const { id } = useParams();
    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setData({ ...dataRequest });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onBack = () => {
        navigate(ROUTE_PATH.BLOG_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (id) {
            try {
                await blogService.GetBlogAdminById(
                    id,
                    setLoading
                ).then((res) => {
                    setDetail(res)
                })
            }
            catch (error) {
                console.error(error)
            }
        }

    }
    useEffect(() => {
        onGetByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detail) {
            const imgUrl = configImageURL(detail.imageCode);
            setOriginalImage(imgUrl); // 👈 Lưu URL ảnh gốc để so sánh
            setDataRequest({
                image: imgUrl,
                title: detail.title,
                shortDescription: detail.shortDescription,
                content: detail.content,
                categoryId: detail?.category?.id,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await blogService.UpdateBlogAdmin(
                String(id),
                {
                    image: dataRequest.image !== originalImage ? dataRequest.image : null,
                    title: dataRequest.title,
                    shortDescription: dataRequest.shortDescription,
                    content: dataRequest.content,
                    categoryId: dataRequest.categoryId,
                },
                onBack,
                setLoading
            )
        } else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };

    return (
        <AdminLayout
            title={'Chi tiết tin tức'}
            breadcrumb={'Tin tức'}
            redirect={ROUTE_PATH.BLOG_MANAGEMENT}
        >
            <div className={styles.management_container}>
                <div className={styles.content}>
                    <div className={styles.btn_container}>
                        <ButtonDesign
                            classColor={'transparent'}
                            onClick={onBack}
                            title={'Quay lại'}
                            width={130}
                        />
                        <ButtonDesign
                            classColor={'green'}
                            onClick={onUpdateAsync}
                            title={'Cập nhật'}
                            width={130}
                        />
                    </div>
                    <div className={styles.form_container}>
                        <Row gutter={[30, 20]}>
                            <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={`${styles.border_add} flex justify-center`}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <div className={styles.legend_title}>Thêm mới ảnh</div>
                                        <UploadAvatarBlog
                                            dataAttribute={dataRequest.image}
                                            setData={setDataRequest}
                                            attribute={'image'}
                                            label={'Ảnh'}
                                            listType={'picture-card'}
                                            shape={'card'} />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={14} lg={16} xl={18} xxl={19} className={styles.border_add}>
                                <div className={styles.legend_title}>Thông tin chi tiết</div>
                                <Row gutter={[30, 20]}>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tiêu đề"}
                                            attribute={"title"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.title}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <InputSelectCategoryCommon
                                            label={"Danh mục"}
                                            attribute={"categoryId"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.categoryId}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            listDataOfItem={categoryBlogState}
                                            nameOfLabel='name'
                                            nameOfValue='id'
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextAreaCommon
                                            label={"Mô tả ngắn"}
                                            attribute={"shortDescription"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.shortDescription}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            placeholder={''}
                                        />
                                    </Col>

                                </Row>
                            </Col>
                            <Col span={24}>
                                <TextEditorCommon
                                    label={"Nội dung"}
                                    attribute={"content"}
                                    isRequired={true}
                                    dataAttribute={dataRequest.content}
                                    setData={setDataRequest}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout>
    )
}

export default SlugBlogManagement