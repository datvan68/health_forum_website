"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        window.dispatchEvent(new Event("auth-change"));
        toast.success("Chào mừng trở lại! Đăng nhập thành công.");
        router.push("/");
      } else {
        const err = await res.json();
        toast.error(err.error || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      toast.error("Không thể kết nối với máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f7f9fb] font-inter pt-12">
      {/* Branding / Visual Side (60% Desktop) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-3/5 bg-[#003f87] relative overflow-hidden flex-col justify-between p-16 text-[#f2f4f6]"
      >
        {/* Abstract shape decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#006e25]/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2a9d67]/10 rounded-full blur-[150px] -ml-64 -mb-64" />
        
        {/* Logo/Branding */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">ClinicalAtelier</h1>
          <p className="mt-2 text-[#bbd0ff] font-medium uppercase tracking-widest text-sm">Health Forum Ecosystem</p>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-xl">
          <motion.blockquote 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl font-semibold leading-tight mb-8"
          >
            "Nơi hội tụ tinh hoa y học, kết nối chuyên gia và cộng đồng trong một không gian tối giản, tinh tế."
          </motion.blockquote>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#007327] flex items-center justify-center shadow-lg transform transition hover:scale-110">
                 <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
              </div>
              <div>
                <p className="font-bold text-white">Cộng đồng Y khoa</p>
                <p className="text-xs text-[#bbd0ff]">Chứng thực bởi đội ngũ chuyên gia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="relative z-10 text-xs text-[#bbd0ff]/60">
          &copy; 2026 ClinicalAtelier. Bảo mật thông tin nghiên cứu cao cấp.
        </div>
      </motion.div>

      {/* Form Side (40% Desktop, 100% Mobile) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-16 bg-[#ffffff]"
      >
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="lg:hidden mb-12">
            <h1 className="text-2xl font-bold text-[#003f87]">ClinicalAtelier</h1>
          </div>

          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Chào mừng trở lại</h2>
            <p className="text-slate-500">Đăng nhập để tiếp tục hành trình nghiên cứu và trao đổi.</p>
          </motion.div>

          <motion.form 
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Email</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="username"
                  required
                  placeholder="example@clinic.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] outline-none transition-all placeholder:text-slate-400"
                  onChange={handleChange}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Mật khẩu</label>
                <Link href="/auth/forgot-password" title="Quên mật khẩu?" className="text-xs font-bold text-[#003f87] hover:underline transition-all">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] outline-none transition-all"
                  onChange={handleChange}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#003f87] to-[#006e25] rounded-xl blur opacity-25 group-hover:opacity-40 transition" />
              <div className="relative w-full py-4 bg-[#003f87] hover:bg-[#002f67] text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Đăng nhập</span>
                )}
              </div>
            </button>
            
            {/* Divider */}
            <div className="flex items-center space-x-4 py-2">
              <div className="h-px bg-slate-100 flex-1" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Hoặc đăng nhập với</span>
              <div className="h-px bg-slate-100 flex-1" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-50 hover:bg-slate-50 hover:border-slate-100 rounded-xl transition-all group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-bold text-slate-700">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-50 hover:bg-slate-50 hover:border-slate-100 rounded-xl transition-all group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05 1.61-3.12 1.61-1.29 0-1.78-.71-3.23-.71-1.47 0-2.01.69-3.23.69-1.03 0-2.14-.68-3.19-1.68C2.1 18.25 1 15.22 1 12.06c0-3.12 1.95-5.22 4.09-5.22 1.03 0 1.83.65 2.58.65.69 0 1.68-.69 2.81-.69 1.15 0 2.12.56 2.85 1.54-2.43 1.4-2.03 4.45.54 5.5.01 0 .01.01.02.01-.5 1.44-1.22 2.88-2.3 3.94-.01-.33-.03-.64-.04-.97.01.32.03.64.04.97-.48.47-.96.93-1.44 1.39l.1.01c.21.2.43.4.65.6l.04-.04c1.17 0 1.57-.75 3.02-.75 1.45 0 1.76.71 3 0l-.01.01c-.13-.13-.26-.26-.38-.39zM12.03 7.25c-.02-2.23 1.7-4.14 3.73-4.25.13 2.38-1.92 4.44-3.73 4.25z"/>
                </svg>
                <span className="text-sm font-bold text-slate-700">Apple</span>
              </button>
            </div>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              {"Chưa có tài khoản? "}
              <Link href="/auth/register" className="text-[#003f87] font-bold hover:underline underline-offset-4 transition-all">
                Đăng ký ngay
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
