import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../store/usersSlice";

const UserForm = ({ selectedUser, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(editUser({ id: selectedUser.id, userData: { name, email } }));
    } else {
      dispatch(addUser({ name, email }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedUser ? "Modifier" : "Ajouter"} un utilisateur</h3>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">✅ Sauvegarder</button>
    </form>
  );
};

export default UserForm;
