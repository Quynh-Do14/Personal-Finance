import React, { useEffect, useState } from 'react'
import LayoutClient from '../../infrastructure/common/Layouts/Client-Layout'
import SEOHelmet from '../../infrastructure/common/components/SEO/Helmet'
import BannerCommon from '../../infrastructure/common/components/banner/BannerCommon'
import banner1 from "../../assets/images/banner/banner1.png"
import "../../assets/styles/page/blog.css";
import { Col, Row } from 'antd'
import { configImageURL, convertSlug, splitTakeId } from '../../infrastructure/helper/helper'
import { ROUTE_PATH } from '../../core/common/appRouter'
import blogService from '../../infrastructure/repositories/blog/blog.service'
import { useParams } from 'react-router-dom'
import { FullPageLoading } from '../../infrastructure/common/components/controls/loading'

const BlogDetailPage = () => {
    const [blogDetail, setBlogDetail] = useState<any>({})
    const [relatedBlogs, setRelatedBlogs] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams();

    const onGetDetailAsync = async () => {
        try {
            await blogService.GetBlogById(
                splitTakeId(String(id)),
                setLoading
            ).then((res) => {
                setBlogDetail(res.blog);
                setRelatedBlogs(res.relatedBlogs)
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        onGetDetailAsync().then(_ => { });
    }, [])

    return (
        <LayoutClient>
            <SEOHelmet
                title={blogDetail?.title}
                description={blogDetail?.shortDescription}
                image={configImageURL(blogDetail?.imageCode)}
            />
            <div className="blog">
                <BannerCommon
                    title={blogDetail.title}
                    sub={"Tin tức"}
                    backgroundUrl={configImageURL(blogDetail.imageCode)}
                />
                <div className="padding-common">
                    <Row gutter={[40, 20]} wrap>
                        {/* Bài viết chính hiển thị trước trên mobile */}
                        <Col xs={24} md={16} className="order-1 md:order-2">
                            <article
                                style={{ padding: '0 8px' }}
                                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                            />
                        </Col>

                        {/* Tin nổi bật chuyển xuống dưới trên mobile */}
                        <Col xs={24} md={8} className="order-2 md:order-1">
                            <div className="flex flex-col gap-12 left">
                                <h2 className="category-name">Tin liên quan</h2>
                                {relatedBlogs.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col mb-3 gap-4 md:gap-10 items-center md:items-end"
                                    >
                                        <div className="item-image w-full">
                                            <a href={`${ROUTE_PATH.BLOG_BY_ID.replace("/:id", "")}/${convertSlug(item?.title)}-${item?.id}.html`}>
                                                <div
                                                    className="bg-img"
                                                    style={{
                                                        backgroundImage: `url(${configImageURL(item.imageCode)})`,
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div className="item-text text-left md:text-right w-full">
                                            <p className="author">
                                                <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                                                <span>{item.createdAt} </span>
                                                <i className="fa fa-user-o ms-4 me-2" aria-hidden="true"></i>
                                                <span>{item.createdBy}</span>
                                            </p>
                                            <a href={`${ROUTE_PATH.BLOG_BY_ID.replace("/:id", "")}/${convertSlug(item?.title)}-${item?.id}.html`} className="title">
                                                {item.title}
                                            </a>
                                            <p className="description">{item.shortDescription}</p>
                                            <a href={`${ROUTE_PATH.BLOG_BY_ID.replace("/:id", "")}/${convertSlug(item?.title)}-${item?.id}.html`} className="see-move">
                                                Xem chi tiết
                                                <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default BlogDetailPage