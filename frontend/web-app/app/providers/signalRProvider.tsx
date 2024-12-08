'use client'

import { useAuctionStore } from '@/hooks/useAuctionStore'
import { useBidStore } from '@/hooks/useBidStore'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { useParams } from 'next/navigation'
import React, { ReactNode, useEffect, useRef } from 'react'

type Props = {
    children: ReactNode
}

export default function signalRProvider({children} : Props) {
    const connection = useRef<HubConnection | null>(null)
    const setCurrentPrice = useAuctionStore(state => state.SetCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const params = useParams<{id: string}>();

    useEffect(() => {
        if (!connection.current) {
            connection.current = new HubConnectionBuilder()
                                        .withUrl('http://localhost:6001/notifications')
                                        .withAutomaticReconnect()
                                        .build();
            
            connection.current.start()
                .then(() => 'Connected to notification hub')
                .catch(err => console.log(err))                      
        }
    }, [])
  return (
    children
  )
}
