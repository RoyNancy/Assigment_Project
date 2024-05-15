import React, { useEffect } from "react"

const UserDetail = React.memo(({ user }) => {
  useEffect(() => {
    console.log("UserDetail component re-rendered due to prop change.")
  }, [user])
  return (
    <div
      style={{
        background: "#9e9e9e33",
        margin: "10px 0px 0px 0px",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Title:</strong> {user.title}
      </p>
      <p>
        {" "}
        <strong>Body:</strong>{" "}
        <span style={{ fontSize: "14px", color: "#635151" }}>{user.body}</span>
      </p>
    </div>
  )
})
export default UserDetail
