import "../../../assets/styles/components/MainLayout.css";
import { ROUTE_PATH } from "../../../core/common/appRouter";

const FooterClient = () => {
    return (
        <footer className="footer-container padding-common">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cột 1: Thông tin công ty */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <h2>Công ty TNHH MTV FATS</h2>
                    </div>
                    <p>
                        <strong>ĐỊA CHỈ:</strong> L17-11, tầng 17, toà nhà Vincom, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP HCM, Việt Nam
                    </p>
                    <p>
                        <strong>PHONE:</strong> (+84) 37 894 3226
                    </p>
                    <p>
                        <strong>EMAIL:</strong> admin@fats.vn
                    </p>
                    <p>
                        <strong>WEBSITE:</strong> fats.vn
                    </p>
                    <p>
                        <strong>MST:</strong> 0318807860
                    </p>
                    <p>
                        <strong>GIẤY PHÉP KINH DOANH:</strong> số 0318807860 bởi Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh
                    </p>
                </div>

                {/* Cột 2: Hỗ trợ người dùng */}
                <div>
                    <h3>Mạng xã hội</h3>
                    {/* <ul className="flex flex-col gap-5">
                        <li><a href="#">Hướng dẫn tải code có phí</a></li>
                        <li><a href="#">Hướng dẫn nạp tiền</a></li>
                        <li><a href="#">Hướng dẫn hỗ trợ kỹ thuật</a></li>
                        <li><a href="#">Hướng dẫn nhận tiền & thanh toán</a></li>
                        <li><a href="#">Hướng dẫn thanh toán VNPAY</a></li>
                    </ul> */}
                </div>

                {/* Cột 3: Chính sách */}
                <div>
                    <h3>Chính sách</h3>
                    <ul className="flex flex-col gap-5">
                        <li><a href={ROUTE_PATH.USE_PRIVATE_POLICY}>Chính sách về quyền riêng tư của người dùng</a></li>
                        <li><a href={ROUTE_PATH.TERM_OF_SERVICE}>Thỏa thuận sử dụng dịch vụ</a></li>
                        <li><a href={ROUTE_PATH.REFUND_POLICY}>Chính sách hoàn trả</a></li>
                        <li><a href={ROUTE_PATH.SERVICE_STANDARD}>Tiêu chuẩn dịch vụ</a></li>
                        <li><a href={ROUTE_PATH.PAYMENT_POLICY}>Chính sách thanh toán</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default FooterClient