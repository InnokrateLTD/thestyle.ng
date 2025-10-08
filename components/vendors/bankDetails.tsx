"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { bankDetailsSchema, bankDetailsFormValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import LoadingDots from "../ui/loadingDots";
import { useModalStore } from "@/stores/modal";
import {
  useGetBankingDetails,
  useGetBankLists,
  editVendorBankDetails,
  addVendorBankDetails,
} from "@/api-services/store";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const BankDetails = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { result: banks } = useGetBankLists();
  const { result: details } = useGetBankingDetails();
  const [edit, setIsEdit] = useState(false)
  console.log(details);
 
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<bankDetailsFormValues>({
    resolver: zodResolver(bankDetailsSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: bankDetailsFormValues) => {
    setStatus("loading");
    const x = {
      account_number: data.account_number,
      account_name: data.account_name,
      bank_name: data.bank.name,
      bank_code: data.bank.code,
    };
    try {
      const response = await (edit ? editVendorBankDetails(x) : addVendorBankDetails(x));
      if (response.status === 200 || response.status === 201) {
        toast.success("Bank detail setup Successful");
        closeModal();
        if (edit) setIsEdit(false)
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Bank detail error: ${error}`);
    } finally {
      setStatus("idle");
    }
  };

  const handleEditSubmit = () => {
    if (details){
    reset({
      account_number: details.account_number,
      account_name: details.account_name,
      bank: {name: details.bank_name, code: details.bank_code},
    })
    setIsEdit(true)
  }
}
  return (
    <div className="flex justify-between w-full">
      <div className="w-1/2 space-y-2">
        <h1 className="uppercase font-bold leading-6">Bank details</h1>
        <Button onClick={handleEditSubmit} className="w-auto h-11 bg-black text-white rounded-none font-medium uppercase">
          Edit Bank Details
        </Button>
      </div>

      <div className="w-1/2 flex justify-end">
        <div className="w-full">
          {(!details || edit) ? (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Bank Name
                </label>
                <Controller
                  name="bank"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(val) => field.onChange(JSON.parse(val))}
                      value={field.value ? JSON.stringify(field.value) : ""}
                    >
                      <SelectTrigger className="w-full rounded-none">
                        <SelectValue placeholder="Please select a bank" >{field.value?.name}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {banks &&
                          banks.map((bank) => (
                            <SelectItem key={bank.id} value={JSON.stringify({ code: bank.code, name: bank.name })}>
                              {bank.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.bank && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.bank.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Account Number
                </label>
                <Input
                  type="text"
                  {...register("account_number")}
                  className="border border-grey-lighter rounded-none focus:outline-none  h-11 text-sm"
                />
                {errors.account_number && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.account_number.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs text-grey-text font-semibold block mb-1 uppercase">
                  Account Name
                </label>
                <Input
                  type="text"
                  {...register("account_name")}
                  className="border border-grey-lighter rounded-none focus:outline-none  h-11 text-sm"
                />
                {errors.account_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.account_name.message}
                  </p>
                )}
              </div>
            </div>

            <Button className="w-full h-11 bg-black text-white rounded-none font-medium uppercase">
              {status === "loading" ? <LoadingDots /> : edit ? "Edit Details": "Save Details"}
            </Button>
          </form> ) : (
          <div className="border p-3">
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-gray-500">BANK NAME</p>
                <p className="col-span-2">{details?.bank_name}</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-500">ACCOUNT NUMBER</p>
                <p className="col-span-2">{details?.account_number}</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-500">Account Name</p>
                <p className="col-span-2">{details?.account_name}</p>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
