import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div >
    <Link href="/sign-up" passHref>
        <Button>Sign-up</Button>
      </Link>
    </div>
  )
}

export default page 
