import { ROUTE_PATH } from "../../core/common/appRouter";
import GoalSpendingPage from "../../page/goal";
import GoalSpendingTeamPage from "../../page/goal/goal-team";
import HomePage from "../../page/home";
import PersonalFinancePage from "../../page/goal/personal-finance";
import ReportPage from "../../page/report";
import TeamPage from "../../page/team";
import TeamFinancePage from "../../page/goal/team-finance";
import VerifyEmailPage from "../../page/Auth/VerifyEmail";
import SelectBotPage from "../../page/chat/selectBot";
import UserPrivatePolicy from "../../page/policy/user-private";
import PaymentPolicy from "../../page/policy/payment-policy";
import ServiceStandard from "../../page/policy/service-standard";
import TermOfServicePolicy from "../../page/policy/term-of-service";
import RefundPolicy from "../../page/policy/refund-policy";
import LoginScreen from "../../page/Auth/LoginScreen";
import RegisterScreen from "../../page/Auth/RegisterScreen";
import BlogPage from "../../page/blog";

export const privateRoutes = [

    {
        path: ROUTE_PATH.HOME_PAGE,
        component: HomePage,
        private: false,
    },
    {
        path: ROUTE_PATH.LOGIN,
        component: LoginScreen,
        private: false,
    },
    {
        path: ROUTE_PATH.REGISTER,
        component: RegisterScreen,
        private: false,
    },
    {
        path: ROUTE_PATH.REPORT_PAGE,
        component: ReportPage,
        private: false,
    },
    {
        path: ROUTE_PATH.PERSONAL_FINANCE_PAGE,
        component: PersonalFinancePage,
        private: true,
    },
    {
        path: ROUTE_PATH.TEAM_FINANCE_PAGE,
        component: TeamFinancePage,
        private: true,
    },
    {
        path: ROUTE_PATH.GOAL_SPENDING_PAGE,
        component: GoalSpendingPage,
        private: true,
    },
    {
        path: ROUTE_PATH.GOAL_SPENDING_TEAM_PAGE,
        component: GoalSpendingTeamPage,
        private: true,
    },
    {
        path: ROUTE_PATH.TEAM_PAGE,
        component: TeamPage,
        private: true,
    },
    {
        path: ROUTE_PATH.BLOG,
        component: BlogPage,
        private: false,
    },
    {
        path: ROUTE_PATH.VERIFY_EMAIL,
        component: VerifyEmailPage,
        private: false,
    },
    {
        path: ROUTE_PATH.SELECT_CHAT_BOT,
        component: SelectBotPage,
        private: true,
    },
    {
        path: ROUTE_PATH.USE_PRIVATE_POLICY,
        component: UserPrivatePolicy,
        private: false,
    },
    {
        path: ROUTE_PATH.PAYMENT_POLICY,
        component: PaymentPolicy,
        private: false,
    },
    {
        path: ROUTE_PATH.REFUND_POLICY,
        component: RefundPolicy,
        private: false,
    },
    {
        path: ROUTE_PATH.SERVICE_STANDARD,
        component: ServiceStandard,
        private: false,
    },
    {
        path: ROUTE_PATH.TERM_OF_SERVICE,
        component: TermOfServicePolicy,
        private: false,
    },

]