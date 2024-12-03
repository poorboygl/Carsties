'use client'

import { Button, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/input';

export default function AuctionForm() {
  const {control, handleSubmit, setFocus, 
        formState: {isSubmitting, isValid, isDirty, errors}} = useForm();

  useEffect(() => {
      setFocus('make');
  }, [setFocus])

  function onSubmit(data: FieldValues){
    console.log(data)
  }
  return (
    <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
      <Input label='Make' name='make' control={control} rules={{required:'Make is required'}}/>
      <Input label='Model' name='model' control={control} rules={{required:'Model is required'}}/>
      <Input label='Color' name='color' control={control} rules={{required:'Color is required'}}/>

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Year' name='year' type='number' control={control} rules={{required:'Year is required'}}/>
        <Input label='Mileage' name='mileage' type='number' control={control} rules={{required:'Model is required'}}/>
      </div>

      <Input label='Image Url' name='imageUrl' control={control} rules={{required:'Image URL is required'}}/>

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Reserve Price (Enter 0 if no reserve)' name='reservePrice' type='number' control={control} rules={{required:'Reserve Price is required'}}/>
        <Input label='Auction end date/time' name='auctionEnd' type='date' control={control} rules={{required:'Auction end date is required'}}/>
      </div>

      <div className='flex justify-between'>
        <Button outline color='gray'> Cancel</Button>
        <Button isProcessing={isSubmitting}
                type='submit'
                outline color='success'> 
                Submit
        </Button>
      </div>
    </form>
  )
}
