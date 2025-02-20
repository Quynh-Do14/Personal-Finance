import "../../../../assets/styles/components/input.css"
type Props = {
    label: string,
    listDataOfItem: Array<any>,
    onChange: any
}

const SelectFilterCommon = (props: Props) => {
    const {
        listDataOfItem,
        label,
        onChange
    } = props;
    return (
        <div className='select-filter'>
            <div className='title mb-1'>
                <span>
                    <span className='label'>{label}</span>
                </span>
            </div>
            <select
                onChange={onChange}
            >
                {
                    listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>{item.label}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default SelectFilterCommon