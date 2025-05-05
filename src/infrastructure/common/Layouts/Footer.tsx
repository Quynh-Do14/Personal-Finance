import { Col, Row } from "antd";
import "../../../assets/styles/components/MainLayout.css";
import { ROUTE_PATH } from "../../../core/common/appRouter";
import logo from "../../../assets/images/logo-footer.png"
import fb from "../../../assets/images/icon/fb.png"
import ig from "../../../assets/images/icon/ig.png"
import ytb from "../../../assets/images/icon/ytb.png"
import tw from "../../../assets/images/icon/tw.png"

const FooterClient = () => {
    return (
        <footer className="footer-container padding-common">
            <Row gutter={[20, 20]}>
                <Col sm={24} md={12} lg={8}>
                    <img src={logo} alt="" className="logo" />
                    <div className="link-container">
                        <div className="flex flex-col gap-4">
                            <p>Kết nối với chúng tôi</p>
                            <div className="link">
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={fb} alt="" /></a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={ig} alt="" /></a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={ytb} alt="" /></a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={tw} alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={24} md={12} lg={4}>
                    <h2>VỀ FATS</h2>
                    <ul className="flex flex-col gap-4">
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="#">Dịch vụ</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Liên hệ</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <h2>CHÍNH SÁCH HỖ TRỢ</h2>
                    <ul className="flex flex-col gap-4">
                        <li><a href={ROUTE_PATH.USE_PRIVATE_POLICY}>Chính sách về quyền riêng tư</a></li>
                        <li><a href={ROUTE_PATH.TERM_OF_SERVICE}>Thỏa thuận sử dụng dịch vụ</a></li>
                        <li><a href={ROUTE_PATH.REFUND_POLICY}>Chính sách hoàn trả</a></li>
                        <li><a href={ROUTE_PATH.SERVICE_STANDARD}>Tiêu chuẩn dịch vụ</a></li>
                        <li><a href={ROUTE_PATH.PAYMENT_POLICY}>Chính sách thanh toán</a></li>
                    </ul>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <h2>THÔNG TIN LIÊN HỆ</h2>
                    <div className="flex flex-col gap-4">
                        <p>
                            <i className="fa fa-map-marker" aria-hidden="true"></i> L17-11, Vincom center, 72 Lê Thánh Tôn, Bến Nghé, Q.1, HCM
                        </p>
                        <p>
                            <i className="fa fa-phone" aria-hidden="true"></i> (028) 987 654 - 0943803333
                        </p>
                        <p>
                            <i className="fa fa-envelope" aria-hidden="true"></i> lienhe@fats.vn
                        </p>
                        <p>
                            <i className="fa fa-globe" aria-hidden="true"></i> www.fats.vn - MST: 0318807860
                        </p>
                        <p>
                            GIẤY PHÉP KINH DOANH: số 0318807860 bởi Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh
                        </p>
                    </div>
                </Col>
                <Col span={24}>
                    <div className="flex justify-center">
                        <a href="//www.dmca.com/Protection/Status.aspx?ID=60d23d0c-f8a6-4d1b-b3fc-b90faaa075f9" title="DMCA.com Protection Status" className="dmca-badge"> <img src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-10.png?ID=60d23d0c-f8a6-4d1b-b3fc-b90faaa075f9" alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
                    </div>
                </Col>
            </Row>
        </footer>
    )
}

export default FooterClient