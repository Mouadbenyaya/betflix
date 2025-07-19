import { useState } from 'react';
import { User, Settings, Bell, Shield, Save } from 'lucide-react';
import '../styles/Settings.css';

export default function Settingss() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        subscription: 'Premium',
        subscriptionEnd: '12/09/2025'
    });
    
    const [preferences, setPreferences] = useState({
        notifications: true,
        autoplay: true,
        quality: 'HD',
        language: 'Français',
        theme: 'dark'
    });

    const [activity] = useState({
        lastWatched: 'Breaking Bad',
        watchTime: '247h',
        favoriteGenre: 'Thriller',
        watchedSeries: 23,
        completedSeries: 18
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempProfileData, setTempProfileData] = useState(profileData);

    const tabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'preferences', label: 'Préférences', icon: Settings },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Sécurité', icon: Shield }
    ];

    const handleSaveProfile = () => {
        setProfileData(tempProfileData);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setTempProfileData(profileData);
        setIsEditing(false);
    };

    const handlePreferenceChange = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const handleToggleClick = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="settings-container">
            <div className="settings-max-width">
                <div className="settings-header">
                    <h1 className="settings-title">Paramètres</h1>
                    <p className="settings-subtitle">Gérez votre profil et vos préférences</p>
                </div>

                <div className="settings-layout">
                    <div className="settings-sidebar">
                        <nav className="settings-nav">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`settings-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                                    >
                                        <Icon size={20} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="settings-main-content">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div>
                                <div className="settings-section-header">
                                    <h2 className="settings-section-title">Profil Utilisateur</h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="settings-button primary"
                                        >
                                            Modifier
                                        </button>
                                    ) : (
                                        <div className="settings-button-group">
                                            <button
                                                onClick={handleSaveProfile}
                                                className="settings-button success"
                                            >
                                                <Save size={16} style={{marginRight: '8px', verticalAlign: 'middle'}} />
                                                Sauvegarder
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="settings-button secondary"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="settings-grid">
                                    <div className="settings-form-group">
                                        <label className="settings-label">Nom complet</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempProfileData.name}
                                                onChange={(e) => setTempProfileData(prev => ({...prev, name: e.target.value}))}
                                                className="settings-input"
                                            />
                                        ) : (
                                            <div className="settings-readonly-field">{profileData.name}</div>
                                        )}
                                    </div>

                                    <div className="settings-form-group">
                                        <label className="settings-label">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={tempProfileData.email}
                                                onChange={(e) => setTempProfileData(prev => ({...prev, email: e.target.value}))}
                                                className="settings-input"
                                            />
                                        ) : (
                                            <div className="settings-readonly-field">{profileData.email}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="settings-card-grid">
                                    <div className="settings-stat-card">
                                        <h3 className="settings-card-title">Abonnement</h3>
                                        <p className="settings-stat-value blue">{profileData.subscription}</p>
                                        <p className="settings-preference-desc">Expire le {profileData.subscriptionEnd}</p>
                                    </div>

                                    <div className="settings-stat-card">
                                        <h3 className="settings-card-title">Statistiques</h3>
                                        <div>
                                            <p>Temps de visionnage: <span className="settings-stat-value green">{activity.watchTime}</span></p>
                                            <p>Séries regardées: <span className="settings-stat-value blue">{activity.watchedSeries}</span></p>
                                            <p>Séries terminées: <span className="settings-stat-value purple">{activity.completedSeries}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-activities">
                                    <h3>Activité récente</h3>
                                    <p>Dernière série regardée: <span className="highlight">{activity.lastWatched}</span></p>
                                    <p className="secondary">Genre préféré: {activity.favoriteGenre}</p>
                                </div>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div>
                                <h2 className="settings-section-title">Préférences</h2>
                                
                                <div>
                                    <div className="settings-preference-item">
                                        <div className="settings-preference-info">
                                            <h3 className="settings-preference-title">Lecture automatique</h3>
                                            <p className="settings-preference-desc">Démarrer automatiquement l'épisode suivant</p>
                                        </div>
                                        <div 
                                            className={`settings-toggle ${preferences.autoplay ? 'active' : ''}`}
                                            onClick={() => handleToggleClick('autoplay')}
                                        >
                                            <div className="settings-toggle-button"></div>
                                        </div>
                                    </div>

                                    <div className="settings-preference-item">
                                        <div className="settings-preference-info">
                                            <h3 className="settings-preference-title">Qualité vidéo</h3>
                                        </div>
                                        <select
                                            value={preferences.quality}
                                            onChange={(e) => handlePreferenceChange('quality', e.target.value)}
                                            className="settings-select"
                                        >
                                            <option value="4K">4K Ultra HD</option>
                                            <option value="HD">HD 1080p</option>
                                            <option value="SD">SD 720p</option>
                                            <option value="Auto">Automatique</option>
                                        </select>
                                    </div>

                                    <div className="settings-preference-item">
                                        <div className="settings-preference-info">
                                            <h3 className="settings-preference-title">Langue</h3>
                                        </div>
                                        <select
                                            value={preferences.language}
                                            onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                            className="settings-select"
                                        >
                                            <option value="Français">Français</option>
                                            <option value="English">English</option>
                                            <option value="Español">Español</option>
                                            <option value="Deutsch">Deutsch</option>
                                        </select>
                                    </div>

                                    <div className="settings-preference-item">
                                        <div className="settings-preference-info">
                                            <h3 className="settings-preference-title">Thème</h3>
                                            <div className="settings-theme-buttons">
                                                {['dark', 'light', 'auto'].map((theme) => (
                                                    <button
                                                        key={theme}
                                                        onClick={() => handlePreferenceChange('theme', theme)}
                                                        className={`settings-theme-button ${preferences.theme === theme ? 'active' : ''}`}
                                                    >
                                                        {theme === 'auto' ? 'Automatique' : theme === 'dark' ? 'Sombre' : 'Clair'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="settings-section-title">Notifications</h2>
                                
                                <div className="settings-notification-list">
                                    {[
                                        { key: 'newEpisodes', label: 'Nouveaux épisodes', desc: 'Recevoir des notifications pour les nouveaux épisodes' },
                                        { key: 'recommendations', label: 'Recommandations', desc: 'Suggestions personnalisées basées sur vos goûts' },
                                        { key: 'reminders', label: 'Rappels', desc: 'Rappels pour reprendre une série' },
                                        { key: 'newsletter', label: 'Newsletter', desc: 'Actualités et nouveautés de la plateforme' }
                                    ].map((notif) => (
                                        <div key={notif.key} className="settings-preference-item">
                                            <div className="settings-preference-info">
                                                <h3 className="settings-preference-title">{notif.label}</h3>
                                                <p className="settings-preference-desc">{notif.desc}</p>
                                            </div>
                                            <div className="settings-toggle active">
                                                <div className="settings-toggle-button"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div>
                                <h2 className="settings-section-title">Sécurité</h2>
                                
                                <div className="settings-security-section">
                                    <div className="settings-preference-item">
                                        <div className="settings-preference-info">
                                            <h3 className="settings-preference-title">Changer le mot de passe</h3>
                                        </div>
                                        <button className="settings-button primary">
                                            Modifier le mot de passe
                                        </button>
                                    </div>

                                    <div className="settings-preference-item">
                                        <div className="settings-preference-info">
                                            <h3 className="settings-preference-title">Authentification à deux facteurs</h3>
                                            <p className="settings-preference-desc">Ajoutez une couche de sécurité supplémentaire</p>
                                        </div>
                                        <button className="settings-button success">
                                            Activer 2FA
                                        </button>
                                    </div>

                                    <div className="settings-card">
                                        <h3 className="settings-card-title">Sessions actives</h3>
                                        <div className="settings-sessions-list">
                                            <div className="settings-session-item">
                                                <div className="settings-session-info">
                                                    <p className="settings-session-name">Chrome sur Windows</p>
                                                    <p className="settings-session-time">Session actuelle</p>
                                                </div>
                                                <span className="settings-status-active">Actif</span>
                                            </div>
                                            <div className="settings-session-item">
                                                <div className="settings-session-info">
                                                    <p className="settings-session-name">Safari sur iPhone</p>
                                                    <p className="settings-session-time">Il y a 2 heures</p>
                                                </div>
                                                <button className="settings-link-button">Déconnecter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}