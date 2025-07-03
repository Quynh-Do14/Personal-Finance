const PREFIX = "";
const ADMIN_PREFIX = "/FATS/admin";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    VERIFY_EMAIL: `${PREFIX}/auth/verify-email`,
    FORGOT_PASSWORD: `${PREFIX}/auth/forgot-password`,
    RESET_PASSWORD: `${PREFIX}/auth/reset-password`,

    ///Client
    HOME_PAGE: `${PREFIX}/`,
    CHAT_BOX_PAGE: `${PREFIX}/chat-box`,
    PERSONAL_FINANCE_PAGE: `${PREFIX}/goal-spending/personal-finance/:id`,
    TEAM_FINANCE_PAGE: `${PREFIX}/team-finance/:id`,

    REPORT_PAGE: `${PREFIX}/report`,
    HISTORY_TRANSITION: `${PREFIX}/history-transition`,
    GOAL_SPENDING_PAGE: `${PREFIX}/goal-spending`,
    TEAM_PAGE: `${PREFIX}/team`,
    GOAL_SPENDING_TEAM_PAGE: `${PREFIX}/team/spending-team/:id`,
    SELECT_CHAT_BOT: `${PREFIX}/select-bot`,
    BLOG: `${PREFIX}/blog`,
    BLOG_BY_ID: `${PREFIX}/blog/view/:id`,
    PAYMENT_INFO: `${PREFIX}/payment-info`,
    PAYMENT_RESULT: `${PREFIX}/payment`,
    PROFILE: `${PREFIX}/profile`,
    JOIN_TEAM: `${PREFIX}/members/t/join/:id`,

    CONTACT: `${PREFIX}/contact`,

    USE_PRIVATE_POLICY: `${PREFIX}/user-private-policy`,
    REFUND_POLICY: `${PREFIX}/refund-policy`,
    PAYMENT_POLICY: `${PREFIX}/payment-policy`,
    SERVICE_STANDARD: `${PREFIX}/service-standard`,
    TERM_OF_SERVICE: `${PREFIX}/term-of-service`,

    ///Management
    MANAGE_LAYOUT: `${ADMIN_PREFIX}`,

    BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management`,
    ADD_BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management/add`,
    VIEW_BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management/view/:id`,

    BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management`,
    ADD_BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management/add`,
    VIEW_BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management/view/:id`,

}