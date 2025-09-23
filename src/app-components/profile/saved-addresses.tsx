"use client";
import { useState } from "react";
import { Button } from "@/app-components/ui/button";
import LoadingDots from "@/app-components/ui/loadingDots";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, AddressFormValues } from "@/lib/schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app-components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { addAddress, useGetAddresses, setDefaultAddress, deleteAddress, editAddress } from "@/api-services/profile";
import toast from "react-hot-toast";
import { Address } from "@/interfaces-and-types/profile";
const SaveAddresses = () => {
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const { result: addresses} = useGetAddresses()
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState('')
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
    mode: "onChange",
    defaultValues: {
      is_default: false,
      state: ''
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    setStatus("loading");
    const x = {
        first_name: data.first_name,
        last_name: data.last_name,
        address_line: data.address_line,
        town_city: data.town_city,
        state: data.state,
        phone_number: data.phone_number,
    }
    try {
    let response;
     if (editing) {
        if (!id) return
        response = await editAddress(id, x);
     } else {
        response = await addAddress(x);
     }
      
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.msg);
        reset({
        first_name: "",
        last_name: "",
        phone_number: "",
        state: "",
        town_city: "",
        address_line: "",
        is_default: false
    })
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setStatus("idle");
      if (editing){
        setEditing(false)
      }
    }
  };

  const saveDefault = async(id: string) =>{
    try {
      const response = await setDefaultAddress(id);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.msg);
        reset()
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }
  const deleteUserAddress = async(id: string) =>{
    try {
      const response = await deleteAddress(id);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.msg);
        reset()
      } else {
        toast.error(response?.data.msg);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }

  const handleEdit = (address: Address) => {
    setEditing(true)
    setId(address.id)
    reset({
        first_name: address.first_name,
        last_name: address.last_name,
        phone_number: address.phone_number,
        state: address.state,
        town_city: address.town_city,
        address_line: address.address_line,
        is_default: address.is_default
    })
  }
  return (
    <div className="w-full ">
    {addresses && addresses.map((address) => (
       <div key={address.id} className="flex flex-col justify-between gap-4 mb-2 border p-4">
        <Label className="uppercase font-bold">{address.first_name} {address.last_name}</Label>
        <div className="flex flex-col">
          <span className="text-sm">{address.address_line}</span>
          <span className="text-sm">{address.town_city}, {address.state}</span>
          <span className="text-sm">{address.phone_number}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              onClick={() => handleEdit(address)}
              type="button"
              variant={"link"}
              className="text-sm text-gray-500 underline"
            >
              Edit
            </Button>
            <Button
                onClick={() => deleteUserAddress(address.id)}
              type="button"
              variant={"link"}
              className="text-sm text-gray-500 underline"
            >
              Remove
            </Button>
          </div>
        {!address.is_default &&   <Button
            type="button"
            variant={"link"}
            onClick={() => saveDefault(address.id)}
            className="text-sm text-gray-500 underline"
          >
            Set as default
          </Button>}
        </div>
      </div> 
    ))}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              placeholder="Enter your first name"
              className="h-11 rounded-none"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              placeholder="Enter your last name"
              className="h-11 rounded-none"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            placeholder="Enter your address"
            className="h-11 rounded-none"
            {...register("address_line")}
          />
          {errors.address_line && (
            <p className="text-xs text-red-500 mt-1">
              {errors.address_line.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              placeholder="Enter your city"
              className="h-11 rounded-none"
              {...register("town_city")}
            />
            {errors.town_city && (
              <p className="text-xs text-red-500 mt-1">
                {errors.town_city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder="Please select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            placeholder="Enter your number"
            className="h-11 rounded-none"
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="text-xs text-red-500 mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>
        <Controller
          name="is_default"
          control={control}
          render={({ field }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <p className="text-sm">Set as Default</p>
            </div>
          )}
        />
        <Button
          type="submit"
          className="w-full text-gray text-white h-11 rounded-none uppercase"
        >
          {status === "loading" ? <LoadingDots /> : "Save Address"}
        </Button>
      </form>
    </div>
  );
};
export default SaveAddresses;
