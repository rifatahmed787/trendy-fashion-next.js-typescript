"use client";
import { useUserRegisterMutation } from "@/Redux/features/auth/authApi";
import { DarkModeContext } from "../../DarkModeContext/DarkModeContext";
import { useContext, useEffect, useState } from "react";
import TextInput from "../../UI/Form-items/TextInput";
import Button from "../../UI/Button";
import Link from "next/link";
import ToastContainer from "../../UI/Toast";
import ICONS from "../../shared/Icons/AllIcons";
import FileInput from "../../UI/Form-items/FileInput";
import { get_error_messages } from "@/lib/Error_message";

const SignUpForm = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState(false);
  // signup mutation hook
  const [register, { isError, error, isSuccess }] = useUserRegisterMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState(" ");

  // file state
  const [file, setFile] = useState<File | undefined>();

  // form state
  const [sign_up_form, setSignUpForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
  });

  //formSubmitHandler
  const formSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const uploadResponse = await uploader({ data: formData });
        if (uploadResponse) {
          if ("data" in uploadResponse) {
            imageUrl = uploadResponse.data.images[0];
          } else {
            console.error("Upload error:", uploadResponse.error);
          }
        }
        console.log(imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    const { first_name, last_name, ...othersData } = sign_up_form;
    register({
      data: {
        ...othersData,
        name: {
          firstName: first_name,
          lastName: last_name,
        },
        imageUrl,
      },
    });
    setIsLoading(false);
  };

  // Input handler
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setSignUpForm((prev) => ({ ...prev, [key]: e.target.value }));
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
      setAlertMessages("Signed up successfully");
    }
  }, [error, isError, isSuccess]);

  return (
    <div
      className={`min-h-screen w-full  flex items-center justify-center ${
        darkMode ? "bg-black" : "bg-box-pattern "
      }`}
    >
      <form
        onSubmit={formSubmitHandler}
        className={`relative flex  max-w-lg rounded-xl w-full  flex-col gap-4 backdrop-blur-3xl bg-white/80 mx-5 px-5 md:px-[74px] py-7"
        encType="multipart/form-data ${darkMode ? "bg-gradient-backdrop" : ""}`}
      >
        {/* title */}
        <div className="flex items-center justify-between gap-3 flex-wrap ">
          <h1 className=" text-4xl  font-anton text-ceter text-primary pt-1">
            Signup
          </h1>

          <Link href={"/"} className="flex items-center text-primary gap-2 ">
            {ICONS.home} Back to home
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="First Name"
              type="text"
              onChange={(e) => {
                inputChangeHandler(e, "first_name");
              }}
              currentValue={sign_up_form?.first_name}
              placeHolder=""
              id="firstName"
              htmlFor="firstName"
            />
            <TextInput
              type="text"
              placeHolder=""
              currentValue={sign_up_form?.last_name}
              onChange={(e) => {
                inputChangeHandler(e, "last_name");
              }}
              required={true}
              id="lastName"
              htmlFor="lastName"
              label="Last Name"
            />
          </div>

          {/* image url */}
          <FileInput
            label=""
            onChange={(selectedFile: File | undefined) => {
              console.log("Selected file:", selectedFile);
              setFile(selectedFile);
            }}
            currentFile={file}
            placeholder="Choose an image"
            required
            id="image"
            htmlFor="image"
            currentValue={""}
          />

          {/* Email */}
          <TextInput
            type="email"
            placeHolder=""
            currentValue={sign_up_form?.email}
            onChange={(e) => {
              inputChangeHandler(e, "email");
            }}
            required={true}
            id="email"
            htmlFor="email"
            label="Email"
          />
          {/* Address */}
          <TextInput
            type="text"
            placeHolder=""
            currentValue={sign_up_form?.address}
            onChange={(e) => {
              inputChangeHandler(e, "address");
            }}
            required={true}
            id="address"
            htmlFor="address"
            label="Address"
          />
          {/* Password */}
          <TextInput
            type="password"
            placeHolder=""
            currentValue={sign_up_form?.password}
            onChange={(e) => {
              inputChangeHandler(e, "password");
            }}
            required={true}
            id="password"
            htmlFor="password"
            label="Password"
          />
        </div>

        <Button
          type="submit"
          title="Submit"
          className="mt-6 bg-primary w-full  text-base font-medium rounded"
          icon={isLoading ? ICONS.button_loading_icon : undefined}
          isDisabled={isLoading}
        />

        <div>
          <p
            className={`font-inter text-base text-[#000] text-center ${
              darkMode ? "text-gray-300 pb-3" : ""
            }`}
          >
            Already have account?
            <Link href={"/auth/signin"}>
              <span className="ml-2  underline">Login</span>
            </Link>
          </p>
        </div>

        {/* Toast */}
        {isAlertOpen && (
          <ToastContainer
            type={AlertType}
            messages={AlertMessages}
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            className="absolute top-20 z-50 left-0 right-0 mx-auto flex justify-center"
          />
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
