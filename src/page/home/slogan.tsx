import { Col, Row } from "antd"
import "../../assets/styles/page/homepage.css"
import slogan1 from "../../assets/images/slogan1.png"
import slogan2 from "../../assets/images/slogan2.png"
import slogan3 from "../../assets/images/slogan3.png"

const slogan = [
    {
        title: "Tầm Nhìn",
        sub: "Nền tảng công nghệ số 01",
        des: "Về cung cấp dịch vụ tài chính doanh nghiệp tích hợp trợ lý ảo AI"
    },
    {
        title: "Sứ Mệnh",
        sub: "Cung cấp trải nghiệm tốt nhất",
        des: "Cho người dùng thông qua dịch vụ tài chính và công nghệ hàng đầu"
    },
    {
        title: "giá trị cốt lõi",
        sub: "Quản lý và kết nối hiệu quả",
        des: "Hỗ trợ cá nhân & doanh nghiệp hướng tới phát triển tài chính bền vững"
    },
]
const SloganComponent = () => {
    return (
        <div className="slogan">
            <Row gutter={[60, 20]}>
                {
                    slogan.map((item, index) => {
                        return (
                            <Col
                                lg={8} md={12} sm={12} xs={24}
                                key={index}
                            >
                                <div className="content">
                                    <h2>{item.title}</h2>
                                    <h3>{item.sub}</h3>
                                    <p>{item.des}</p>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <div className="line"></div>
            <Row className="part-2" gutter={[20, 20]} justify={"space-between"} align={"top"}>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <h2>FATS - Financial Analysis Technology Service</h2>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>

                    <h3>Là doanh nghiệp tiên phong trong lĩnh vực phát triển phần mềm phân tích tài chính ứng dụng AI, cung cấp giải pháp quản lý tài sản, tối ưu dòng tiền và lập kế hoạch tài chính cho cá nhân và doanh nghiệp SME.</h3>
                </Col>
                <Col lg={10} md={12} sm={24} xs={24}>
                    <p>FATS cam kết sáng tạo, minh bạch và đáng tin cậy, hướng đến phát triển bền vững và hỗ trợ chuyển đổi số trong tài chính. FATS phục vụ hai nhóm khách hàng chính là: cá nhân có nhu cầu quản lý tài chính, đầu tư & SME cần tối ưu chi phí, dòng tiền để phát triển kinh doanh.</p>
                </Col>
            </Row>
            <Row className="part-2" gutter={[20, 20]}>
                <Col lg={8} md={12} sm={12} xs={24}>
                    <img src={slogan1} alt="" />
                </Col>
                <Col lg={8} md={12} sm={12} xs={24}>
                    <img src={slogan2} alt="" />
                </Col>
                <Col lg={8} md={12} sm={12} xs={24}>
                    <img src={slogan3} alt="" />
                </Col>
            </Row>
        </div>
    )
}

export default SloganComponent