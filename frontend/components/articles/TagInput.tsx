"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  category: string;
  setCategory: (cat: string) => void;
}

export function TagInput({ tags, setTags, category, setCategory }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim().toLowerCase())) {
        setTags([...tags, inputValue.trim().toLowerCase()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-6 w-full items-start animate-in slide-in-from-bottom-4 duration-700 delay-100">
      {/* Category Selection */}
      <div className="flex-1 flex flex-col gap-3">
        <label className="text-[#94a3b8] text-[12px] font-semibold tracking-[0.1em] uppercase">
          Chuyên mục
        </label>
        <div className="relative group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#f2f4f6] text-[#191c1e] text-[16px] font-medium py-3 px-4 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all group-hover:bg-[#ebedf0]"
          >
            <option>Trao đổi chất</option>
            <option>Y học chính xác</option>
            <option>Trường thọ</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform group-hover:scale-110">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Tag Keywords Input */}
      <div className="flex-1 flex flex-col gap-3">
        <label className="text-[#94a3b8] text-[12px] font-semibold tracking-[0.1em] uppercase">
          Thẻ từ khóa
        </label>
        <div className="bg-[#f2f4f6] min-h-[48px] p-2 rounded-lg flex flex-wrap gap-2 items-center transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
          {tags.map((tag, idx) => (
            <div 
              key={idx} 
              className="bg-[#80f98b] text-[#007327] text-[12px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <span>#{tag}</span>
              <button 
                onClick={() => removeTag(idx)}
                className="hover:bg-green-200/50 rounded-full transition-colors"
                type="button"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addTag}
            placeholder="Thêm thẻ..."
            className="flex-1 min-w-[120px] bg-transparent text-sm text-slate-600 focus:outline-none px-2"
          />
        </div>
      </div>
    </div>
  );
}
