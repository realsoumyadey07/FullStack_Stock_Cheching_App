import { useRef, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "./ui/table";
import { Bookmark } from "lucide-react";
import { useDispatch } from "react-redux";
import { saveFund } from "@/redux/slices/saved";
import toast from "react-hot-toast";

export default function VirtualisedList({
  items,
  itemHeight = 50,
  windowHeight = 400,
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const listRef = useRef(null);
  const dispatch = useDispatch();

  const visibleItemCount = Math.ceil(windowHeight / itemHeight);
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);

  const handleSaveFund = (fundId)=> {
    dispatch(saveFund(fundId)).then(()=> toast.success("Fund saved successfully!")).catch((error) => toast.error("error saving fund: " + error.message || "An error occurred!"));
  }

  const handleScroll = () => {
    if (listRef.current) {
      setScrollTop(listRef.current.scrollTop);
    }
  };

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, i) => {
      const actualIndex = startIndex + i;
      const itemStyle = {
        position: "absolute",
        top: `${actualIndex * itemHeight}px`,
        height: `${itemHeight}px`,
        left: 0,
        right: 0,
      };
      return (
        <TableRow key={item.schemeCode} style={itemStyle} className="flex justify-between">
            <TableCell className="font-medium">{item.schemeCode}</TableCell>
            <TableCell
              className="truncate lg:max-w-[400px]"
              title={item.schemeName}
            >
              {item.schemeName}
            </TableCell>
          <TableCell className="text-right">
            <Bookmark onClick={()=> handleSaveFund(item.schemeCode)} size={20} />
          </TableCell>
        </TableRow>
      );
    });
  }, [startIndex, endIndex, items, itemHeight]);

  if (!items.length) {
    return <div>No items to display</div>;
  }

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      style={{
        height: `${windowHeight}px`,
        overflowY: "auto",
        position: "relative",
        border: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        cursor: "default",
      }}
    >
      <Table style={{ position: "relative" }}>
        <TableCaption>List of Mutual Funds</TableCaption>
        <TableHeader>
          <TableRow className="flex justify-between items-center">
            <TableHead className="w-[100px] px-[20px]">IDs</TableHead>
            <TableHead>Mutual Funds</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody style={{ height: `${totalHeight}px`, position: "relative" }}>
          {visibleItems}
        </TableBody>
      </Table>
    </div>
  );
}
