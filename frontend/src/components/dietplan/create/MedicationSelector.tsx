'use client'

import React, { useEffect, useState } from 'react'
import { X, Search } from 'lucide-react'
import { DietFormProfile } from '@/lib/types/diet.types'

const MEDICATIONS = [
  'Aspirin', 'Ibuprofen', 'Acetaminophen', 'Metformin', 'Lisinopril',
  'Atorvastatin', 'Amlodipine', 'Omeprazole', 'Losartan', 'Simvastatin',
  'Hydrochlorothiazide', 'Metoprolol', 'Levothyroxine', 'Warfarin', 'Prednisone',
  'Furosemide', 'Gabapentin', 'Tramadol', 'Sertraline', 'Escitalopram',
  'Fluoxetine', 'Citalopram', 'Alprazolam', 'Lorazepam', 'Clonazepam'
]

interface MedicationSelectorProps {
  updatedField: <K extends keyof DietFormProfile>(key: K, value: DietFormProfile[K]) => void
  medications: DietFormProfile['medications']
}

export default function MedicationsSelector({ updatedField, medications }: MedicationSelectorProps) {
  const [selected, setSelected] = useState<string[]>(medications || [])
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setSelected(medications || [])
  }, [medications])

  const filtered = MEDICATIONS.filter(med =>
    med.toLowerCase().includes(search.toLowerCase()) && !selected.includes(med)
  )

  const handleSelect = (med: string) => {
    const updated = [...selected, med]
    setSelected(updated)
    updatedField('medications', updated)
    setSearch('')
    setShowDropdown(false)
  }

  const handleRemove = (med: string) => {
    const updated = selected.filter(item => item !== med)
    setSelected(updated)
    updatedField('medications', updated)
  }

  return (
    <div className="w-full rounded-md flex flex-col gap-2 relative">
      <h2 className="text-xl font-bold">Do you take any medications?</h2>
      <p className="text-neutral-500 text-sm">This helps us avoid conflicts with your diet recommendations.</p>

      <div className="relative">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 border border-zinc-700 rounded-md px-4 py-2 cursor-text glass-effect hover:neon-glow-sky"
        >
          <Search className="w-4 h-4 text-sky-400" />
          <input
            type="text"
            placeholder="Search medications..."
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
              filtered.map((med) => (
                <li
                  key={med}
                  className="px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
                  onClick={() => handleSelect(med)}
                >
                  {med}
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
          {selected.map((med) => (
            <span
              key={med}
              className="flex items-center gap-1 text-sm px-2 py-1 border border-pink-500/30 bg-pink-600/10 text-pink-300 rounded-full"
            >
              {med}
              <button
                onClick={() => handleRemove(med)}
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
