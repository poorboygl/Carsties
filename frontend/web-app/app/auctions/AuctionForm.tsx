"use client";

import { Button, TextInput } from "flowbite-react";
import React, { cache, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/input";
import DateInput from "../components/DateInput";
import { createAuction, updateAuction } from "../actions/AuctionActions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = '';
      let res;
      if (pathname === '/auctions/create') {
         res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }
      if (res.error) {
        throw res.error();
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }
  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          type="number"
          control={control}
          rules={{ required: "Year is required" }}
        />
        <Input
          label="Mileage"
          name="mileage"
          type="number"
          control={control}
          rules={{ required: "Model is required" }}
        />
      </div>

      {pathname === `/auctions/create` && (
        <>
          <Input
            label="Image Url"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (Enter 0 if no reserve)"
              name="reservePrice"
              type="number"
              control={control}
              rules={{ required: "Reserve Price is required" }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              dateFormat="dd MMMM yyyy h:mm a"
              showTimeSelect
              control={control}
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color="gray">
          {" "}
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
          outline
          color="success"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
