import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import VirtualisedList from "@/components/VirtualisedList.jsx";
import { fetchAllFunds } from "@/redux/slices/fund.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { funds, isLoading, error } = useSelector((state) => state.fund);

  useEffect(() => {
    dispatch(fetchAllFunds());
  }, [dispatch]);

  if (isLoading || !funds) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      {funds.length > 0 ? (
        <VirtualisedList items={funds} itemHeight={50} windowHeight={800} />
      ) : (
        <p className="text-center text-gray-700">No item is listed!</p>
      )}
    </>
  );
}
