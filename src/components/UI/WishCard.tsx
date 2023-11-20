"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Ratings from "./Rating/Rating";
import { IWish } from "@/Types/wish";
import { useAppSelector } from "@/Hooks/useRedux";
import { useDeleteProductFromWishMutation } from "@/Redux/features/wishlist/wishApi";
import useModal from "@/Hooks/useModal";
import { get_error_messages } from "@/lib/Error_message";
import ICONS from "../shared/Icons/AllIcons";
import ToastContainer from "./Toast";

const WishCard = ({ product }: { product: IWish }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { openModal } = useModal();

  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  // add in wish mutation hook
  const [
    deleteProductFromWish,
    {
      data: removeFromWishData,
      isLoading: isRemoveWisLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useDeleteProductFromWishMutation();
  console.log(deleteProductFromWish, removeFromWishData);

  //wishListHandler
  const wishListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? deleteProductFromWish({
          id: product?.id,
          productId: product?.productId,
          userId: user?.id,
        })
      : openModal("login");
  };

  //error and success handlaing
  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(removeFromWishData?.message);
    }
  }, [error, isError, isSuccess, removeFromWishData?.message]);

  return (
    <>
      <div
        className="group h-fit w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <Image
            width={300}
            height={64}
            className={`h-52 w-full object-cover transition-transform duration-500 ${
              isHovered
                ? "transform scale-110 opacity-80 duration-700"
                : "transform-none opacity-100"
            }`}
            src={product?.product.productImage[isHovered ? 1 : 0]}
            alt="product image"
          />

          <div className="absolute -bottom-10 flex w-full transition-all duration-300 group-hover:bottom-0 ">
            <button className="relative inline-flex items-center justify-center w-full py-2 overflow-hidden font-medium text-white transition duration-300 ease-out button-group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-y-5 bg-primary-200 first-span ease">
                <Icon icon="mdi:cart-heart" width={20} />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform second-span ease bg-gray-800 title">
                Add To Cart
              </span>
              <span className="relative invisible ">Add To Cart</span>
            </button>
          </div>
          <div className="absolute right-2 top-2">
            <button
              onClick={wishListHandler}
              className="bg-gray-200 rounded-full"
            >
              {" "}
              {isRemoveWisLoading ? (
                ICONS.button_loading_icon
              ) : (
                <Icon
                  icon="material-symbols:delete"
                  className="cursor-pointer p-1 text-red-500 shadow-inner"
                  width={30}
                />
              )}
            </button>

            <Icon
              icon="iconamoon:restart-fill"
              className="my-2 translate-x-10 cursor-pointer rounded-full bg-[#ececec] p-1 duration-200 hover:text-primary-100 group-hover:translate-x-0"
              width={25}
            />
            <Link href={`/products/productdetails/${product?.id}`}>
              <Icon
                icon="basil:eye-outline"
                className="my-2 translate-x-10 cursor-pointer rounded-full bg-[#ececec] p-1 duration-300 hover:text-primary-100 group-hover:translate-x-0"
                width={25}
              />
            </Link>
          </div>
        </div>
        <h2 className="mt-3 text-xl capitalize title">
          {product?.product.productName}
        </h2>

        <div className="flex gap-5 items-center">
          <del className="text-sm text-red-700">$49</del>
          <Ratings
            starClassName="w-4 h-4 lg:w-5 lg:h-5"
            ratings={product?.product.productRating || 0}
          />
        </div>
        <p className="ml-1 mt-2 inline-block text-lg font-bold text-gray-700">
          ${product?.product.productPrice}
        </p>
      </div>

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className="absolute  top-0 z-50 left-0 right-0 mx-auto flex justify-center"
        />
      )}
    </>
  );
};

export default WishCard;
