"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity,
  Scale,
  Heart,
  Dumbbell,
  Calendar
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Types for our data
type DietPlan = 'Weight Loss Plan' | 'Muscle Gain Plan' | 'Maintenance Plan' | 'Endurance Plan';

interface ProgressData {
  date: string;
  'Weight Loss Plan': number;
  'Muscle Gain Plan': number;
  'Maintenance Plan': number;
  'Endurance Plan': number;
}

interface Metrics {
  weight: {
    current: number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
  };
  bodyFat: {
    current: number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
  };
  muscleMass: {
    current: number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
  };
}

// Mock data for multiple diet plans progress
const dietPlansProgress: ProgressData[] = [
  {
    date: '2024-01-01',
    'Weight Loss Plan': 120,
    'Muscle Gain Plan': 60,
    'Maintenance Plan': 90,
    'Endurance Plan': 75,
  },
  {
    date: '2024-01-04',
    'Weight Loss Plan': 118,
    'Muscle Gain Plan': 62,
    'Maintenance Plan': 90,
    'Endurance Plan': 77,
  },
  {
    date: '2024-01-08',
    'Weight Loss Plan': 115,
    'Muscle Gain Plan': 65,
    'Maintenance Plan': 90,
    'Endurance Plan': 80,
  },
  {
    date: '2024-01-12',
    'Weight Loss Plan': 112,
    'Muscle Gain Plan': 68,
    'Maintenance Plan': 90,
    'Endurance Plan': 83,
  },
  {
    date: '2024-01-15',
    'Weight Loss Plan': 110,
    'Muscle Gain Plan': 70,
    'Maintenance Plan': 90,
    'Endurance Plan': 85,
  },
  {
    date: '2024-01-19',
    'Weight Loss Plan': 107,
    'Muscle Gain Plan': 73,
    'Maintenance Plan': 90,
    'Endurance Plan': 87,
  },
  {
    date: '2024-01-22',
    'Weight Loss Plan': 105,
    'Muscle Gain Plan': 75,
    'Maintenance Plan': 90,
    'Endurance Plan': 90,
  },
  {
    date: '2024-01-26',
    'Weight Loss Plan': 102,
    'Muscle Gain Plan': 78,
    'Maintenance Plan': 90,
    'Endurance Plan': 93,
  },
  {
    date: '2024-01-29',
    'Weight Loss Plan': 100,
    'Muscle Gain Plan': 80,
    'Maintenance Plan': 90,
    'Endurance Plan': 95,
  },
  {
    date: '2024-02-01',
    'Weight Loss Plan': 98,
    'Muscle Gain Plan': 82,
    'Maintenance Plan': 90,
    'Endurance Plan': 97,
  }
];

// Calculate metrics from progress data
const calculateMetrics = (data: ProgressData[]): Metrics => {
  const latest = data[data.length - 1];
  const first = data[0];
  
  return {
    weight: {
      current: latest['Weight Loss Plan'],
      change: (latest['Weight Loss Plan'] - first['Weight Loss Plan']).toFixed(1),
      trend: latest['Weight Loss Plan'] < first['Weight Loss Plan'] ? 'down' : 'up'
    },
    bodyFat: {
      current: 20,
      change: "-2",
      trend: 'down'
    },
    muscleMass: {
      current: 37,
      change: "+2",
      trend: 'up'
    }
  };
};

const metrics = calculateMetrics(dietPlansProgress);

const progressMetrics = [
  {
    title: "Current Plan Progress",
    value: `${metrics.weight.current}kg`,
    change: `${metrics.weight.change}kg`,
    trend: metrics.weight.trend,
    icon: Scale,
    color: "from-emerald-500/20 to-emerald-500/5",
    description: "Weight Loss Plan"
  },
  {
    title: "Body Fat %",
    value: `${metrics.bodyFat.current}%`,
    change: `${metrics.bodyFat.change}%`,
    trend: metrics.bodyFat.trend,
    icon: Heart,
    color: "from-blue-500/20 to-blue-500/5",
    description: "Healthy range: 15-25%"
  },
  {
    title: "Muscle Mass",
    value: `${metrics.muscleMass.current}kg`,
    change: `${metrics.muscleMass.change}kg`,
    trend: metrics.muscleMass.trend,
    icon: Dumbbell,
    color: "from-violet-500/20 to-violet-500/5",
    description: "Increasing muscle mass"
  },
  {
    title: "Progress Duration",
    value: "4 weeks",
    change: "Consistent",
    trend: "neutral",
    icon: Calendar,
    color: "from-amber-500/20 to-amber-500/5",
    description: "Regular tracking"
  }
];

const COLORS = {
  'Weight Loss Plan': '#22c55e',
  'Muscle Gain Plan': '#3b82f6',
  'Maintenance Plan': '#a855f7',
  'Endurance Plan': '#6b7280'
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white mb-8">Progress Analytics</h1>
        
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progressMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color}`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className={`text-sm ${
                    metric.trend === 'up' ? 'text-emerald-400' :
                    metric.trend === 'down' ? 'text-blue-400' :
                    'text-neutral-400'
                  }`}>
                    {metric.change}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Diet Plan Progress Comparison</CardTitle>
              <CardDescription>
                Compare your progress across different diet plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dietPlansProgress}>
                    <defs>
                      <linearGradient id="weightLoss" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="muscleGain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="maintenance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="endurance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-sm text-muted-foreground"
                      stroke="currentColor"
                    />
                    <YAxis 
                      className="text-sm text-muted-foreground"
                      stroke="currentColor"
                      domain={[50, 130]}
                      tickCount={9}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="Weight Loss Plan"
                      stroke="#22c55e"
                      fill="url(#weightLoss)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="Muscle Gain Plan"
                      stroke="#3b82f6"
                      fill="url(#muscleGain)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="Maintenance Plan"
                      stroke="#a855f7"
                      fill="url(#maintenance)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="Endurance Plan"
                      stroke="#6b7280"
                      fill="url(#endurance)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Progress Notes</CardTitle>
              <CardDescription>
                Detailed tracking of your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dietPlansProgress.map((entry, index) => (
                  <div key={entry.date} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-24 text-sm text-muted-foreground">
                      {entry.date}
                    </div>
                    <div className="flex-grow">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(Object.keys(COLORS) as DietPlan[]).map((plan) => (
                          <div key={plan} className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[plan] }}
                            />
                            <span className="text-sm">{plan}: {entry[plan]}kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
} 