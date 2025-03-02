"use client";
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
import { IoEyeOutline } from "react-icons/io5";
import { GoGitCompare } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import Modal from "../Modal/Modal";
import ModalBody from "../Modal/ModalBody/ModalBody";
import ModalHeader from "../Modal/ModalHeader/ModalHeader";
import Paragraph from "./Paragraph/Paragraph";
import { Button } from "./Button";

const WishCard = ({ product }: { product: IWish }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [compareHover, setCompareHover] = useState(false);
  const [detailsHover, setDetailsHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const { openModal, isOpen, onClose } = useModal();

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

  //wishListHandler
  const wishListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? deleteProductFromWish({
          id: product?.id,
          productId: product?.id,
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
      onClose()
    }
  }, [error, isError, isSuccess, onClose, removeFromWishData?.message]);

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
            src={product?.product.productImages[isHovered ? 1 : 0]}
            alt="product image"
          />

          <div className="absolute -bottom-10 flex w-full transition-all duration-300 group-hover:bottom-0 ">
            <button className="relative inline-flex items-center justify-center w-full py-2 overflow-hidden font-medium text-white transition duration-300 ease-out button-group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-y-5 bg-primary-200 first-span ease">
                <MdOutlineShoppingCart className="text-2xl" />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform second-span ease bg-gray-800 title">
                Add To Cart
              </span>
              <span className="relative invisible ">Add To Cart</span>
            </button>
          </div>
          <div className="absolute right-2 top-2">
            <div className="flex items-center gap-1 relative">
              {deleteHover && (
                <p className=" absolute top-0 bottom-0 flex items-center right-9">
                  <span className="text-sm  text-black  bg-gray-300 px-3 py-0.5">
                    Delete
                  </span>
                  <span className="w-4 h-4 bg-gray-300 rotate-45 -ml-2"></span>
                </p>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openModal("wishDelete");
                }}
                className="bg-gray-200 rounded-full"
                onMouseEnter={() => setDeleteHover(true)}
                onMouseLeave={() => setDeleteHover(false)}
              >
                <RiDeleteBin6Line className="cursor-pointer text-3xl p-1 text-red-500 shadow-inner" />
              </button>
              <Modal isOpen={isOpen("wishDelete")} onClose={onClose}>
                <ModalBody className="w-11/12 md:w-3/4 lg:w-1/4">
                  <ModalHeader title="Delete Wish" onClose={onClose} />
                  <Paragraph className="text-center">
                    Are you sure you want to delete this <b>Card</b>?
                  </Paragraph>
                  <div className="pt-5 flex justify-center items-center gap-3">
                    <Button
                      className="border border-primary-100"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={wishListHandler}
                      className="bg-red-500 text-white"
                      icon={
                        isRemoveWisLoading
                          ? ICONS.button_loading_icon
                          : undefined
                      }
                      isDisabled={isRemoveWisLoading}
                    >
                      Delete
                    </Button>
                  </div>
                </ModalBody>
              </Modal>
            </div>

            <div className="flex items-center gap-1 relative">
              {compareHover && (
                <p className=" absolute top-0 bottom-0 flex items-center right-9">
                  <span className="text-sm  text-black  bg-gray-300 px-3 py-0.5">
                    Compare
                  </span>
                  <span className="w-4 h-4 bg-gray-300 rotate-45 -ml-2"></span>
                </p>
              )}
              <Link href={"/"}>
                <GoGitCompare
                  onMouseEnter={() => setCompareHover(true)}
                  onMouseLeave={() => setCompareHover(false)}
                  className="my-2 text-3xl translate-x-10 cursor-pointer rounded-full bg-[#ececec] p-1 duration-300 hover:text-primary-100 group-hover:translate-x-0"
                />
              </Link>
            </div>
            <div className="flex items-center gap-1 relative">
              {detailsHover && (
                <p className=" absolute top-0 bottom-0 flex items-center right-9">
                  <span className="text-sm  text-black  bg-gray-300 px-3 py-0.5">
                    Details
                  </span>
                  <span className="w-4 h-4 bg-gray-300 rotate-45 -ml-2"></span>
                </p>
              )}
              <Link href={"/"}>
                <Link href={`/products/productdetails/${product?.id}`}>
                  <IoEyeOutline
                    onMouseEnter={() => setDetailsHover(true)}
                    onMouseLeave={() => setDetailsHover(false)}
                    className="my-2 text-3xl translate-x-10 cursor-pointer rounded-full bg-[#ececec] p-1 duration-300 hover:text-primary-100 group-hover:translate-x-0"
                  />
                </Link>
              </Link>
            </div>
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
          className=" "
        />
      )}
    </>
  );
};

export default WishCard;
