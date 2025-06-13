'use client';

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { X, Search, Ban, Leaf, Star, CheckCircle2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ProfileFormType } from '@/services/validations/profileValidationSchema';
import { MEDICATION, FOOD_INTOLERANCE } from '@/lib/types/profile.types';

interface HealthLifestyleProps {
  medications: MEDICATION[];
  foodIntolerances: FOOD_INTOLERANCE[];
  smoke: boolean;
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  kosher: boolean;
  handleFieldChange: (key: keyof ProfileFormType, value: any) => void;
}

const MEDICATIONS = Object.values(MEDICATION);
const FOOD_INTOLERANCES = Object.values(FOOD_INTOLERANCE);

export default function HealthLifestyle({
  medications = [],
  foodIntolerances = [],
  smoke = false,
  vegetarian = false,
  vegan = false,
  halal = false,
  kosher = false,
  handleFieldChange
}: HealthLifestyleProps) {
  const [showMedDropdown, setShowMedDropdown] = useState(false);
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [medSearch, setMedSearch] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [filteredMeds, setFilteredMeds] = useState<MEDICATION[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FOOD_INTOLERANCE[]>([]);

  useEffect(() => {
    const filteredMeds = MEDICATIONS.filter(med =>
      med.toLowerCase().includes(medSearch.toLowerCase()) &&
      !medications.includes(med)
    );
    setFilteredMeds(filteredMeds);

    const filteredFoods = FOOD_INTOLERANCES.filter(food =>
      food.toLowerCase().includes(foodSearch.toLowerCase()) &&
      !foodIntolerances.includes(food)
    );
    setFilteredFoods(filteredFoods);
  }, [medSearch, foodSearch, medications, foodIntolerances]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.medication-dropdown')) {
        setShowMedDropdown(false);
      }
      if (!target.closest('.food-dropdown')) {
        setShowFoodDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMedSelect = (med: MEDICATION) => {
    const newMeds = medications.includes(med)
      ? medications.filter(m => m !== med)
      : [...medications, med];
    handleFieldChange('medications', newMeds);
    setShowMedDropdown(false);
  };

  const handleMedRemove = (med: MEDICATION) => {
    const newMeds = medications.filter(m => m !== med);
    handleFieldChange('medications', newMeds);
  };

  const handleFoodSelect = (food: FOOD_INTOLERANCE) => {
    const newFoods = foodIntolerances.includes(food)
      ? foodIntolerances.filter(f => f !== food)
      : [...foodIntolerances, food];
    handleFieldChange('foodIntolerances', newFoods);
    setShowFoodDropdown(false);
  };

  const handleFoodRemove = (food: FOOD_INTOLERANCE) => {
    const newFoods = foodIntolerances.filter(f => f !== food);
    handleFieldChange('foodIntolerances', newFoods);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
      <div className="relative bg-card border border-border rounded-2xl p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Health & Lifestyle (Optional)</h2>
        <div className="space-y-6">
          {/* Medications */}
          <div className="space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">
              Medications 
            </label>
            <div className="relative medication-dropdown">
              <div
                onClick={() => setShowMedDropdown(!showMedDropdown)}
                className="flex items-center gap-2 border border-border rounded-lg px-4 py-2 cursor-text bg-background hover:border-sky-500/50 transition-colors"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search medications..."
                  className="bg-transparent text-sm outline-none w-full"
                  value={medSearch}
                  onChange={(e) => {
                    setMedSearch(e.target.value);
                    setShowMedDropdown(true);
                  }}
                />
              </div>

              {showMedDropdown && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-card border border-border shadow-lg">
                  {filteredMeds.length > 0 ? (
                    filteredMeds.map((med) => (
                      <li
                        key={med}
                        className="px-4 py-2 text-sm hover:bg-sky-500/10 cursor-pointer"
                        onClick={() => handleMedSelect(med)}
                      >
                        {med}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-muted-foreground">No results found.</li>
                  )}
                </ul>
              )}
            </div>

            {medications.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {medications.map((med) => (
                  <span
                    key={med}
                    className="flex items-center gap-1 text-sm px-2 py-1 border border-sky-500/30 bg-sky-500/10 text-sky-300 rounded-full"
                  >
                    {med}
                    <button
                      onClick={() => handleMedRemove(med)}
                      className="text-sky-300 hover:text-sky-400"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Food Intolerances */}
          <div className="space-y-3">
            <label className="block text-xs font-medium text-muted-foreground">
              Food Intolerances (Optional)
            </label>
            <div className="relative food-dropdown">
              <div
                onClick={() => setShowFoodDropdown(!showFoodDropdown)}
                className="flex items-center gap-2 border border-border rounded-lg px-4 py-2 cursor-text bg-background hover:border-sky-500/50 transition-colors"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search food intolerances..."
                  className="bg-transparent text-sm outline-none w-full"
                  value={foodSearch}
                  onChange={(e) => {
                    setFoodSearch(e.target.value);
                    setShowFoodDropdown(true);
                  }}
                />
              </div>

              {showFoodDropdown && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-card border border-border shadow-lg">
                  {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                      <li
                        key={food}
                        className="px-4 py-2 text-sm hover:bg-sky-500/10 cursor-pointer"
                        onClick={() => handleFoodSelect(food)}
                      >
                        {food}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-muted-foreground">No results found.</li>
                  )}
                </ul>
              )}
            </div>

            {foodIntolerances.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {foodIntolerances.map((food) => (
                  <span
                    key={food}
                    className="flex items-center gap-1 text-sm px-2 py-1 border border-sky-500/30 bg-sky-500/10 text-sky-300 rounded-full"
                  >
                    {food}
                    <button
                      onClick={() => handleFoodRemove(food)}
                      className="text-sky-300 hover:text-sky-400"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Smoking Status */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">Do you smoke? (Optional)</span>
            </div>
            <Switch
              checked={smoke}
              onCheckedChange={(checked) => handleFieldChange('smoke', checked)}
              className="cursor-pointer"
            />
          </div>

          {/* Dietary Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'vegetarian', label: 'Vegetarian', icon: Leaf, value: vegetarian },
              { name: 'vegan', label: 'Vegan', icon: Star, value: vegan },
              { name: 'halal', label: 'Halal', icon: CheckCircle2, value: halal },
              { name: 'kosher', label: 'Kosher', icon: CheckCircle2, value: kosher },
            ].map((pref) => (
              <motion.label
                key={pref.name}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background cursor-pointer hover:border-sky-500/20 hover:bg-sky-500/5 transition-all duration-200"
              >
                <input
                  type="checkbox"
                  checked={pref.value}
                  onChange={(e) => handleFieldChange(pref.name as keyof ProfileFormType, e.target.checked)}
                  className="w-4 h-4 text-sky-500 border-border rounded focus:ring-sky-500 cursor-pointer"
                />
                <pref.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">{pref.label}</span>
              </motion.label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 