import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Gestion des Utilisateurs</h1>
      <button onClick={() => { setSelectedUser(null); setShowForm(true); }}>+ Ajouter</button>

      <UserList onEdit={(user) => { setSelectedUser(user); setShowForm(true); }} />

      {showForm && <UserForm selectedUser={selectedUser} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default App;
