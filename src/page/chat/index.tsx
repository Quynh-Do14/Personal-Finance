import { useEffect, useRef, useState } from "react";
import { Drawer, Image, Tooltip } from "antd";
import "../../assets/styles/page/chat.css"
import { configImageURL, convertDateShow, getBase64 } from "../../infrastructure/helper/helper";
import TypingIndicator from "../../infrastructure/common/components/controls/Typing";
import gptIcon from "../../assets/images/gpt-icon.png"
import chatService from "../../infrastructure/repositories/chat/chat.service";
import InputNumberCommon from "../../infrastructure/common/components/input/input-number";
import InputDateCommon from "../../infrastructure/common/components/input/input-date";
import InputSelectCategoryCommon from "../../infrastructure/common/components/input/select-category-common";
import { ButtonDesign } from "../../infrastructure/common/components/button/buttonDesign";
import Constants from "../../core/common/constants";
import incomeTypeService from "../../infrastructure/repositories/type/income-type.service";
import spendingTypeService from "../../infrastructure/repositories/type/spending-type.service";
import inComesService from "../../infrastructure/repositories/in-comes/in-comes.service";
import spendService from "../../infrastructure/repositories/spend/spend.service";
type Props = {
    titleChat: string
    isOpen: boolean,
    closeDrawer: () => void,
    loading: boolean,
    setLoading: Function
    dataChatBox: Array<any>
    handleSendMessage: () => void
    messages: string
    setMessages: Function
    idGoal: string
    idTeam?: string
}

const ChatBoxCommon = (props: Props) => {
    const {
        isOpen,
        closeDrawer,
        loading = false,
        setLoading,
        dataChatBox,
        handleSendMessage,
        messages,
        setMessages,
        idGoal,
        idTeam = null
    } = props;

    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [imageBill, setImageBill] = useState<any>();
    const [valueFile, setValueFile] = useState<any>();
    const [isChatContent, setIsChatContent] = useState<boolean>(true);
    const [listSpendingType, setListSpendingType] = useState<Array<any>>([]);
    const [listIncomeType, setListIncomeType] = useState<Array<any>>([]);

    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_dataRequest, _setDataRequest] = useState<any>({});
    const dataRequest = _dataRequest;

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setDataRequest({ ...dataRequest })
    }
    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };


    useEffect(() => {
        if (isOpen) {
            // Cuộn đến cuối khi mở Drawer
            setTimeout(() => {
                chatBoxRef.current?.scrollTo({
                    top: chatBoxRef.current.scrollHeight,
                    behavior: "smooth"
                });
            }, 100); // Đảm bảo cuộn sau khi Drawer được mở
        }
    }, [isOpen, dataChatBox]); // Lắng nghe khi Drawer mở và khi có tin nhắn mới

    useEffect(() => {

        setTimeout(() => {
            const chatBox = chatBoxRef.current;
            if (!chatBox) return;

            const handleScroll = () => {
                const isNearBottom = chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 50;
                setIsAtBottom(isNearBottom);
            };

            chatBox.addEventListener("scroll", handleScroll);

            return () => {
                chatBox.removeEventListener("scroll", handleScroll);
            };
        }, 100)
    }, [isOpen]);

    const scrollToBottom = () => {
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    };
    const onChangeText = (e: any) => {
        setMessages(e.target.value)
    }

    const sendMessage = () => {
        handleSendMessage();
        setTimeout(() => {
            scrollToBottom(); // Cuộn xuống sau khi tin nhắn được cập nhật
        }, 100);
    };


    const onUploadImageBillAsync = async (event: any) => {
        getBase64(event.target.files[0], (url: any) => {
            setImageBill(url || '')
            setValueFile(event.target.files[0])
        });
        try {
            await chatService.GetBillPersonal(
                String(idGoal),
                {
                    file: (event.target.files[0])
                },
                setLoading
            ).then(() => {
                setImageBill(null);
                setValueFile("");
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    // Danh mục
    const onGetSpendingTypeAsync = async () => {
        try {
            await spendingTypeService.GetUser(
                {},
                () => { }
            ).then((res) => {
                setListSpendingType(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const onGetIncomeTypeAsync = async () => {
        try {
            await incomeTypeService.GetUser(
                {},
                () => { }
            ).then((res) => {
                setListIncomeType(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        onGetSpendingTypeAsync().then(() => { });
        onGetIncomeTypeAsync().then(() => { });
    }, [])
    /////
    // Danh mục
    const onGetSpendingTypeTeamAsync = async () => {
        if (idTeam) {
            try {
                await spendingTypeService.GetTeam(
                    String(idTeam),
                    {},
                    () => { }
                ).then((res) => {
                    setListSpendingType(res.content);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    const onGetIncomeTypeTeamAsync = async () => {
        if (idTeam) {
            try {
                await incomeTypeService.GetTeam(
                    String(idTeam),
                    {},
                    () => { }
                ).then((res) => {
                    setListIncomeType(res.content);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        onGetSpendingTypeTeamAsync().then(() => { });
        onGetIncomeTypeTeamAsync().then(() => { });
    }, [idTeam])
    /////

    const onTransitAsync = async () => {
        if (dataRequest.type == 1) {
            try {
                await inComesService.CreateIncome(
                    String(idGoal),
                    {
                        inComeTypeId: dataRequest.typeId,
                        amount: dataRequest.amount,
                        occurrenceDate: dataRequest.occurrenceDate
                    },
                    () => { },
                    () => { }
                ).then((res) => {
                    setListIncomeType(res.content);
                })
            }
            catch (error) {
                console.error(error);
            }
        } else {
            try {
                await spendService.CreateSpend(
                    String(idGoal),
                    {
                        spendingTypeId: dataRequest.typeId,
                        amount: dataRequest.amount,
                        occurrenceDate: dataRequest.occurrenceDate
                    },
                    () => { },
                    () => { }
                ).then((res) => {
                    setListIncomeType(res.content);
                })
            }
            catch (error) {
                console.error(error);
            }
        }

    }

    return (
        <Drawer
            placement="right"
            onClose={closeDrawer}
            open={isOpen}
            headerStyle={{
                display: 'none'
            }}
        >
            {
                isChatContent
                    ?
                    <div className="chat-box-container" >
                        <div className="header">
                            <i onClick={closeDrawer} className="fa fa-arrow-left text-[#999] text-[20px] cursor-pointer" aria-hidden="true"></i>
                            <img src={gptIcon} alt="" />
                            <div className="status-container">
                                <div className="title">ChatGPT</div>
                                <div className="status-line">
                                    <span className="dot" />
                                    <span className="status-text">Online</span>
                                </div>
                            </div>
                            <i className="fa fa-refresh text-[#999] text-[20px] cursor-pointer" aria-hidden="true"
                                onClick={() => { setIsChatContent(!isChatContent) }}
                            ></i>
                        </div>
                        <div className="chat-box" ref={chatBoxRef}>
                            {dataChatBox.map((message, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className={`flex justify-end`}>
                                        <Tooltip title={convertDateShow(message.createdAt)} color="#003333">
                                            {
                                                message.chatType === "TEXT"
                                                    ?
                                                    <div className="human-chat">
                                                        {message.userMessage}
                                                    </div>
                                                    :
                                                    <div className="human-chat-img">
                                                        <Image src={configImageURL(message.userMessage)} alt="" />
                                                    </div>
                                            }

                                        </Tooltip>
                                    </div>
                                    <div key={index} className={`flex justify-start`}>
                                        <Tooltip title={convertDateShow(message.createdAt)} color="#666666">
                                            <div className="ai-chat">
                                                {message.botMessage}
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                            {
                                loading
                                    ?
                                    <div
                                        className="flex flex-col gap-2"
                                    >

                                        <div
                                            className={`flex justify-end`}
                                        >
                                            {
                                                imageBill
                                                    ?
                                                    <div className="human-chat-img">
                                                        <img src={imageBill} alt="" />
                                                    </div>
                                                    :
                                                    <div
                                                        className="human-chat"
                                                    >
                                                        {messages}
                                                    </div>
                                            }

                                        </div>
                                        <div

                                            className={`flex justify-start`}
                                        >
                                            <div
                                                className="ai-chat"
                                            >
                                                <TypingIndicator />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        {!isAtBottom && (
                            <button className="scroll-button" onClick={scrollToBottom}>
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                            </button>
                        )}
                        <div className="input-chat">
                            <input
                                type="text"
                                placeholder="Nhập tin nhắn của bạn..."
                                value={messages}
                                onChange={onChangeText}
                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <div className="upload-img-bill">
                                <label htmlFor="upload-bill">
                                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                </label>
                                <input
                                    value={valueFile}
                                    type="file"
                                    name=""
                                    id="upload-bill"
                                    onChange={onUploadImageBillAsync}
                                />
                            </div>

                            <button onClick={sendMessage}>
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="chat-box-container" >
                        <div className="header">
                            <i onClick={closeDrawer} className="fa fa-arrow-left text-[#999] text-[20px] cursor-pointer" aria-hidden="true"></i>
                            <img src={gptIcon} alt="" />
                            <div className="status-container">
                                <div className="title">ChatGPT</div>
                                <div className="status-line">
                                    <span className="dot" />
                                    <span className="status-text">Online</span>
                                </div>
                            </div>
                            <i className="fa fa-refresh text-[#999] text-[20px] cursor-pointer" aria-hidden="true"
                                onClick={() => { setIsChatContent(!isChatContent) }}
                            ></i>
                        </div>
                        <div className="form-expense">
                            <InputSelectCategoryCommon
                                label={"Thu nhập / Chi phí"}
                                attribute={"type"}
                                isRequired={true}
                                dataAttribute={dataRequest.type}
                                setData={setDataRequest}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={Constants.CategoryType.List}
                                nameOfValue={"value"}
                                nameOfLabel={"label"}
                            />

                            <InputSelectCategoryCommon
                                label={"Danh mục"}
                                attribute={"typeId"}
                                isRequired={true}
                                dataAttribute={dataRequest.typeId}
                                setData={setDataRequest}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={dataRequest.type == 1 ? listIncomeType : dataRequest.type == 2 ? listSpendingType : []}
                                nameOfValue={"id"}
                                nameOfLabel={"name"}
                            />
                            <InputNumberCommon
                                label={"Số tiền"}
                                attribute={"amount"}
                                isRequired={true}
                                dataAttribute={dataRequest.amount}
                                setData={setDataRequest}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />

                            <InputDateCommon
                                label={"Ngày giao dịch"}
                                attribute={"occurrenceDate"}
                                isRequired={true}
                                dataAttribute={dataRequest.occurrenceDate}
                                setData={setDataRequest}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                            <ButtonDesign
                                classColor={"green"}
                                onClick={onTransitAsync}
                                title={"Nhập giao dịch"}
                            />
                        </div>
                    </div>
            }


        </Drawer >
    );
};

export default ChatBoxCommon;
