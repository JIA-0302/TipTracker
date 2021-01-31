import ShiftEditModal from "../components/shift-edit-modal";
import ShiftAddModal from "../components/shift-add-modal";
import ShiftMainModal from "../components/shift-main-add-modal";

const shiftModal: React.FunctionComponent = () => {
    return (
        <div>
        <ShiftEditModal />
        <ShiftMainModal />
        </div>
    );
}

export default shiftModal
