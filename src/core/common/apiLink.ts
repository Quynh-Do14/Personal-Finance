export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Profile = "/profile"
        static ProfileUpdate = "/profile/update"
        static Customer = "/customers/update"
        static ChangePassword = "/profile/change-password"
        static RefreshToken = "/auth/refresh-token"
    }
    static Goal = class {
        static Personal = class {
            static Get = "/goals/user/all"
            static GetById = "/goals/user"
            static Add = "/goals/user/create"
        }
        static Team = class {
            static Get = "/goals/user/team"
            static Add = "/goals/team/create"
        }
    }
    static Team = class {
        static Get = "/members/user/all"
        static Create = "/teams/user/create"
        static Join = "/members/t/join"
        static Member = "/teams/users"
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
            static Add = "/ai/chat/spend"
        }
    }

    static Spend = class {
        static Personal = class {
            static GetStatisticalGoal = "/spends/user/statistical"
        }
        static Team = class {
            static GetStatisticalGoal = "/spends/team/statistical"
        }
    }
}