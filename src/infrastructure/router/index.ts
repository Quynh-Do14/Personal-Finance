import { ROUTE_PATH } from "../../core/common/appRouter";
import GoalSpendingPage from "../../page/goal";
import GoalSpendingTeamPage from "../../page/goal/goal-team";
import HomePage from "../../page/home";
import PersonalFinancePage from "../../page/goal/personal-finance";
import ReportPage from "../../page/report";
import TeamPage from "../../page/team";

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
        private: false,
    },
    {
        path: ROUTE_PATH.GOAL_SPENDING_PAGE,
        component: GoalSpendingPage,
        private: false,
    },
    {
        path: ROUTE_PATH.GOAL_SPENDING_TEAM_PAGE,
        component: GoalSpendingTeamPage,
        private: false,
    },
    {
        path: ROUTE_PATH.TEAM_PAGE,
        component: TeamPage,
        private: false,
    },

]