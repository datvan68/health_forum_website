"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Edit3 } from "lucide-react";

interface ProfileHeroProps {
  fullName: string;
  title: string;
  specialty: string;
  avatarUrl: string;
  coverImageUrl: string;
  isVerified: boolean;
  bio: string;
  location: string;
  joinDate: string;
}

export function ProfileHero({
  fullName,
  title,
  specialty,
  avatarUrl,
  coverImageUrl,
  isVerified,
  bio,
  location,
  joinDate,
}: ProfileHeroProps) {
  return (
    <section className="relative w-full pb-16">
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[256px] w-full overflow-hidden rounded-b-xl"
      >
        <Image
          src={coverImageUrl}
          alt="Profile Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ecf0f4]/40" />
      </motion.div>

      {/* Profile Header Container */}
      <div className="mx-auto max-w-[1228px] px-8 -mt-16 relative flex flex-col md:flex-row gap-6 items-end">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative size-40 p-1 bg-white rounded-xl shadow-lg"
        >
          <div className="relative size-full overflow-hidden rounded-lg">
            <Image
              src={avatarUrl}
              alt={fullName}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 pb-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mb-2"
          >
            <h1 className="text-3xl font-['Roboto',sans-serif] text-[#191c1e] tracking-tight">
              {fullName}
            </h1>
            {isVerified && (
              <Badge className="bg-[#80f98b] text-[#007327] hover:bg-[#80f98b] border-none font-semibold uppercase text-[10px] tracking-widest px-3 py-1">
                Người bảo trợ sức khỏe xác thực
              </Badge>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-sm mb-1"
          >
            {title} & {specialty}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#424752] max-w-2xl leading-relaxed mb-4"
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 text-sm font-medium text-[#003f87]"
          >
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Tham gia {joinDate}</span>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="pb-2"
        >
          <Button className="bg-gradient-to-r from-[#003f87] to-[#0056b3] hover:opacity-90 shadow-md h-11 px-8">
            <Edit3 className="mr-2 size-4" />
            Chỉnh sửa hồ sơ
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
