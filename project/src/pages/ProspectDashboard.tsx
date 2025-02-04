import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, TrendingUp, History, LineChart, ArrowRight, UserPlus } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { findSimilarPlayers, projectCareer } from '../data/mlbDataset';
import { RadarChart } from '../components/RadarChart';
import { LineChart as StatLineChart } from '../components/LineChart';
import { SprayChart } from '../components/SprayChart';
import { ComparisonTable } from '../components/ComparisonTable';
import { StatCard } from '../components/StatCard';
import { PitchAnalysis } from '../components/PitchAnalysis';
import { SeasonalStats } from '../components/SeasonalStats';
import { DevelopmentMilestones } from '../components/DevelopmentMilestones';
import { SituationalAnalysis } from '../components/SituationalAnalysis';
import { POSITIONS } from '../data/constants';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const ProspectDashboard = () => {
  const location = useLocation();
  const initialProspectData = location.state?.prospectData || {
    name: "John Smith",
    age: 19,
    position: "Shortstop",
    battingAverage: 0.315,
    homeRuns: 12,
    rbi: 45
  };

  const [prospectData, setProspectData] = useState(initialProspectData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(prospectData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'homeRuns' || name === 'rbi' 
        ? parseInt(value) 
        : name === 'battingAverage' 
          ? parseFloat(value)
          : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProspectData(formData);
    setIsEditing(false);
  };

  const similarPlayers = findSimilarPlayers(prospectData);
  const careerProjection = projectCareer(prospectData, similarPlayers);

  const pitchData = {
    fastball: {
      avgExit: 92.5,
      launchAngle: 12.3,
      contactRate: 0.75,
      whiffRate: 0.25
    },
    breaking: {
      avgExit: 88.7,
      launchAngle: 8.5,
      contactRate: 0.65,
      whiffRate: 0.35
    },
    offspeed: {
      avgExit: 85.2,
      launchAngle: 6.8,
      contactRate: 0.70,
      whiffRate: 0.30
    }
  };

  const situationalData = {
    risp: {
      avg: 0.325,
      ops: 0.875,
      clutchIndex: 1.2
    },
    highLeverage: {
      avg: 0.290,
      ops: 0.820,
      clutchIndex: 1.1
    },
    platoonSplits: {
      vsRight: {
        avg: 0.305,
        ops: 0.845
      },
      vsLeft: {
        avg: 0.285,
        ops: 0.795
      }
    }
  };

  const developmentMilestones = [
    {
      age: 19,
      title: "Rookie Ball Success",
      metrics: ["Hit .315", "12 HR in 80 games", "Plus defense at SS"],
      status: "completed"
    },
    {
      age: 20,
      title: "Advanced A Performance",
      metrics: ["Expected .285+ AVG", "15-20 HR potential", "Improved plate discipline"],
      status: "in-progress"
    },
    {
      age: 21,
      title: "AA Development",
      metrics: ["Power development", "Advanced defensive metrics", "Leadership role"],
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-navy text-white p-8">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">{prospectData.name}</h1>
          <p className="text-gray-400">
            {prospectData.age} years old • {prospectData.position}
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Prospect'}
        </button>
      </header>

      {isEditing && (
        <div className="bg-navy-light p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Edit Prospect Data</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="md:col-span-2 lg:col-span-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-navy-light p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Current Performance
          </h2>
          <SeasonalStats
            prospectStats={prospectData}
            historicalComps={similarPlayers.slice(0, 2)}
          />
        </div>

        <div className="bg-navy-light p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <History className="w-6 h-6 mr-2" />
            Career Projection
          </h2>
          <div className="h-64">
            <StatLineChart
              data={{
                labels: ['Age 19', 'Age 20', 'Age 21', 'Age 22', 'Age 23', 'Age 24', 'Age 25'],
                datasets: [
                  {
                    label: 'Projected WAR',
                    data: careerProjection.development_curve.map(season => season.war),
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    tension: 0.4
                  }
                ]
              }}
              title="Projected Career WAR"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-navy-light p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <LineChart className="w-6 h-6 mr-2" />
            Hitting Analysis
          </h2>
          <PitchAnalysis data={pitchData} />
        </div>

        <div className="bg-navy-light p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Spray Chart</h2>
          <SprayChart
            pullPct={0.35}
            centerPct={0.40}
            oppoPct={0.25}
          />
        </div>

        <div className="bg-navy-light p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Situational Analysis</h2>
          <SituationalAnalysis data={situationalData} />
        </div>
      </div>

      <div className="bg-navy-light p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <ArrowRight className="w-6 h-6 mr-2" />
          Development Timeline
        </h2>
        <DevelopmentMilestones milestones={developmentMilestones} />
      </div>

      <div className="bg-navy-light p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <ChevronDown className="w-6 h-6 mr-2" />
          Detailed Comparisons
        </h2>
        <ComparisonTable
          prospect={prospectData}
          similarPlayers={similarPlayers}
          metrics={[
            { key: 'battingAverage', label: 'Batting Average' },
            { key: 'homeRuns', label: 'Home Runs' },
            { key: 'rbi', label: 'RBI' }
          ]}
        />
      </div>
    </div>
  );
};