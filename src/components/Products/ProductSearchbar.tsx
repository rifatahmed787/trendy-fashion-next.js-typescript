"use client";
import { useState, useEffect } from "react";
import TextInput from "../UI/Form-items/TextInput";
import ICONS from "../shared/Icons/AllIcons";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "@/Redux/features/products/searchSlice";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const ProductSearchbar = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearch);
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();
  const { theme} = useTheme();
  useEffect(() => {
    setSearchKey(searchValue);
  }, [searchValue]);

  const handleFilterValue = () => {
    dispatch(setSearch(searchKey));
    router.push(`/products?search=${encodeURIComponent(searchKey)}`);
  };

  return (
    <div className="relative flex items-center ">
      <TextInput
        type="text"
        placeHolder="Search products"
        currentValue={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        required={true}
        className={`pr-10 md:pr-20 h-10 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      />
      <button
        className={`h-10 px-2 py-1  rounded-r-md  hover:text-white hover:bg-primary-100 duration-300 -ml-10 z-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        onClick={handleFilterValue}
      >
        {ICONS.Search_Icon}
      </button>
    </div>
  );
};

export default ProductSearchbar;
