import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import mfApi from "@/lib/axios/mfApi";
import { fetchAllSavedFunds, unsaveFund } from "@/redux/slices/saved";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function SavedScreen() {
  const [funds, setFunds] = useState();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.saved);

  const fetchSavedFunds = async () => {
    try {
      const res = await dispatch(fetchAllSavedFunds()).unwrap();
      const fundDetails = await Promise.all(
        res?.map(async (fund) => {
          try {
            const response = await mfApi.get(`/${fund.fundId}/latest`);
            return response.data.meta;
          } catch (error) {
            console.error(
              `Error fetching details for fundId ${fund.fundId}:`,
              error
            );
            return null;
          }
        })
      );

      setFunds(fundDetails.filter((fund) => fund !== null));
    } catch (error) {
      console.error("Error fetching saved funds:", error);
    }
  };

  const handleUnsaveFund = async (fundId) => {
    try {
      await dispatch(unsaveFund(fundId)).unwrap();
      setFunds((prevFunds) =>
        prevFunds.filter((fund) => fund.scheme_code !== fundId)
      );
      toast.success("Fund unsaved successfully!");
      await fetchSavedFunds();
    } catch (error) {
      console.error("Error unsaving fund:", error);
      toast.error("An error occurred while unsaving the fund.");
    }
  };
  useEffect(() => {
    fetchSavedFunds();
  }, []);

  if (isLoading || !funds) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">
        {typeof error === "string"
          ? error
          : "An error occurred. Please try again."}
      </p>
    );
  }

  return (
    <>
      {funds?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="flex justify-between items-center">
              <TableHead className="w-[100px]">FundId</TableHead>
              <TableHead>Fund Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funds.map((fund) => (
              <TableRow
                key={fund.scheme_code}
                className="flex justify-between items-center"
              >
                <TableCell>{fund.scheme_code}</TableCell>
                <TableCell
                  className="truncate lg:max-w-[400px]" // Truncate text and set max width
                  title={fund.fund_house} // Show full text on hover
                >
                  {fund.fund_house}
                </TableCell>
                <TableCell>
                  <Bookmark
                    onClick={() => handleUnsaveFund(fund.scheme_code)}
                    size={20}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-700">No saved funds found!</p>
      )}
    </>
  );
}
