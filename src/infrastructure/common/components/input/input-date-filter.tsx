import "../../../../assets/styles/components/input.css"
type Props = {
    label: string,
    value: string,
    onChange: (value: string) => void;
}

const InputDateFilterCommon = (props: Props) => {
    const {
        value,
        label,
        onChange
    } = props;
    return (
        <div className='date-filter'>
            <div className='title mb-1'>
                <span>
                    <span className='label'>{label}</span>
                </span>
            </div>
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputDateFilterCommon