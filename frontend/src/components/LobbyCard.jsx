import React, { useState } from 'react';
import { Users, Gamepad2, Shield } from 'lucide-react';
import { Button } from './Button';
import API from '../api/axios';

export function LobbyCard({ lobby, onLobbyJoin }) {
  const { title, game, players, maxPlayers, levelReq, isPrivate } = lobby;
  const [joining, setJoining] = useState(false);

  const handleJoin = async () => {
    try {
      setJoining(true);

      const response = await API.patch(`/lobby/join/${lobby._id}`);

      if(response.data?.success){
        alert('Joined Lobby Successfully');
        if(onLobbyJoin) onLobbyJoin();
      }
    } catch (error) {
      console.error("Error Joining Lobby:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to join lobby");
    } finally {
      setJoining(false);
    }
  }
  
  const currentPlayersCount = players.length;
  const isFull = currentPlayersCount >= maxPlayers;

  return (
    <div className="bg-vexor-card border border-gray-800 rounded-lg p-5 hover:border-vexor-accent/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-vexor-accent/5 rounded-full blur-2xl group-hover:bg-vexor-accent/10 transition-colors pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="bg-black/50 p-2.5 rounded-md border border-gray-800/80 group-hover:border-vexor-accent/30 transition-colors">
          <Gamepad2 className="w-6 h-6 text-vexor-accent" />
        </div>
        {isPrivate && (
          <div className="bg-[#1a1a1a] p-1.5 rounded-md border border-gray-800">
            <Shield className="w-4 h-4 text-yellow-500" />
          </div>
        )}
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-vexor-text-muted">{game}</p>
        
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className={isFull ? 'text-red-400 font-medium' : 'text-gray-300'}>
              {players} / {maxPlayers}
            </span>
          </div>
          {levelReq && (
            <div className="px-2 py-0.5 bg-vexor-accent/10 text-vexor-accent rounded text-xs font-medium border border-vexor-accent/20">
              Lvl {levelReq}+
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800/50">
        <Button 
          variant={isFull ? 'secondary' : 'primary'} 
          className="w-full justify-center"
          onClick={handleJoin}
          disabled={isFull || joining}
        >
          {joining ? 'Joining...' : isFull ? 'Lobby Full' : 'Join Lobby'}
        </Button>
      </div>
    </div>
  );
}
