'use client'

import React, { useState } from 'react'
import { updateAuctionTest } from '../actions/AuctionActions';
import { Button } from 'flowbite-react';
import { json } from 'stream/consumers';

export default function AuthTest() {
    const [loading, setloading] = useState(false);
    const [result, setResult] =useState<any>();

    function doUpdate() {
        setResult(undefined);
        setloading(true);
        updateAuctionTest()
            .then(res => setResult(res))
            .catch(err => setResult(err))
            .finally(() => setloading(false))
    }
  return (
    <div className='flex items-center gap-4'>
        <Button outline isProcessing={loading} onClick={doUpdate}>
            Test auth
        </Button>
        <div>
            {JSON.stringify(result, null, 2)}
        </div>
    </div>
  )
}
