import React, { useEffect, useState } from "react";
import useModal from "@/Hooks/useModal";
import { IProduct } from "@/Types/products";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ToastContainer from "../UI/Toast";
import ICONS from "../shared/Icons/AllIcons";
import { get_error_messages } from "@/lib/Error_message";
import TextArea from "../UI/Form-items/TextArea";
import { useAppSelector } from "@/Hooks/useRedux";
import RatingPicker from "../UI/Rating/RatingPicker";
import { useAddProductReviewMutation } from "@/Redux/features/review/reviewApi";
import { Button } from "../UI/Button";
import Paragraph from "../UI/Paragraph/Paragraph";

const AddReviewForm = ({
  product_details,
}: {
  product_details: IProduct | undefined;
}) => {
  const { onClose } = useModal();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAppSelector((state) => state.auth);

  const [review, { data: reviewData, isLoading, isSuccess, isError, error }] =
    useAddProductReviewMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");
  const [review_form, setReviewForm] = useState({
    rating: 1,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await review({
        reviewerId: user?.id,
        productId: product_details?.id,
        rating: review_form.rating,
        reviewText: data.reviewText,
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Error and success handling
  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(reviewData?.message);
      onClose();
    }
  }, [reviewData?.message, error, isError, isSuccess, onClose]);

  return (
    <>
      <div className="w-4/5 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <RatingPicker
              current_value={review_form.rating as number}
              clickHandler={(value) =>
                setReviewForm((prev) => ({
                  ...prev,
                  ["rating"]: Number(value),
                }))
              }
            />
          </div>
          <Controller
            name="reviewText"
            control={control}
            defaultValue=""
            rules={{ required: "Please write something" }}
            render={({ field }) => (
              <TextArea
                label="Write your review!"
                onChange={field.onChange}
                currentValue={field.value}
                placeHolder=""
                id="textId"
                htmlFor="textId"
              />
            )}
          />
          {errors.reviewText && (
            <Paragraph className="text-red-500 text-sm">
              {(errors.reviewText.message as string) ||
                "Please write something"}
            </Paragraph>
          )}

          <Button
            type="submit"
            title="Submit"
            className=" bg-primary-100 w-full 
                          text-base font-semibold font-secondary text-white rounded my-10"
            icon={isLoading ? ICONS.button_loading_icon : undefined}
            isDisabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </div>
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className="bottom-3"
        />
      )}
    </>
  );
};

export default AddReviewForm;
