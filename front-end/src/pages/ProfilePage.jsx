import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { User, Lock, UserPlus, Shield, Mail, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import "../css/dashboard.css"; // Pour l'agencement principal (sidebar, header)
import "../css/profile.css";   // Styles spécifiques

const ProfilePage = () => {
  const admin = useSelector((state) => state.auth.admin) || { email: "admin@domain.com", role: "Admin", name: "Administrateur" };
  
  // States formulaire mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdMessage, setPwdMessage] = useState({ text: "", type: "" });
  const [pwdLoading, setPwdLoading] = useState(false);

  // States formulaire nouvel utilisateur
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("User");
  const [addUserMessage, setAddUserMessage] = useState({ text: "", type: "" });
  const [addUserLoading, setAddUserLoading] = useState(false);

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : "AD";
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwdMessage({ text: "Les nouveaux mots de passe ne correspondent pas.", type: "error" });
      return;
    }
    
    setPwdLoading(true);
    try {
      const response = await axios.put("http://localhost:5136/api/auth/change-password", {
        email: admin?.email,
        oldPassword,
        newPassword
      });
      setPwdMessage({ text: "Mot de passe modifié avec succès !", type: "success" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPwdMessage({ text: error.response?.data?.message || "Erreur lors du changement de mot de passe", type: "error" });
    } finally {
      setPwdLoading(false);
      setTimeout(() => setPwdMessage({ text: "", type: "" }), 5000);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    try {
      // Nous utilisons le même endpoint register mais nous pourrions l'adapter pour accepter un rôle
      const response = await axios.post("http://localhost:5136/api/auth/register", {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole
      });
      setAddUserMessage({ text: "Nouvel utilisateur ajouté avec succès !", type: "success" });
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("User");
    } catch (error) {
      setAddUserMessage({ text: error.response?.data?.message || "Erreur lors de l'ajout de l'utilisateur", type: "error" });
    } finally {
      setAddUserLoading(false);
      setTimeout(() => setAddUserMessage({ text: "", type: "" }), 5000);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1>Mon Profil</h1>
              </div>
            </div>
          </div>

          <div className="profile-container">
            <div className="profile-grid-layout">
              {/* Carte Informations Utilisateur */}
              <div className="profile-card">
                <div className="profile-card-header">
                  <User color="var(--accent-primary)" />
                  <h3>Mes Informations</h3>
                </div>
                
                <div className="user-avatar-placeholder">
                  {getInitials(admin?.name || admin?.email)}
                </div>

                <div className="info-item">
                  <div className="info-label">Nom Complexe</div>
                  <div className="info-value">
                    <User size={18} color="var(--text-secondary)" />
                    {admin?.name || "Administrateur par défaut"}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">Adresse E-mail</div>
                  <div className="info-value">
                    <Mail size={18} color="var(--text-secondary)" />
                    {admin?.email || "Non renseigné"}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">Rôle d'accès</div>
                  <div className="info-value">
                    <Shield size={18} color="var(--accent-primary)" />
                    {admin?.role || "Admin"}
                  </div>
                </div>
              </div>

              {/* Carte Changement de Mot de Passe */}
              <div className="profile-card">
                <div className="profile-card-header">
                  <Lock color="var(--accent-primary)" />
                  <h3>Changer le mot de passe</h3>
                </div>
                
                {pwdMessage.text && (
                  <div className={`alert-message ${pwdMessage.type}`}>
                    {pwdMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {pwdMessage.text}
                  </div>
                )}

                <form className="profile-form" onSubmit={handlePasswordChange}>
                  <div className="form-group">
                    <label>Ancien mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="Saisissez votre ancien mot de passe"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Nouveau mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="Saisissez le nouveau mot de passe"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="Confirmez le nouveau mot de passe"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn-primary" disabled={pwdLoading}>
                    {pwdLoading ? "Mise à jour..." : <><KeyRound size={18} /> Mettre à jour</>}
                  </button>
                </form>
              </div>
            </div>

            {/* Section Administrateur uniquement : Ajouter un utilisateur */}
            {admin?.role === "Admin" && (
              <div className="profile-card">
                <div className="profile-card-header">
                  <UserPlus color="var(--accent-primary)" />
                  <h3>Ajouter un nouvel utilisateur</h3>
                </div>
                
                {addUserMessage.text && (
                  <div className={`alert-message ${addUserMessage.type}`}>
                    {addUserMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {addUserMessage.text}
                  </div>
                )}

                <form className="profile-form profile-grid-layout" onSubmit={handleAddUser}>
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input 
                      type="text" 
                      placeholder="Nom de l'utilisateur"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Adresse E-mail</label>
                    <input 
                      type="email" 
                      placeholder="email@universite.edu"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="Nouveau mot de passe"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Rôle</label>
                    <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
                      <option value="Admin">Administrateur (Admin)</option>
                      <option value="User">Utilisateur Standard (User)</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <button type="submit" className="btn-primary" disabled={addUserLoading} style={{ width: "100%" }}>
                      {addUserLoading ? "Création en cours..." : <><UserPlus size={18} /> Créer l'utilisateur</>}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
