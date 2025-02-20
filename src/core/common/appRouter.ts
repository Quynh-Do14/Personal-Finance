const PREFIX = "";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    ///Client
    HOME_PAGE: `${PREFIX}/`,
    CHAT_BOX_PAGE: `${PREFIX}/chat-box`,
    PERSONAL_FINANCE_PAGE: `${PREFIX}/personal-finance/:id`,
    TEAM_FINANCE_PAGE: `${PREFIX}/team-finance/:id`,

    REPORT_PAGE: `${PREFIX}/report`,
    GOAL_SPENDING_PAGE: `${PREFIX}/goal-spending`,
    GOAL_SPENDING_TEAM_PAGE: `${PREFIX}/goal-spending-team/:id`,
    TEAM_PAGE: `${PREFIX}/team`,


    VERIFY_EMAIL: `${PREFIX}/verify`,

    SELECT_CHAT_BOT: `${PREFIX}/select-bot`,

    ///Management
    MANAGE_LAYOUT: `${PREFIX}/manage-layout`,

    CATEGORY_MANAGEMENT: `${PREFIX}/category`,
    ADD_CATEGORY_MANAGEMENT: `${PREFIX}/category/add`,
    VIEW_CATEGORY_MANAGEMENT: `${PREFIX}/category/view/:id`,

    COURSE_MANAGEMENT: `${PREFIX}/course`,
    ADD_COURSE_MANAGEMENT: `${PREFIX}/course/add`,
    VIEW_COURSE_MANAGEMENT: `${PREFIX}/course/view/:id`,

    TEACHER_MANAGEMENT: `${PREFIX}/teacher`,
    ADD_TEACHER_MANAGEMENT: `${PREFIX}/teacher/add`,
    VIEW_TEACHER_MANAGEMENT: `${PREFIX}/teacher/view/:id`,

    LESSON_MANAGEMENT: `${PREFIX}/lesson`,
    ADD_LESSON_MANAGEMENT: `${PREFIX}/lesson/add`,
    VIEW_LESSON_MANAGEMENT: `${PREFIX}/lesson/view/:id`,

    BANNER_MANAGEMENT: `${PREFIX}/banner`,
    ADD_BANNER_MANAGEMENT: `${PREFIX}/banner/add`,
    VIEW_BANNER_MANAGEMENT: `${PREFIX}/banner/view/:id`,
}