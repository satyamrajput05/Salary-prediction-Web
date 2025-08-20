import React, { useState } from 'react';
import { IndianRupee, Brain, Briefcase } from 'lucide-react';

interface SalaryPrediction {
  annual: number;
  monthly: number;
}

function App() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [knowledgeLevel, setKnowledgeLevel] = useState<number>(5);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [prediction, setPrediction] = useState<SalaryPrediction | null>(null);

  const jobTitles = [
    'Software Developer',
    'Data Analyst',
    'Web Developer',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'Cloud Engineer',
    'Cybersecurity Analyst',
    'UI/UX Designer',
    'Product Manager',
    'Blockchain Developer',
  ];

  const experienceLevels = [
    'Fresher',
    '1+ years',
    '2+ years',
    '3+ years',
    '4+ years',
    '5+ years',
  ];

  const calculateSalary = () => {
    let baseSalary = 0;
    const ageNum = parseInt(age);

    if (ageNum >= 21 && ageNum <= 24) {
      if (knowledgeLevel < 5) baseSalary = 300000;
      else if (knowledgeLevel <= 7) baseSalary = 600000;
      else baseSalary = 1000000;
    } else if (ageNum > 24 && ageNum <= 30) {
      if (knowledgeLevel < 5) baseSalary = 800000;
      else if (knowledgeLevel <= 7) baseSalary = 1200000;
      else baseSalary = 1500000;
    } else if (ageNum > 30 && ageNum <= 35) {
      baseSalary = 2000000;
    }

    // Apply education multiplier
    const educationMultiplier = {
      BTech: 1,
      MTech: 1.2,
      MBA: 1.3,
      PhD: 1.5,
    }[education] || 1;

    // Apply experience multiplier
    const experienceMultiplier = 1 + (experienceLevels.indexOf(experience) * 0.1);

    const finalAnnualSalary = Math.round(baseSalary * educationMultiplier * experienceMultiplier);
    
    setPrediction({
      annual: finalAnnualSalary,
      monthly: Math.round(finalAnnualSalary / 12),
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <IndianRupee className="w-8 h-8" />
            SalarAI
          </h1>
          <p className="text-gray-400">India's Smartest AI-Based Salary Prediction</p>
        </div>

        <div className="space-y-6">
          {/* Age Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-gray-900 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
              min="18"
              max="100"
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Others'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`p-3 rounded-lg ${
                    gender === g ? 'bg-blue-600' : 'bg-gray-900'
                  } hover:bg-blue-700 transition-colors`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Education Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Education</label>
            <div className="grid grid-cols-2 gap-3">
              {['BTech', 'MTech', 'MBA', 'PhD'].map((edu) => (
                <button
                  key={edu}
                  onClick={() => setEducation(edu)}
                  className={`p-3 rounded-lg ${
                    education === edu ? 'bg-blue-600' : 'bg-gray-900'
                  } hover:bg-blue-700 transition-colors`}
                >
                  {edu}
                </button>
              ))}
            </div>
          </div>

          {/* Knowledge Level Slider */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Knowledge Level
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={knowledgeLevel}
              onChange={(e) => setKnowledgeLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2">{knowledgeLevel}/10</div>
          </div>

          {/* Job Title Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Title
            </label>
            <div className="grid grid-cols-2 gap-3">
              {jobTitles.map((job) => (
                <button
                  key={job}
                  onClick={() => setJobTitle(job)}
                  className={`p-3 rounded-lg ${
                    jobTitle === job ? 'bg-blue-600' : 'bg-gray-900'
                  } hover:bg-blue-700 transition-colors text-sm`}
                >
                  {job}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Experience</label>
            <div className="grid grid-cols-3 gap-3">
              {experienceLevels.map((exp) => (
                <button
                  key={exp}
                  onClick={() => setExperience(exp)}
                  className={`p-3 rounded-lg ${
                    experience === exp ? 'bg-blue-600' : 'bg-gray-900'
                  } hover:bg-blue-700 transition-colors`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Predict Button */}
          <button
            onClick={calculateSalary}
            className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors mt-8"
          >
            Predict Salary
          </button>

          {/* Prediction Results */}
          {prediction && (
            <div className="mt-8 space-y-4 bg-gray-900 p-6 rounded-lg">
              <div>
                <p className="text-gray-400">Annual Salary</p>
                <p className="text-3xl font-bold">{formatCurrency(prediction.annual)}</p>
              </div>
              <div>
                <p className="text-gray-400">Monthly Salary</p>
                <p className="text-2xl font-bold">{formatCurrency(prediction.monthly)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;