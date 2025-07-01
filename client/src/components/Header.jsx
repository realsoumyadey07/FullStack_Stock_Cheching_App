import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFunds, fetchFundsByName } from "@/redux/slices/fund.js";
import { Button } from "./ui/button.jsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.jsx";
import { userLogout } from "@/redux/slices/user.js";
import toast from "react-hot-toast";

function Header() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (name.trim()) {
      dispatch(fetchFundsByName(name.trim().toString()));
    } else {
      dispatch(fetchAllFunds());
    }
  }, [name]);

  const { isLoding, error } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await dispatch(userLogout()).unwrap();
      if (res) {
        navigate("/");
        toast.success("user successfully loggedout!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <nav className="flex justify-between items-center m-4">
      <div className="font-semibold text-xl ">
        <Link className="hidden sm:block" to="/home">
          Stock App
        </Link>
      </div>
      <ul className="flex items-center justify-between gap-5 font-semibold w-full sm:w-auto">
        {location.pathname === "/home" ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search here"
            />
            <Search className="hover:text-gray-700 cursor-pointer" />
          </div>
        ) : null}
        <Link to="/home">Home</Link>
        <Link to="/saved">Saved</Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Logout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>
                Do you realy want to logout??
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2"></div>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleLogout} variant="destructive">
                {isLoding ? "Loging out..." : "Logout"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ul>
    </nav>
  );
}

export default Header;
