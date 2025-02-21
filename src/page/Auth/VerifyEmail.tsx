import React, { useEffect, useState } from "react";
import { FullPageLoading } from "../../infrastructure/common/components/controls/loading";
import authService from "../../infrastructure/repositories/auth/service/auth.service";
import BubbleCommon from "../../infrastructure/common/components/controls/Bubble";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null); // Đặt kiểu cho `success`
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("useEffect called");
    const params = new URLSearchParams(window.location.search);
    const codeURL = params.get("code");
    console.log("codeURL", codeURL);
    setCode(codeURL || "");
  }, []);

  const onSubmitAsync = async () => {
    if (code) {
      setLoading(true);
      try {
        await authService.verifyEmail(code);
        setSuccess(true);
      } catch (error) {
        console.error(error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (code) {
      console.log("code is set, calling onSubmitAsync");
      onSubmitAsync();
    }
  }, [code]);

  return (
    <div className="">
      <BubbleCommon />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full">
          {success === null ? (
            <>
              <h2 className="text-3xl font-[600] text-center text-[#389d21] mb-6">
                Đang Xác Thực Tài Khoản
              </h2>
              <p className="text-lg text-center text-gray-700 mb-6">
                Hệ thống đang xác thực Email của bạn
              </p>
            </>
          ) : success === true ? (
            <>
              <h2 className="text-3xl font-[600] text-center text-[#389d21] mb-6">
                Xác Thực Tài Khoản Thành Công
              </h2>
              <p className="text-lg text-center text-gray-700 mb-6">
                Chào mừng bạn đã xác thực thành công! Bạn có thể tiếp tục sử dụng các tính năng của ứng dụng.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-[600] text-center text-[#fc4343] mb-6">
                Xác Thực Tài Khoản Không Thành Công
              </h2>
              <p className="text-lg text-center text-gray-700 mb-6">
                Xác thực không thành công, vui lòng thử lại hoặc liên hệ với Email: ai@idaivn
              </p>
            </>
          )}
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
};

export default VerifyEmailPage;