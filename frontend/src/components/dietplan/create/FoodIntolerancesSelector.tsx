'use client'

import React, { useState } from 'react'
import { X, Search } from 'lucide-react'
import { FOOD_INTOLERANCE } from '@/lib/types/profile.types'
import { DietFormProfile } from '@/lib/types/diet.types'

const FOOD_LIST: string[] = Object.values(FOOD_INTOLERANCE)

interface FoodIntolerancesSelectorProps {
  updatedField: <K extends keyof DietFormProfile>(
    key: K,
    value: DietFormProfile[K]
  ) => void
  foodIntolerances: DietFormProfile['foodIntolerances']
}

export default function FoodIntolerancesSelector({
  updatedField,
  foodIntolerances
}: FoodIntolerancesSelectorProps) {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const selected = foodIntolerances ?? []

  const filtered = FOOD_LIST.filter(
    (food) =>
      food.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(food)
  )

  const handleSelect = (food: string) => {
    const updated = [...selected, food]
    updatedField('foodIntolerances', updated)
    setSearch('')
    setShowDropdown(false)
  }

  const handleRemove = (food: string) => {
    const updated = selected.filter((item) => item !== food)
    updatedField('foodIntolerances', updated)
  }

  return (
    <div className="w-full rounded-md flex flex-col gap-2 relative">
      <h2 className="text-xl font-bold">Do you have any food intolerances?</h2>
      <p className="text-neutral-500 text-sm">
        This helps us tailor your diet plan to avoid problematic foods.
      </p>

      <div className="relative">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 border border-zinc-700 rounded-md px-4 py-2 cursor-text glass-effect hover:neon-glow-sky"
        >
          <Search className="w-4 h-4 text-sky-400" />
          <input
            type="text"
            placeholder="Search foods..."
            className="bg-transparent text-sm outline-none text-white w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setShowDropdown(true)
            }}
          />
        </div>

        {showDropdown && (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-zinc-900/95 border border-zinc-700 shadow-lg">
            {filtered.length > 0 ? (
              filtered.map((food) => (
                <li
                  key={food}
                  className="px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
                  onClick={() => handleSelect(food)}
                >
                  {food}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-neutral-500">No results found.</li>
            )}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((food) => (
            <span
              key={food}
              className="flex items-center gap-1 text-sm px-2 py-1 border border-pink-500/30 bg-pink-600/10 text-pink-300 rounded-full"
            >
              {food}
              <button
                onClick={() => handleRemove(food)}
                className="text-pink-300 hover:text-pink-400"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
