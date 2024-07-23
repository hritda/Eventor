import { useSelector } from "react-redux";
import { RootState } from "../Store";

const useUI = () => {
    const uiState = useSelector((state: RootState) => state?.ui);
    return uiState;
};

export default useUI;