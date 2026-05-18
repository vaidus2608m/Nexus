import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export function CreateLobbyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-vexor-card w-full max-w-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-800/60 bg-[#111]">
          <h2 className="text-xl font-bold text-white tracking-wide">Create Nexus Lobby</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <Input 
            label="Game Title" 
            placeholder="e.g., CS2, Minecraft, Valorant" 
          />
          <Input 
            label="Lobby Name" 
            placeholder="e.g., Chill Survival, Ranked Grind" 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Region" 
              placeholder="e.g., NA East" 
            />
            <Input 
              label="Level Requirement" 
              placeholder="e.g., 20+" 
              type="number"
            />
          </div>
          
          <div className="pt-4 mt-2 border-t border-gray-800/50 flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              // Add creation logic later
              onClose();
            }}>
              Launch Lobby
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
