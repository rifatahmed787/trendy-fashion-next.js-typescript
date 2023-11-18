"use client";
import { useGetWishListQuery } from "@/Redux/features/wishlist/wishApi";
import { IWish } from "@/Types/wish";
import ProductSkeleton from "@/components/Products/ProductSkeleton";
import WishCard from "@/components/UI/WishCard";
import React from "react";

const WishList = () => {
  // Get products query
  const { data: products, isLoading, isError, error } = useGetWishListQuery({});
  console.log(products);
  const products_list_data = products?.data;
  return (
    <div className={`bg-[#FAF9F5] min-h-[100vh] px-4  py-10`}>
      <div className=" max-w-[1170px] mx-auto">
        {products_list_data?.length > 0 ? (
          ""
        ) : (
          <>
            <h1 className={`text-xl text-center font-bold`}>
              WishList is <span className="text-primary-100">Empty!</span>
            </h1>
          </>
        )}
        {/* Product list  */}
        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <div className=" mt-10 w-full   grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 ">
            {!isError &&
              !error &&
              products_list_data?.length > 0 &&
              products_list_data.map((product: IWish) => {
                return <WishCard key={product.id} product={product} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
