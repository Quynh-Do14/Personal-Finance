import logo from "../../../../assets/images/logo-mini.png";
import '../../../../assets/styles/components/animation.css';
type Props = {
    title: string,
    color: "black" | "white"
}
const TitleComponent = (props: Props) => {
    const { title, color } = props;
    return (
        <div className="flex justify-center">
            <div className="title-component">
                <div className={`title ${color}`}>{title}</div>
                <div>
                    <img className="image" src={logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default TitleComponent