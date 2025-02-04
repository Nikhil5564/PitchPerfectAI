import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baseline as Baseball, Search, TrendingUp, Users, Award, ChevronRight } from 'lucide-react';
import { POSITIONS } from '../data/constants';

export const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: '',
    battingAverage: '',
    homeRuns: '',
    rbi: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert form data to proper types
    const prospectData = {
      name: formData.name,
      age: parseInt(formData.age),
      position: formData.position,
      battingAverage: parseFloat(formData.battingAverage),
      homeRuns: parseInt(formData.homeRuns),
      rbi: parseInt(formData.rbi)
    };
    // Navigate to dashboard with data
    navigate('/prospect/new', { state: { prospectData } });
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Baseball className="w-16 h-16 mx-auto mb-6 text-blue-500" />
            <h1 className="text-5xl font-bold mb-4">MLB Prospect Predictor</h1>
            <p className="text-xl text-gray-300 mb-8">
              Advanced analytics and AI-powered insights for baseball prospect evaluation
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-navy-light p-6 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Projections</h3>
            <p className="text-gray-400">
              Advanced statistical modeling to predict future performance and development
            </p>
          </div>
          <div className="bg-navy-light p-6 rounded-lg">
            <Users className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Player Comparisons</h3>
            <p className="text-gray-400">
              Compare prospects with historical players to identify similar development paths
            </p>
          </div>
          <div className="bg-navy-light p-6 rounded-lg">
            <Award className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Skill Analysis</h3>
            <p className="text-gray-400">
              Detailed breakdown of current skills and potential areas for improvement
            </p>
          </div>
        </div>

        {/* Prospect Input Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy-light p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Analyze New Prospect
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-navy border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="16"
                  max="45"
                  className="w-full bg-navy border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Position
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full bg-navy border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                >
                  <option value="">Select position...</option>
                  {POSITIONS.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Batting Average
                </label>
                <input
                  type="number"
                  name="battingAverage"
                  value={formData.battingAverage}
                  onChange={handleInputChange}
                  step="0.001"
                  min="0"
                  max="1"
                  className="w-full bg-navy border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Home Runs
                </label>
                <input
                  type="number"
                  name="homeRuns"
                  value={formData.homeRuns}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full bg-navy border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  RBI
                </label>
                <input
                  type="number"
                  name="rbi"
                  value={formData.rbi}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full bg-navy border border-gray-700 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center"
                >
                  Analyze Prospect
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};