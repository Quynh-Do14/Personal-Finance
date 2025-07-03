import React, { useEffect, useState } from "react";
import LayoutClient from "../../infrastructure/common/Layouts/Client-Layout";
import BannerCommon from "../../infrastructure/common/components/banner/BannerCommon";
import "../../assets/styles/page/blog.css";
import { PaginationCommon } from "../../infrastructure/common/components/pagination/Pagination";
import banner1 from "../../assets/images/banner/banner1.png"
import SEOHelmet from "../../infrastructure/common/components/SEO/Helmet";
import blogService from "../../infrastructure/repositories/blog/blog.service";
import { useRecoilValue } from "recoil";
import { CategoryBlogState } from "../../core/atoms/category/categoryState";
import { ROUTE_PATH } from "../../core/common/appRouter";
import { configImageURL, convertSlug } from "../../infrastructure/helper/helper";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
const BlogPage = () => {

  const [mainBlogs, setMainBlog] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const categoryBlogState = useRecoilValue(CategoryBlogState).data
  const onGetListAsync = async ({ name = "", page = currentPage }) => {
    const param = {
      page: page - 1,
      size: 10,
      keyword: name,
    }
    try {
      await blogService.GetBlog(
        param,
        setLoading
      ).then((res) => {
        setMainBlog(res.content);
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  const onSearch = async (name = "", page = 1) => {
    await onGetListAsync({ name: name, page: page });
  };

  const onChangePrevPage = async () => {
    setCurrentPage(currentPage - 1)
    await onSearch("", currentPage - 1).then(_ => { });
  };

  const onChangeNextPage = async () => {
    setCurrentPage(currentPage + 1)
    await onSearch("", currentPage + 1).then(_ => { });
  };

  useEffect(() => {
    onSearch().then(_ => { });
  }, []);

  return (
    <LayoutClient>
      <SEOHelmet
        title="Tin tức"
        description="Cập nhật tin tức mới mỗi ngày về công nghệ, xu hướng, kinh doanh, đời sống. Nơi tổng hợp thông tin nhanh chóng, chính xác và hữu ích cho bạn."
      />
      <div className="blog">
        <BannerCommon
          title={"Tin tức"}
          sub={"Tin tức"}
          backgroundUrl={banner1}
        />
        <div className="padding-common">
          <div className="grid grid-cols-12 gap-6 md:gap-16">
            <div className="col-span-12 md:col-span-9 flex flex-col gap-12 order-2 md:order-1 left">
              {
                mainBlogs.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex md:flex-row-reverse flex-col mb-3 gap-4 md:gap-10 items-center">
                      <div className="item-image">
                        <a href={`${ROUTE_PATH.BLOG_BY_ID.replace("/:id", "")}/${convertSlug(item?.title)}-${item?.id}.html`}>
                          <div
                            className="bg-img"
                            style={{
                              backgroundImage: `url(${configImageURL(item.imageCode)})`,
                            }}
                          ></div>
                        </a>
                      </div>
                      <div className="item-text md:text-right">
                        <p className="author">
                          <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                          <span>{item.createdAt} </span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>{item.createdBy}</span>
                        </p>
                        <a href={`${ROUTE_PATH.BLOG_BY_ID.replace("/:id", "")}/${convertSlug(item?.title)}-${item?.id}.html`} className="title">
                          {item.title}
                        </a>
                        <p className="description">
                          {item.shortDescription}
                        </p>
                        <a href={`${ROUTE_PATH.BLOG_BY_ID.replace("/:id", "")}/${convertSlug(item?.title)}-${item?.id}.html`} className="see-move">
                          Xem chi tiết
                          <i
                            className="fa fa-long-arrow-right ms-3"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                  )
                })
              }

              <PaginationCommon
                total={100}
                currentPage={2}
                onChangePage={() => { }}
                pageSize={10}
                onChangeSize={() => { }}
                disabled={false}
                isClient={false}
              />
            </div>
            <div className="order-1 md:order-2 col-span-12 md:col-span-3 right">
              <div className="search-input m-auto">
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Nhập từ khóa..."
                />
                <span>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>

              <div className="hidden md:block mt-10">
                <div className="categories">
                  <h2 className="category-name">Danh Mục Tin</h2>
                  <div className="category-content">
                    <ul>
                      {
                        categoryBlogState.map((item, index) => {
                          return (
                            <li key={index}>
                              <a className="category-item" href="#">
                                {item.name}
                              </a>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>

                {/* <div className="tags">
                  <h2 className="category-name">Tags</h2>
                  <div className="category-content">
                    <div className="flex flex-wrap gap-2">
                      <a className="tags-item" href="#">
                        Tài chính
                      </a>
                      <a className="tags-item" href="#">
                        Dòng tiền
                      </a>
                      <a className="tags-item" href="#">
                        AI
                      </a>
                      <a className="tags-item" href="#">
                        Đầu tư
                      </a>
                      <a className="tags-item" href="#">
                        Quản lý
                      </a>
                    </div>
                  </div>
                </div> */}

                {/* <div className="featured-news">
                  <h2 className="category-name">Tin Nổi Bật</h2>
                  <div className="category-content">
                    <div className="flex flex-col gap-6">
                      <div className="featured-news-item">
                        <a href="#">
                          <div className="featured-news-img">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                              }}
                            ></div>
                          </div>
                        </a>
                        <p className="author">
                          <i
                            className="fa fa-clock-o me-2"
                            aria-hidden="true"
                          ></i>
                          <span>27/03/2025</span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>admin</span>
                        </p>

                        <a href="#" className="title">
                          Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết
                          Định Đầu Tư
                        </a>
                      </div>
                      <div className="featured-news-item">
                        <a href="#">
                          <div className="featured-news-img">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                              }}
                            ></div>
                          </div>
                        </a>
                        <p className="author">
                          <i
                            className="fa fa-clock-o me-2"
                            aria-hidden="true"
                          ></i>
                          <span>27/03/2025</span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>admin</span>
                        </p>

                        <a href="#" className="title">
                          Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết
                          Định Đầu Tư
                        </a>
                      </div>
                      <div className="featured-news-item">
                        <a href="#">
                          <div className="featured-news-img">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                              }}
                            ></div>
                          </div>
                        </a>
                        <p className="author">
                          <i
                            className="fa fa-clock-o me-2"
                            aria-hidden="true"
                          ></i>
                          <span>27/03/2025</span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>admin</span>
                        </p>

                        <a href="#" className="title">
                          Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết
                          Định Đầu Tư
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FullPageLoading isLoading={loading} />
    </LayoutClient>
  );
};

export default BlogPage;
