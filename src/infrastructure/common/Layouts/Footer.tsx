import { Col, Row } from "antd";
import "../../../assets/styles/components/MainLayout.css";
import { ROUTE_PATH } from "../../../core/common/appRouter";
import logo from "../../../assets/images/logo-footer.png"
const FooterClient = () => {
    return (
        <footer className="footer-container padding-common">
            <Row gutter={[20, 20]}>
                <Col span={8}>
                    <img src={logo} alt="" />
                    <div className="link-container">
                        <div className="flex flex-col gap-4">
                            <p>Kết nối với chúng tôi</p>
                            <div className="link">
                                <div className="link-icon">
                                    <a href="" target='_blank'><i className="fa fa-facebook"></i> </a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><i className="fa fa-instagram"></i> </a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><i className="fa fa-youtube-play" ></i> </a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><i className="fa fa-twitter"></i> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <h2>VỀ FATS</h2>
                    <ul className="flex flex-col gap-4">
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="#">Dịch vụ</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Liên hệ</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </Col>
                <Col span={6}>
                    <h2>CHÍNH SÁCH HỖ TRỢ</h2>
                    <ul className="flex flex-col gap-4">
                        <li><a href={ROUTE_PATH.USE_PRIVATE_POLICY}>Chính sách về quyền riêng tư</a></li>
                        <li><a href={ROUTE_PATH.TERM_OF_SERVICE}>Thỏa thuận sử dụng dịch vụ</a></li>
                        <li><a href={ROUTE_PATH.REFUND_POLICY}>Chính sách hoàn trả</a></li>
                        <li><a href={ROUTE_PATH.SERVICE_STANDARD}>Tiêu chuẩn dịch vụ</a></li>
                        <li><a href={ROUTE_PATH.PAYMENT_POLICY}>Chính sách thanh toán</a></li>
                    </ul>
                </Col>
                <Col span={6}>
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
            </Row>
        </footer>
    )
}

export default FooterClient