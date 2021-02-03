import styles from "./styles.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import classNames from "classnames"

type MobileNavbarIconProps = {
  icon: ReactElement
  link: string
}

const MobileNavbarIcon: React.FunctionComponent<MobileNavbarIconProps> = ({
  icon,
  link,
}) => {
  const router = useRouter()
  const iconClass = classNames(styles.iconContainer, {
    [styles.active]: router.pathname === link,
  })

  return (
    <Link href={link}>
      <div className={iconClass}>{icon}</div>
    </Link>
  )
}

export default MobileNavbarIcon
