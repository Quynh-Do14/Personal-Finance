import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import "../../../../assets/styles/components/input.css"
import { validateFields } from '../../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../../helper/validate';
import { MessageError } from '../controls/MessageError';
type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}
const InputNumberCommon = (props: Props) => {
    const {
        label,
        attribute,
        setData,
        submittedTime,
        validate,
        setValidate,
        isRequired,
        dataAttribute,
        disabled = false,
    } = props;

    const [value, setValue] = useState<string>("");

    const formatNumber = (val: string | number): string => {
        const num = typeof val === "string" ? val.replace(/\D/g, "") : val.toString();
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const parseNumber = (val: string): number | null => {
        const parsed = val.replace(/,/g, '');
        return parsed ? parseInt(parsed) : null;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numericValue = rawValue.replace(/[^0-9]/g, ''); // Only digits
        const formatted = formatNumber(numericValue);
        setValue(formatted);
        setData({
            [attribute]: parseNumber(formatted)
        });
    };

    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            const isEmpty = !parseNumber(value);
            validateFields(isImplicitChange, attribute, isEmpty, setValidate, validate, isEmpty ? `Vui lòng nhập ${label.toLowerCase()}` : "");
        }
    };

    useEffect(() => {
        const formatted = formatNumber(dataAttribute || '');
        setValue(formatted);
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    return (
        <div>
            <div className='input-text-common'>
                <label className='title' htmlFor={`${attribute}-input`}>
                    {label}
                </label>
                <div>
                    <input
                        type='text'
                        inputMode='numeric'
                        id={`${attribute}-input`}
                        value={value}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        disabled={disabled}
                        placeholder={`Nhập ${label.toLowerCase()}`}
                        className={`${validate[attribute]?.isError ? "input-error" : ""}`}
                    />
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    )
};
export default InputNumberCommon