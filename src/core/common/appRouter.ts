const PREFIX = "";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    VERIFY_EMAIL: `${PREFIX}/auth/verify`,

    ///Client
    HOME_PAGE: `${PREFIX}/`,
    CHAT_BOX_PAGE: `${PREFIX}/chat-box`,
    PERSONAL_FINANCE_PAGE: `${PREFIX}/goal-spending/personal-finance/:id`,
    TEAM_FINANCE_PAGE: `${PREFIX}/team-finance/:id`,

    REPORT_PAGE: `${PREFIX}/report`,
    GOAL_SPENDING_PAGE: `${PREFIX}/goal-spending`,
    TEAM_PAGE: `${PREFIX}/team`,
    GOAL_SPENDING_TEAM_PAGE: `${PREFIX}/team/spending-team/:id`,
    SELECT_CHAT_BOT: `${PREFIX}/select-bot`,

    CONTACT: `${PREFIX}/contact`,

    USE_PRIVATE_POLICY: `${PREFIX}/user-private-policy`,
    REFUND_POLICY: `${PREFIX}/refund-policy`,
    PAYMENT_POLICY: `${PREFIX}/payment-policy`,
    SERVICE_STANDARD: `${PREFIX}/service-standard`,
    TERM_OF_SERVICE: `${PREFIX}/term-of-service`,

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