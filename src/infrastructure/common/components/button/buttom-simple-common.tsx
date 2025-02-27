import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "green" | "red" | "white",
    onClick: () => void,
    icon?: any,
    title: string,
    isFullWidth?: boolean
    disabled?: boolean
}
export const ButtonSimpleCommon = (props: Props) => {
    const {
        classColor,
        onClick,
        icon,
        title,
        isFullWidth = false,
        disabled
    } = props;
    return (
        <button
            disabled={disabled}
            className={`button-simple-common ${classColor}`}
            style={{
                width: isFullWidth ? "100%" : 120
            }}
            onClick={onClick}>
            {
                icon && <span>{icon} </span>
            }
            <span>
                {title}
            </span>
        </button >
    )
}
