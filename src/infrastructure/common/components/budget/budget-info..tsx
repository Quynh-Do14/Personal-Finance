import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../../core/atoms/profile/profileState'
import AnimatedNumber from '../controls/AnimatedNumber';
import { BudgetState } from '../../../../core/atoms/budget/budgetState';
const BudgetInfo = () => {
    const profileState = useRecoilValue(ProfileState).user;
    const budget = useRecoilValue(BudgetState).data;

    return (
        <div className='budget-info'>
            <div className="budget-info__items">
                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng thặng dư</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={budget?.totalIncome || 0} /> VNĐ
                        </p>
                    </div>
                </div>

                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-piggy-bank" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng thu chi</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={profileState?.expenseTotal || 0} /> VNĐ
                        </p>
                    </div>
                </div>

                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-wallet" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng nợ</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={profileState?.debt || 0} /> VNĐ
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BudgetInfo