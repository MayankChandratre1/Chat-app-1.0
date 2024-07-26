"use client"
import InputBox from '@/components/InputBox'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = ({params}:{params: {slug: string | string[] | undefined}}) => {
  return (
    <div>
        <InputBox roomId={params.slug ? params.slug[0]:""} name={params.slug ? params.slug[1]:"Anonymus"} />
    </div>
  )
}

export default page