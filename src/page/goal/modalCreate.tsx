import { Col, Modal, Row } from 'antd'
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputNumberCommon from '../../infrastructure/common/components/input/input-number';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import "../../assets/styles/components/modal.css"
import { CloseOutlined } from '@ant-design/icons';
import UploadImageAvatar from '../../infrastructure/common/components/input/upload-img-avatar';
import InputDateCommon from '../../infrastructure/common/components/input/input-date';

type Props = {
    handleOk: () => void,
    handleCancel: Function,
    visible: boolean,
    data: any,
    setData: Function,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}
const ModalCreateGoal = (props: Props) => {
    const {
        handleOk,
        handleCancel,
        visible,
        data,
        setData,
        validate,
        setValidate,
        submittedTime
    } = props;

    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={true}
            footer={false}
            className='custom-modal'
            onCancel={() => handleCancel()}
            closeIcon={<CloseOutlined />}
        >
            <div>
                <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>Thêm mục tiêu mới</div>
                <Row gutter={[30, 30]} justify={"center"} className='sm:p-4 p-0'>

                    <Col span={24}>
                        <div className='flex flex-col justify-between h-full'>
                            <Row gutter={[15, 15]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={'Tên mục tiêu'}
                                        attribute={'name'}
                                        isRequired={true}
                                        setData={setData}
                                        dataAttribute={data.name}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputNumberCommon
                                        label={'Mục tiêu'}
                                        attribute={'goalAmount'}
                                        isRequired={true}
                                        setData={setData}
                                        dataAttribute={data.goalAmount}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputDateCommon
                                        label={'Thời gian bắt đầu'}
                                        attribute={'startDate'}
                                        isRequired={true}
                                        setData={setData}
                                        dataAttribute={data.startDate}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputDateCommon
                                        label={'Thời gian kết thúc'}
                                        attribute={'endDate'}
                                        isRequired={true}
                                        setData={setData}
                                        dataAttribute={data.endDate}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={24}>
                        <ButtonCommon
                            classColor={'green'}
                            onClick={handleOk}
                            isFullWidth={true}
                            title={'Thêm mục tiêu'}
                        />
                    </Col>
                </Row>

            </div>

        </Modal>
    )
}

export default ModalCreateGoal