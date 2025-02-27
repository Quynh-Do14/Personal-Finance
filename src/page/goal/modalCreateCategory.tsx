import { Col, Modal, Row } from 'antd'
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../infrastructure/common/components/button/button-common';
import "../../assets/styles/components/modal.css"
import { CloseOutlined } from '@ant-design/icons';
import UploadImageAvatar from '../../infrastructure/common/components/input/upload-img-avatar';
import InputSelectCommon from '../../infrastructure/common/components/input/select-common';
import Constants from '../../core/common/constants';

type Props = {
    selectedId: any
    selectedTab: 'spend' | 'income'
    handleOk: () => void,
    handleCancel: Function,
    visible: boolean,
    data: any,
    setData: Function,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    onDeleteCategoryAsync: () => void,
}
const ModalCreateCategory = (props: Props) => {
    const {
        selectedId,
        selectedTab,
        handleOk,
        handleCancel,
        visible,
        data,
        setData,
        validate,
        setValidate,
        submittedTime,
        onDeleteCategoryAsync
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
                {
                    selectedId
                        ?
                        <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>
                            {selectedTab == 'spend' ? "Cập nhật danh mục chi phí" : "Cập nhật danh mục thu nhập"}
                        </div>
                        :
                        <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>
                            {selectedTab == 'spend' ? "Thêm danh mục chi phí" : "Thêm danh mục thu nhập"}
                        </div>
                }
                <Row gutter={[30, 30]} justify={"center"} className='sm:p-4 p-0'>
                    <Col span={24}>
                        <div className='flex flex-col justify-between h-full'>
                            <Row gutter={[15, 15]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={'Tên danh mục'}
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
                            </Row>
                        </div>
                    </Col>
                    <Col span={24}>
                        <ButtonCommon
                            classColor={'green'}
                            onClick={handleOk}
                            isFullWidth={true}
                            title={selectedId ? "Cập nhật danh mục" : "Thêm danh mục"}
                        />
                    </Col>
                    {
                        selectedId
                        &&
                        <Col span={24}>
                            <ButtonCommon
                                classColor={'white'}
                                onClick={onDeleteCategoryAsync}
                                isFullWidth={true}
                                title={"Xóa danh mục"}
                            />
                        </Col>
                    }
                </Row>

            </div>

        </Modal>
    )
}

export default ModalCreateCategory