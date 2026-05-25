import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react'; // Added Loader2 for smooth fetch UX
import { Button } from './Button';
import { Input } from './Input';
import API from '../api/axios';

// Keeping these as local defaults/fallbacks
const SUPPORTED_GAMES = ["CS2", "PUBG PC", "The Finals", "Minecraft"];
const REGIONS = ["Asia", "Europe", "NA", "Global"];

export function CreateLobbyModal({ isOpen, onClose, onLobbyCreated }) {
  const [supportedGames, setSupportedGames] = useState([]);
  const [regions, setRegions] = useState([]);
  const [configLoading, setConfigLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    game: SUPPORTED_GAMES[0],
    description: "",
    maxPlayers: 5,
    levelReq: 0, 
    region: REGIONS[0],
  });
  const [loading, setLoading] = useState(false);

  const fetchConfigConstants = async () => {
    try {
      setConfigLoading(true);
      const response = await API.get('/config/constants');

      if (response.data?.success) {
        const { SUPPORTED_GAMES: backendGames, REGIONS: backendRegions } = response.data.data;

        setSupportedGames(backendGames || []);
        setRegions(backendRegions || []);

        setFormData(prev => ({
          ...prev,
          game: backendGames?.[0] || "",
          region: backendRegions?.[0] || ""
        }));
      }
    } catch (error) {
      console.log("Failed to stream config constants from backend:", error);
    } finally {
      setConfigLoading(false);
    }    
  };

  useEffect(() => {
    if (isOpen) {
      fetchConfigConstants();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await API.post('/lobby/create', {
        title: formData.title,
        game: formData.game,
        region: formData.region,
        maxPlayers: Number(formData.maxPlayers),
        levelReq: Number(formData.levelReq) 
      });

      if (response.data?.success) {
        alert("Nexus Lobby Launched");
        if (onLobbyCreated) onLobbyCreated();
        onClose();
      }
    } catch (error) {
      console.log("Lobby Creation Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed To Launch Lobby");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const dropdownStyles = "w-full bg-[#1a1a1a] border border-gray-800 focus:border-vexor-accent focus:ring-vexor-accent rounded-md px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1 text-base";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-vexor-card w-full max-w-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-800/60 bg-[#111]">
          <h2 className="text-xl font-bold text-white tracking-wide">Create Nexus Lobby</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1.5 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {configLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-6 h-6 text-vexor-accent animate-spin" />
            <p className="text-gray-500 text-xs">Syncing real-time server configs...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Input 
              label="Lobby Name" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Ranked Grind, Chill Survival" 
              required
            />

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-300">Game Title</label>
              <select
                name="game"
                value={formData.game}
                onChange={handleChange}
                className={dropdownStyles}
                required
              >
                {supportedGames.map((gameName) => (
                  <option key={gameName} value={gameName} className="bg-[#1a1a1a] text-white">
                    {gameName}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-gray-300">Region</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={dropdownStyles}
                  required
                >
                  {regions.map((regionName) => (
                    <option key={regionName} value={regionName} className="bg-[#1a1a1a] text-white">
                      {regionName}
                    </option>
                  ))}
                </select>
              </div>

              <Input 
                label="Max Players" 
                name="maxPlayers"
                type="number"
                value={formData.maxPlayers}
                onChange={handleChange}
                placeholder="e.g., 5" 
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-gray-300">Minimum Level Requirement</label>
              <select
                name="levelReq"
                value={formData.levelReq}
                onChange={handleChange}
                className={dropdownStyles}
                required
              >
                {Array.from({ length: 11 }, (_, index) => (
                  <option key={index} value={index} className="bg-[#1a1a1a] text-white">
                    Level {index}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-4 mt-2 border-t border-gray-800/50 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Launching..." : "Launch Lobby"}
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}