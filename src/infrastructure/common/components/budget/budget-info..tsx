import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../../core/atoms/profile/profileState'
import { ROUTE_PATH } from '../../../../core/common/appRouter'
import AnimatedNumber from '../controls/AnimatedNumber';
import budgetService from '../../../repositories/budget/budget.service';
import { useEffect, useState } from 'react';
const BudgetInfo = () => {
    const profileState = useRecoilValue(ProfileState).user;
    const [budget, setBudget] = useState<any>({});

    const onGetBudgetAsync = async () => {
        try {
            await budgetService.GetBudget(
                () => { }
            ).then((response) => {
                setBudget(response);

            })
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        onGetBudgetAsync().then(() => { });
    }, []);
    return (
        <div className='budget-info'>
            <div className="budget-info__header">
                <h3>Ngân sách</h3>
                <div className="budget-info__level">
                    Mức độ: {profileState?.budgetAlert?.level || 1}
                </div>
            </div>

            <div className="budget-info__items">
                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng thu nhập</p>
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
                        <p className="budget-item__label">Mức tiết kiệm</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={budget?.goalsSet || 0} /> VNĐ
                        </p>
                    </div>
                </div>

                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-wallet" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng chi tiêu</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={budget?.totalExpense || 0} /> VNĐ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetInfo