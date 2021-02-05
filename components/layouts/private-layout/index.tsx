import Navbar from "components/navbar"
import styles from "./styles.module.css"
import classnames from "classnames"

const PrivateLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="d-flex">
      <Navbar />
      <div className={classnames("p-3", "pb-5", styles.childrenLayout)}>
        {children}
      </div>
    </div>
  )
}

export default PrivateLayout
