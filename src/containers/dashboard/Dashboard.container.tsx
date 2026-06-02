import { useAppDispatch } from "@/hooks/useAppDispatch";
import { requestProductItems } from "@/redux/actions/Product.actions";
import { useEffect } from "react";

function DashboardContainer() {
    const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestProductItems())
  }, [])
  
    return (
        <></>
    )
}

export default DashboardContainer;