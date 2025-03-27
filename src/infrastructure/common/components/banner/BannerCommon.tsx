import { useEffect, useState } from 'react'
import '../../../../assets/styles/components/banner.css'
import { Col, Row } from 'antd';
import TitleComponent from '../controls/TitleComponent';
type Props = {
    title: string
    sub: string
    color?: "white" | "black"
}
const BannerCommon = (props: Props) => {
    const { title, sub, color = "white" } = props;
    return (
        <div className="banner-common">
            <div className='overlay'></div>
            <div className="layout text-center bg-cover bg-center py-20">
                <TitleComponent title={sub} color={color} />
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default BannerCommon