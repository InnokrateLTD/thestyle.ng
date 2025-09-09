"use client";
import { useState } from "react";
import { Input } from "@/app-components/ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/app-components/ui/radio-group";
import { Button } from "@/app-components/ui/button";
import { CreateReviewSchema, ReviewFormData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { addProductReview } from "@/api-services/product";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/app-stores/modal";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "next/navigation";

const ReviewProduct = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const params = useParams()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(CreateReviewSchema),
    mode: "onChange",
    defaultValues:{
        rating: 0
    }
  });
  const onSubmit = async (data: ReviewFormData) => {
    setStatus("loading");
    console.log(data)
    const x = {
      rating: data.rating ?? "",
      recommend: data.recommend,
      review_description: data.review_description,
      review_text: data.review_text,
      nickname: data.nickname,
    };
    try {
      if (!params?.id?.toString()) return;
      const response = await addProductReview(params?.id?.toString(), x);
      if (response.status === 200 || response.status === 201) {
        toast.success("Thank you for adding a review!");
        closeModal();
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Review Failed: ${error}`);
    } finally {
      setStatus("idle");
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold mb-1 uppercase">
            Write your review
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs text-grey-text font-semibold block  uppercase">
              Your Information
            </label>
            <span className="text-xs text-gray-500 mb-1">
              Be mindful of your own privacy. Don&apos;t use your full name
            </span>
            <Input
              placeholder="Enter a nickname"
              type="text"
              {...register("nickname")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block  uppercase">
              Overall ratings
            </label>
              <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Rating
            style={{ maxWidth: 150 }}
            value={field.value}
            onChange={field.onChange}
            transition="colors"
          />
        )}
      />
      {errors.rating && (
        <p className="text-red-500 text-sm">{errors.rating.message}</p>
      )}
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Would you recommend this product?
            </label>
            <Controller
                              name="recommend"
                              control={control}
                              render={({ field }) => (
            <RadioGroup onValueChange={field.onChange}
                      value={field.value} className="grid grid-cols-3 gap-3">
              {["Yes", "No"].map((recommend) => (
                <div
                  key={recommend}
                  className="flex items-center space-x-2 rounded-md border border-gray-100 p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <RadioGroupItem value={recommend} id={recommend} />
                  <label
                    htmlFor={recommend}
                    className="cursor-pointer text-gray-900 font-medium"
                  >
                    {recommend}
                  </label>
                </div>
              ))}
            </RadioGroup>
            )}
        />
        {errors.recommend && (
        <p className="text-red-500 text-sm">{errors.recommend.message}</p>
      )}
          </div>
          <div>
            <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
              Share your experience
            </label>
            <Input
              placeholder="Review in short"
              type="text"
              {...register("review_description")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-11 text-sm mb-2"
            />
            <Textarea
              placeholder="Enter your review"
              maxLength={4}
              {...register("review_text")}
              className="border border-grey-lighter rounded-none focus:outline-none w-100 h-32 text-sm"
            />
          </div>
          <p className="text-[11px] text-gray-500 ">
            By submitting a review you agree to our Terms and Conditions
          </p>
          <Button className="w-100 h-11 bg-black text-white rounded-none font-medium uppercase">
            {status === "loading" ? <LoadingDots /> : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewProduct;
