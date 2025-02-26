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

export const privateRoutes = [

    {
        path: ROUTE_PATH.HOME_PAGE,
        component: HomePage,
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
        path: ROUTE_PATH.VERIFY_EMAIL,
        component: VerifyEmailPage,
        private: false,
    },
    {
        path: ROUTE_PATH.SELECT_CHAT_BOT,
        component: SelectBotPage,
        private: true,
    },
]