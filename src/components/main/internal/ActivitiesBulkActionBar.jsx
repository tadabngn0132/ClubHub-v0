import React from 'react'

const ActivitiesBulkActionBar = ({ eventCount }) => {
  return (
    <div>
      <button>Publish</button>
      <button>Cancel</button>
      <button>Delete</button>
      <button>Export CSV</button>
      <p>{ eventCount } events selected</p>
    </div>
  )
}

export default ActivitiesBulkActionBar