import { CalendarOutlined, ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TableOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
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

    static TabCourse = class {
        static List = [
            { label: "Mô tả khóa học", value: 1 },
            { label: "Giáo viên giảng dạy", value: 2 },
            { label: "Kết quả đạt được", value: 3 },
            { label: "Đối tượng học sinh", value: 4 },
        ]
    }
    static TabLesson = class {
        static List = [
            { label: "Mô tả bài giảng", value: 1 },
            { label: "Tài liệu bài giảng", value: 2 },
        ]
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


};