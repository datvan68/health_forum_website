"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Award, Beaker, UserCheck, ShieldCheck, Microscope } from "lucide-react";

import { useIsMounted } from "@/hooks/useIsMounted";

interface Badge {
  id: number;
  name: string;
  iconUrl: string;
  isEarned: boolean;
}

interface StatsGridProps {
  healthScore: number;
  badges: Badge[];
}

export function StatsGrid({ healthScore, badges }: StatsGridProps) {
  const isMounted = useIsMounted();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-[1228px] mx-auto px-8 mb-12"
    >
      {/* Health Score Card */}
      <motion.div 
        variants={item}
        className="bg-[#f2f4f6] p-6 rounded-xl flex flex-col justify-between h-44 shadow-sm"
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#727784] mb-1 block">
            Tổng điểm sức khỏe
          </span>
          <h3 className="text-4xl font-extrabold text-[#003f87] font-['Manrope',sans-serif]">
            {isMounted ? healthScore.toLocaleString('en-US') : healthScore}
          </h3>
        </div>
        <div className="bg-[#003f87]/5 p-3 rounded-lg">
          <p className="text-xs text-[#424752] leading-tight">
            Top 5% người đóng góp trong tháng này
          </p>
        </div>
      </motion.div>

      {/* Badges Card */}
      <motion.div 
        variants={item}
        className="col-span-1 md:col-span-3 bg-[#f2f4f6] p-6 rounded-xl shadow-sm"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#727784] mb-6 block">
          Huy hiệu chuyên môn
        </span>
        <div className="flex gap-4 md:gap-8 flex-wrap">
          {badges.map((badge) => (
            <motion.div 
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center gap-3 transition-opacity ${!badge.isEarned ? 'opacity-40 grayscale' : ''}`}
            >
              <div className="size-16 bg-white rounded-2xl border border-[#c2c6d4]/20 shadow-sm flex items-center justify-center p-4 relative overflow-hidden">
                <Image
                  src={badge.iconUrl}
                  alt={badge.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-medium text-[#191c1e] text-center w-24">
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
