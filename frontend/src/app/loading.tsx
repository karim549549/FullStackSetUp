import React from 'react'

export default function loading() {
  return (
    <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
    </div>
  )
}
