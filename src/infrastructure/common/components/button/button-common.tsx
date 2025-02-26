import "../../../../assets/styles/components/button.css"
type Props = {
    classColor: "green" | "red" | "white",
    onClick: () => void,
    icon?: any,
    title: string,
    isFullWidth?: boolean
}
export const ButtonCommon = (props: Props) => {
    const {
        classColor,
        onClick,
        icon,
        title,
        isFullWidth = false
    } = props;
    return (
        <button
            className={`btn-common ${classColor}`}
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
