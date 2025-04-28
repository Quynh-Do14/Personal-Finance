import introduction from "../../assets/images/banner4.gif"
import { ButtonDesign } from '../../infrastructure/common/components/button/buttonDesign'
import TitleComponent from '../../infrastructure/common/components/controls/TitleComponent'
const IntroductionComponent = () => {
    return (
        <div className="introduction">
            <TitleComponent
                title={'AI & Tự Động Hóa'}
                color={'black'}
            />
            <div className="title top">
                <div>
                    <h2>FATS AI - Gia tăng giá trị tài chính</h2>
                </div>
                <p className="sub top">Đồng Hành Cùng Bạn Trên Hành Trình Tài Chính Bền Vững</p>
            </div>
            <div className='flex gap-2 justify-center'>
                <ButtonDesign
                    width={180}
                    classColor={'green'}
                    title={'Bắt đầu ngay'}
                    onClick={() => { }}
                />
                {/* <ButtonDesign
                    width={180}
                    classColor={'transparent'}
                    title={'Liên hệ tư vấn'}
                    onClick={() => { }}
                /> */}
            </div>
            <img src={introduction} alt="" className="img top" />
        </div>
    )
}

export default IntroductionComponent