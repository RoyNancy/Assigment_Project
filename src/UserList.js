import React, { useState, useEffect, useCallback, useMemo } from "react"
import UserDetail from "./UserDetail"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        )
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  // Memoized function to compute additional details for a user
  const computeUserDetails = useMemo(() => {
    return (user) => {
      console.time(`test ${user.id}`)
      console.log(`Computing details for user with ID ${user.id}...`)
      const additionalDetails = {
        ...user,
      }
      console.timeEnd(`test ${user.id}`)
      return additionalDetails
    }
  }, [])

  // Callback function to handle user click
  const handleuserClick = useCallback(async (userId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${userId}`
      )
      const userData = await response.json()
      setSelectedUser(userData)
    } catch (error) {
      console.error("Error fetching user details:", error)
    }
  }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Users</h1>
      <div>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleuserClick(user.id)}
            style={{
              cursor: "pointer",
              border: "1px solid #0000002b",
              padding: "10px",
              margin: "20px",
            }}
          >
            <strong>{user.title}</strong> - ID: {user.id}
            {selectedUser && selectedUser.id === user.id && (
              <UserDetail user={computeUserDetails(user)} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default UserList
