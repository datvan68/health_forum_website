"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-24 z-50 transition-all duration-300 backdrop-blur-md bg-white/85 shadow-sm border-b border-[#1e3a8a]/5">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-inter tracking-[-1.2px] text-[#1e3a8a]">
            Clinical Atelier
          </span> 
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[ "Dinh dưỡng", "Thể hình", "Sức khỏe tâm thần", "Nghiên cứu" ].map((item, idx) => (
            <Link 
              key={item} 
              href="#" 
              className={`text-sm font-medium transition-colors hover:text-[#1e3a8a] ${idx === 0 ? "text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1" : "text-slate-500"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-[#e6e8ea] rounded-[12px] px-4 py-2 w-64 border border-transparent focus-within:border-blue-200 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm kiến thức..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-slate-600 font-semibold px-4 py-2 hover:bg-slate-50">
              Đăng nhập
            </Button>
            <Button 
              className="bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white px-6 py-2 h-auto text-sm font-semibold rounded-[6px]"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
