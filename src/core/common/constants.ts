import Icon, { CalendarOutlined, ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TableOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý danh mục",
                link: ROUTE_PATH.HOME_PAGE,
                icon: UserOutlined
            },

        ]
    };
    static MenuClient = class {
        static List = [
            {
                label: "Trang chủ",
                link: ROUTE_PATH.HOME_PAGE,
                private: false,
                icon: "fa fa-home"
            },
            {
                label: "Tài chính",
                link: ROUTE_PATH.GOAL_SPENDING_PAGE,
                private: true,
                icon: "fa fa-money",
            },
            {
                label: "Quỹ nhóm",
                link: ROUTE_PATH.TEAM_PAGE,
                private: true,
                icon: "fa fa-users"
            },
            {
                label: "Liên hệ",
                link: ROUTE_PATH.CONTACT,
                private: false,
                icon: "fa fa-envelope"
            },
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationClientConfigs = class {
        static Size = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "8", value: 8 },
            { label: "16", value: 16 },
            { label: "48", value: 48 },
        ]
    };

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static TimeFilter = class {
        static List = [
            { label: "Ngày", value: "daily" },
            { label: "Tuần", value: "weekly" },
            { label: "Tháng", value: "monthly" },
            { label: "Lựa chọn thời gian", value: "" },

        ]
    }

    static BotChatList = class {
        static List = [
            { label: "Nghiêm túc", value: 1 },
            { label: "Thân thiện", value: 2 },
            { label: "Vui vẻ", value: 3 },
            { label: "Nghiêm khắc", value: 4 },
            { label: "Trầm tĩnh", value: 5 },
            { label: "Năng động", value: 6 },
        ]
    }
    static FigureUI = class {
        static List = [
            { label: "Thành viên", value: 500, percent: false },
            { label: "Hài lòng", value: 95, percent: true },
            { label: "Đánh giá tích cực", value: 92, percent: true },
        ]
    }
    static Services = class {
        static List = [
            {
                title: "Tài chính cá nhân",
                description: "The quick fox jumps over the lazy dog",
                path: ROUTE_PATH.GOAL_SPENDING_PAGE
            },
            {
                title: "Lập nhóm tiết kiệm",
                description: "The quick fox jumps over the lazy dog",
                path: ROUTE_PATH.TEAM_PAGE
            },
            {
                title: "Phân tích tài chính",
                description: "The quick fox jumps over the lazy dog",
            },
        ]
    }
    static Slogan = class {
        static List = [
            {
                title: "Tài Chính Thông Minh - Tương Lai Vững Chắc",
                description: "Quản lý hiệu quả, đầu tư thông minh, hướng đến sự thịnh vượng bền vững",
                timeout: 5400
            },
            {
                title: "Kiến Tạo Giấc Mơ, Vững Bước Tài Chính",
                description: "Kiểm soát tài chính cá nhân để tạo dựng một tương lai thành công",
                timeout: 6900
            },
            {
                title: "Quản Lý Hiệu Quả - Đầu Tư Thịnh Vượng",
                description: "Giúp bạn lập kế hoạch tài chính và đạt được mục tiêu nhanh hơn",
                timeout: 8200
            },
            {
                title: "Chủ Động Tài Chính, Làm Chủ Cuộc Sống",
                description: "Hành trình xây dựng tự do tài chính bắt đầu từ hôm nay",
                timeout: 13000
            },
            {
                title: "Từ Tiết Kiệm Đến Thịnh Vượng",
                description: "Tối ưu tài chính cá nhân để tận hưởng cuộc sống trọn vẹn hơn",
                timeout: 14500
            },
        ]
    }
    static RandomColor = class {
        static List = [
            {
                background: "#d8f8eb",
                line: "#15b785",
            },

            {
                background: "#ffe3dd",
                line: "#e7745c",
            },
            {
                background: "#e5daff",
                line: "#7e4df4",
            },
            {
                background: "#dee7ff",
                line: "#4e70c3",
            },
        ]
    }
    static CategoryType = class {
        static List = [
            { label: "Thu nhập", value: 1 },
            { label: "Chi phí", value: 2 },
        ]
    }
    static MenuTabFinance = class {
        static List = [
            { label: "Danh mục", value: 1 },
            { label: "Thành viên", value: 2 },
        ]
    }
};