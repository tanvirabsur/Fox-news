import UserCard from '@/Components/UserCard'
import React from 'react'


const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30
}

export default function page() {
  return (
    <div>
      <h1>Practice Page</h1>
      <UserCard name={user.name} email={user.email} age={user.age} />
    </div>
  )
}
