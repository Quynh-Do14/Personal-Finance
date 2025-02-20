import { useEffect, useState } from "react";
import authService from "../../infrastructure/repositories/auth/service/auth.service";
import BubbleCommon from "../../infrastructure/common/components/controls/Bubble";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";

const VerifyEmailPage = () => {
    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, onSuccess] = useState<any>(null);
    const goToHomePage = () => {
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const codeURL = params.get('code');
        setCode(String(codeURL));
    }, []);

    // const onSubmitAsync = async () => {
    //     if (code) {
    //         try {
    //             await authService.verifyEmail(
    //                 code,
    //                 onSuccess,
    //                 setLoading
    //             ).then(() => { });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // };
    // useEffect(() => {
    //     if (code) {
    //         onSubmitAsync().then(() => { });
    //     }
    // }, [code]);
    if (success == null) {
        <div className={""}>
            <BubbleCommon />
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
                    <h2 className="text-3xl font-[600] text-center text-[#389d21] mb-6">
                        Đang Xác Thực Tài Khoản
                    </h2>
                    <p className="text-lg text-center text-gray-700 mb-6">
                        Hệ thống đang xác thực Email của bạn
                    </p>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    }
    else if (success == true) {
        return (
            <div className={""}>
                <BubbleCommon />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
                        <h2 className="text-3xl font-[600] text-center text-[#389d21] mb-6">
                            Xác Thực Tài Khoản Thành Công
                        </h2>
                        <p className="text-lg text-center text-gray-700 mb-6">
                            Chào mừng bạn đã xác thực thành công! Bạn có thể tiếp tục sử dụng
                            các tính năng của ứng dụng.
                        </p>
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={goToHomePage}
                                className="py-2 px-4 bg-[#43a9fc] text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                            >
                                Quay lại Trang Chủ
                            </button>
                        </div>
                    </div>
                </div>
                <FullPageLoading isLoading={loading} />
            </div>
        );
    }
    else if (success == false) {
        return (
            <div className={""}>
                <BubbleCommon />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
                        <h2 className="text-3xl font-[600] text-center text-[#fc4343] mb-6">
                            Xác Thực Tài Khoản Không Thành Công
                        </h2>
                        <p className="text-lg text-center text-gray-700 mb-6">
                            Xác thực không thành công, vui lòng thử lại hoặc liên hệ với Email: ai@idaivn
                        </p>
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={goToHomePage}
                                className="py-2 px-4 bg-[#fc4343] text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                            >
                                Quay lại Trang Chủ
                            </button>
                        </div>
                    </div>
                </div>
                <FullPageLoading isLoading={loading} />
            </div>
        );
    }

};

export default VerifyEmailPage;
