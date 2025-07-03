import { Upload } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import styles from '../../../../assets/styles/components/input.module.css'
import { UploadListType } from 'antd/es/upload/interface'

type Props = {
    label: string
    dataAttribute: any
    setData: Function
    attribute: string
    listType: UploadListType
    shape: 'circle' | 'card'
}

const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}
function UploadAvatarBlog(props: Props) {
    const { label, dataAttribute, setData, attribute, listType, shape } = props
    const [value, setValue] = useState<string>('')
    const inputRef = useRef(null)

    const handleChange = (event: any) => {
        getBase64(event.file, (url: any) => {
            setData({
                [attribute]: event.file || ''
            })
            setValue(url)
        })
    }

    useEffect(() => {
        if (value) {
            setValue(value)
        } else if (dataAttribute) {
            setValue(dataAttribute)
        }
    }, [value, dataAttribute])
    return (
        <div className={styles.upload_common}>
            <Upload
                name='avatar'
                listType={listType}
                className={`${shape} custom`}
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}
                id='upload'
                accept="image/png, image/jpeg"
            >
                {value ? (
                    <img
                        src={value}
                        alt='avatar'
                        className={styles[shape]}
                    />
                ) : (
                    <div ref={inputRef}>
                        <PlusOutlined />
                    </div>
                )}
            </Upload>
        </div>
    )
}

export default UploadAvatarBlog
