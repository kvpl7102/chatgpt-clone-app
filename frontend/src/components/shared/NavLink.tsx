import { Link, Links } from "react-router-dom"

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick? : () => Promise<void>;
}

const NavLink = (props: Props) => {
  return (
    <Link 
    className="nav-link"
    to={props.to}
    style={{
        background: props.bg,
        color: props.textColor
    }}>
    {props.text}
    </Link>
  )
}

export default NavLink