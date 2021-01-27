import Navbar from "components/navbar"
import styles from "./styles.module.css"

const PrivateLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="d-flex">
      <Navbar />
      <div className={styles.childrenLayout}>{children}</div>
    </div>
  )
}

export default PrivateLayout
