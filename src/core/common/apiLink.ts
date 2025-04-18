export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Profile = "/auth/get/profile"
        static ProfileUpdate = "/auth/update-profile"
        static Customer = "/customers/update"
        static ChangePassword = "/profile/change-password"
        static RefreshToken = "/auth/refresh-token"
        static SelectBot = "/auth/user/change-bot"
        static Verify = "/auth/verify"
    }
    static Goal = class {
        static Personal = class {
            static Get = "/goals/user/all"
            static GetById = "/goals/detail"
            static Add = "/goals/user/create"
        }
        static Team = class {
            static Get = "/goals/user/team"
            static GetById = "/goals/detail"
            static Add = "/goals/team/create"
        }
    }
    static Team = class {
        static Get = "/members/user/all"
        static Create = "/teams/user/create"
        static Join = "/members/t/join"
        static Member = "/teams/users"
        static AddMember = "/members/add-member"
        static Leave = "/members/user/leave"
    }
    static Chat = class {
        static Personal = class {
            static Get = "/chat-logs/me/all"
            static Add = "/ai/chat/spend"
            static GetBill = "/ai/bill/info"
        }
        static Team = class {
            static Get = "/chat-logs/team/all"
            static Add = "/ai/chat/team/spend"
            static GetBill = "/ai/bill/info"
        }
    }
    static Income = class {
        static Get = "/incomes/user/get"
        static Create = "/incomes/user/create"
    }

    static Spending = class {
        static Get = "/spends/user/get"
        static Create = "/spends/user/create"
    }
    static Static = class {
        static Personal = class {
            static GetStatisticalGoal = "/spends/user/statistical"
        }
        static Team = class {
            static GetStatisticalGoal = "/spends/team/statistical"
        }
    }
    static SpendingType = class {
        static Team = class {
            static Get = "/types/team/all"
            static GetById = "/types/team"
            static Add = "/types/team/create"
            static Update = "/types/team/update"
            static Delete = "/types/team/delete"
        }
        static User = class {
            static Get = "/types/user/all"
            static GetById = "/types/user"
            static Add = "/types/user/create"
            static Update = "/types/user/update"
            static Delete = "/types/user/delete"
        }
    }

    static IncomeType = class {
        static Team = class {
            static Get = "/income-types/team/all"
            static GetById = "/income-types/team"
            static Add = "/income-types/team/create"
            static Update = "/income-types/team/update"
            static Delete = "/income-types/team/delete"
        }
        static User = class {
            static Get = "/income-types/user/all"
            static GetById = "/income-types/user"
            static Add = "/income-types/user/create"
            static Update = "/income-types/user/update"
            static Delete = "/income-types/user/delete"
        }
    }
    static Icon = class {
        static Get = "/icons/public/all"
        static Create = "/icons/admin/create"
        static Delete = "/icons/admin/delete"
    }
    static Subscription = class {
        static Payment = "/payment"
        static Get = "/subscriptions/private/histories"
        static Create = "subscriptions/private/subscribe"
    }
}