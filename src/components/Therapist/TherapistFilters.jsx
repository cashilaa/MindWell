import React from 'react';
import { Checkbox, Select } from "@material-tailwind/react";

const TherapistFilters = ({ filters, setFilters }) => {
  const specializations = [
    "Anxiety", "Depression", "Trauma and PTSD", "Relationship Issues",
    "Career Burnout", "LGBTQ+ Support", "Eating Disorders", "Addiction"
  ];

  const sessionFormats = [
    "In-person", "Online", "Group Sessions", "Workshops"
  ];

  const languages = [
    "English", "Mandarin", "Dutch", "Spanish", "Arabic"
  ];

  const priceRanges = [
    "Free/Low Cost", "Sliding Scale", "Premium"
  ];

  const availability = [
    "Immediate/Urgent", "Weekends", "Evenings"
  ];

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category]?.[value]
      }
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-primary-900 mb-6">Filters</h3>

      {/* Specializations */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Specializations</h4>
        <div className="space-y-2">
          {specializations.map((spec) => (
            <Checkbox
              key={spec}
              label={spec}
              checked={filters.specializations?.[spec] || false}
              onChange={() => handleCheckboxChange('specializations', spec)}
              className="text-primary-500"
            />
          ))}
        </div>
      </div>

      {/* Session Format */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Session Format</h4>
        <div className="space-y-2">
          {sessionFormats.map((format) => (
            <Checkbox
              key={format}
              label={format}
              checked={filters.formats?.[format] || false}
              onChange={() => handleCheckboxChange('formats', format)}
              className="text-primary-500"
            />
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Languages</h4>
        <Select
          value={filters.language || ""}
          onChange={(value) => setFilters(prev => ({ ...prev, language: value }))}
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((price) => (
            <Checkbox
              key={price}
              label={price}
              checked={filters.priceRanges?.[price] || false}
              onChange={() => handleCheckboxChange('priceRanges', price)}
              className="text-primary-500"
            />
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Availability</h4>
        <div className="space-y-2">
          {availability.map((time) => (
            <Checkbox
              key={time}
              label={time}
              checked={filters.availability?.[time] || false}
              onChange={() => handleCheckboxChange('availability', time)}
              className="text-primary-500"
            />
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => setFilters({})}
        className="w-full py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default TherapistFilters;
