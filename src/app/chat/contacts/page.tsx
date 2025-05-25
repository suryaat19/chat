"use client";

import { useEffect, useState } from "react";

interface Contact {
  user_id: string;
  name: string;
  nickname: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: "", username: "", nickname: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/getContacts");
        if (res.status === 403) {
          setError("You are not authorized to view contacts.");
          setContacts([]);
        } else {
          const data = await res.json();
          setContacts(data);
        }
      } catch (e) {
        setError("Failed to fetch contacts.");
      }
      setLoading(false);
    }
    fetchContacts();
  }, []);

  const openAddModal = () => {
    setEditContact(null);
    setForm({ name: "", username: "", nickname: "" });
    setShowModal(true);
  };

  const openEditModal = (contact: Contact) => {
    setEditContact(contact);
    setForm({ name: contact.name, username: contact.user_id, nickname: contact.nickname });
    setShowModal(true);
  };

  const handleDelete = async (contact: Contact) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/deleteContact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: contact.user_id })
      });
      if (!res.ok) {
        setError("Failed to delete contact.");
      } else {
        setContacts(contacts.filter(c => c.user_id !== contact.user_id));
      }
    } catch (e) {
      setError("Failed to delete contact.");
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (editContact) {
        // Only allow editing nickname
        const res = await fetch(`/api/editContact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: editContact.user_id, nickname: form.nickname })
        });
        if (!res.ok) {
          setError("Failed to update contact.");
        } else {
          setContacts(contacts.map(c => c.user_id === editContact.user_id ? { ...c, nickname: form.nickname } : c));
          setShowModal(false);
          setEditContact(null);
        }
      } else {
        // Add contact: POST to /api/addContact
        const res = await fetch("/api/addContact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: form.username, nickname: form.nickname })
        });
        if (!res.ok) {
          setError("Failed to add contact.");
        } else {
          const newContact = await res.json();
          setContacts([...contacts, newContact]);
          setShowModal(false);
        }
      }
    } catch (e) {
      setError("Failed to update contact.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full flex-grow bg-base-200 py-8">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-2xl">Contacts</h2>
            <button className="btn btn-primary" onClick={openAddModal}>Add Contact</button>
          </div>
          {error && <div className="text-error mb-2">{error}</div>}
          {loading ? (
            <div className="flex justify-center items-center h-32"><span className="loading loading-dots loading-lg"></span></div>
          ) : (
            <ul className="rounded-box divide-y divide-base-200">
              {contacts.map(contact => (
                <li key={contact.user_id} className="flex justify-between items-center py-3 px-2 hover:bg-base-300 transition-colors">
                  <div>
                    <div className="font-semibold text-base-content">{contact.name}</div>
                    <div className="text-xs opacity-70">{contact.nickname}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline" onClick={() => openEditModal(contact)}>Edit</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(contact)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* Inline Add/Edit Form */}
          {(showModal || editContact) && (
            <div className="mt-6 p-4 border border-base-200 rounded-lg bg-base-100 shadow">
              <h3 className="font-bold text-lg mb-2">{editContact ? "Edit Contact" : "Add Contact"}</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {!editContact && (
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input input-bordered"
                    value={form.username || ""}
                    onChange={handleChange}
                    required
                  />
                )}
                <input
                  type="text"
                  name="nickname"
                  placeholder="Nickname"
                  className="input input-bordered"
                  value={form.nickname}
                  onChange={handleChange}
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button type="button" className="btn" onClick={() => { setShowModal(false); setEditContact(null); }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editContact ? "Save" : "Add"}</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}