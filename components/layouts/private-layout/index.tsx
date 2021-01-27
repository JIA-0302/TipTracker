import Navbar from "components/navbar"

const PrivateLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="d-flex">
      <Navbar />
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  )
}

export default PrivateLayout
