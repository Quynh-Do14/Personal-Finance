import React from 'react'
import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../../core/atoms/profile/profileState'
import alert from "../../../../assets/images/alert.png"
import { ROUTE_PATH } from '../../../../core/common/appRouter'
const AlertBudget = () => {
    const profileState = useRecoilValue(ProfileState).user;
    return (
        <div className='alert-common'
            style={{
                background: profileState?.budgetAlert?.level == 1
                    ? "#006699"
                    : profileState?.budgetAlert?.level == 2
                        ?
                        "#c37816f5"
                        :
                        profileState?.budgetAlert?.level == 3
                            ?
                            "#eb001bcc"
                            :
                            "#006699"
            }}
        >
            <img src={alert} alt="" />
            <p>{profileState?.budgetAlert?.level == 0 ? <a href={ROUTE_PATH.PROFILE}>Tạo ngân sách. {" "} </a> : null} {profileState?.budgetAlert?.alert}</p>
        </div>
    )
}

export default AlertBudget