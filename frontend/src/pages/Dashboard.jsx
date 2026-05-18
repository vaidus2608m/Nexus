import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { LobbyCard } from '../components/LobbyCard';
import { CreateLobbyModal } from '../components/CreateLobbyModal';
import API from '../api/axios';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        setLoading(true);
        const response = await API.get('/lobby');

        if(response.data?.success){
          setLobbies(response.data.data || []);
        }
      } catch (error) {
        console.log("Error fetching lobbies:", error);
        setError('Failed to load active lobbies. Make sure backend is running.')
      } finally {
        setLoading(false);
      }
    }

    fetchLobbies();
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Active Lobbies</h1>
          <p className="text-gray-400">Join a game or create your own instance.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-5 h-5" />
          Create Lobby
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lobbies.map(lobby => (
          <LobbyCard key={lobby._id} lobby={lobby} />
        ))}
      </div>

      <CreateLobbyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
