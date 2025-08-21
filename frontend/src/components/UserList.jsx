import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../store/usersSlice";

export default function UserList({ onEdit }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => onEdit(user)}>Modifier</button>
            <button onClick={() => dispatch(removeUser(user.id))}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
