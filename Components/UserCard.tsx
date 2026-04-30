import React from 'react';


interface UserCardProps {
    name : string;
    email : string;
    age : number;
}



const UserCard = ({ name, email, age }: UserCardProps) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
        </div>
    );
};

export default UserCard;