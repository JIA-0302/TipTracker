import Navbar from "components/navbar"

const PrivateLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="d-flex">
      <Navbar />
      {children}
    </div>
  )
}

export default PrivateLayout
