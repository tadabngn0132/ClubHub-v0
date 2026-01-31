import React from 'react'

const BulkActionBar = () => {
  // TODO: Implement bulk action bar functionality
  // Including exporting selected data, change status, send emails, delete selected items, deselect all

  return (
    <div className="p-3 bg-gray-100 flex space-x-4">
      <button className='p-2.5 bg-[var(--pink-color)]'>Export Selected</button>
      <button className='p-2.5 bg-[var(--pink-color)]'>Change Status</button>
      <button className='p-2.5 bg-[var(--pink-color)]'>Send Emails</button>
      <button className='p-2.5 bg-[var(--pink-color)]'>Delete Selected</button>
      <button className='p-2.5 bg-[var(--pink-color)]'>Deselect All</button>
    </div>
  )
}

export default BulkActionBar