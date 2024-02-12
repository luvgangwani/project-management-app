import React from "react"
import { Role } from "../enums"
import { getAuthUser } from "../util"

function withAuthorize(Component: React.FC) {
  return async function() {
    const authUser = await getAuthUser()
    if (authUser?.role !== Role.ADMIN && authUser?.role !== Role.MANAGER) {
      return <div className="message">You're not authorised to view this page.</div>
    } else {
      return <Component />
    }
  }
}

export default withAuthorize