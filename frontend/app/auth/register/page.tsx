"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!formData.agreeToTerms) {
      toast.error("Vui lòng đồng ý với các điều khoản.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Đăng ký thành công! Hãy đăng nhập ngay.");
        router.push("/auth/login");
      } else {
        const err = await res.json();
        toast.error(err.error || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      toast.error("Không thể kết nối với máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f7f9fb] font-inter pt-12">
      {/* Visual Branding Panel (60% Desktop) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-3/5 bg-[#003f87] relative overflow-hidden flex-col justify-between p-16 text-[#f2f4f6]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#006e25]/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">ClinicalAtelier</h1>
          <p className="mt-2 text-[#bbd0ff] font-medium uppercase tracking-widest text-sm">Health Forum Ecosystem</p>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="mb-6">
            <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">Cộng đồng chuyên gia</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl font-bold leading-tight mb-8"
          >
            Tham gia cùng các<br/>Bác sĩ hàng đầu.
          </motion.h2>
          <p className="text-lg text-[#bbd0ff] mb-12">Khám phá những nghiên cứu lâm sàng mới nhất và kết nối với mạng lưới chuyên gia y tế toàn cầu.</p>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#007327] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <p className="font-bold">Xác thực danh tính chuyên gia y tế</p>
            </div>
            <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#003f87] border border-white/20 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <p className="font-bold">Truy cập kho tài liệu nghiên cứu độc quyền</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#bbd0ff]/60">
          &copy; 2026 ClinicalAtelier. Quyền riêng tư của bạn là ưu tiên hàng đầu.
        </div>
      </motion.div>

      {/* Registration Form Panel (40% Desktop, 100% Mobile) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-[#ffffff]"
      >
        <div className="w-full max-w-md">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tạo tài khoản mới</h2>
            <p className="text-slate-500">Bắt đầu hành trình nghiên cứu và thảo luận chuyên sâu.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-50 hover:bg-slate-50 hover:border-slate-100 rounded-xl transition-all group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-sm font-bold text-slate-700">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center space-x-2 py-3 border-2 border-slate-50 hover:bg-slate-50 hover:border-slate-100 rounded-xl transition-all group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05 1.61-3.12 1.61-1.29 0-1.78-.71-3.23-.71-1.47 0-2.01.69-3.23.69-1.03 0-2.14-.68-3.19-1.68C2.1 18.25 1 15.22 1 12.06c0-3.12 1.95-5.22 4.09-5.22 1.03 0 1.83.65 2.58.65.69 0 1.68-.69 2.81-.69 1.15 0 2.12.56 2.85 1.54-2.43 1.4-2.03 4.45.54 5.5.01 0 .01.01.02.01-.5 1.44-1.22 2.88-2.3 3.94-.01-.33-.03-.64-.04-.97.01.32.03.64.04.97-.48.47-.96.93-1.44 1.39l.1.01c.21.2.43.4.65.6l.04-.04c1.17 0 1.57-.75 3.02-.75 1.45 0 1.76.71 3 0l-.01.01c-.13-.13-.26-.26-.38-.39zM12.03 7.25c-.02-2.23 1.7-4.14 3.73-4.25.13 2.38-1.92 4.44-3.73 4.25z"/></svg>
              <span className="text-sm font-bold text-slate-700">Apple</span>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-8">
            <div className="h-px bg-slate-100 flex-1" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-tighter">Hoặc đăng ký bằng email</span>
            <div className="h-px bg-slate-100 flex-1" />
          </motion.div>

          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block ml-1">Họ và tên</label>
              <div className="relative">
                <input type="text" name="fullName" required placeholder="Nguyễn Văn A" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] outline-none transition-all placeholder:text-slate-400" onChange={handleChange} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block ml-1">Email</label>
              <div className="relative">
                <input type="email" name="email" required placeholder="example@clinical.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] outline-none transition-all placeholder:text-slate-400" onChange={handleChange} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block ml-1">Mật khẩu</label>
                <input type="password" name="password" required placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] outline-none transition-all" onChange={handleChange} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block ml-1">Xác nhận</label>
                <input type="password" name="confirmPassword" required placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] outline-none transition-all" onChange={handleChange} />
              </div>
            </div>

            <div className="flex items-start space-x-3 py-2 ml-1">
              <input type="checkbox" name="agreeToTerms" required className="mt-1 w-4 h-4 rounded border-slate-300 text-[#003f87] focus:ring-[#003f87]" onChange={handleChange} />
              <p className="text-xs text-slate-500 leading-normal">
                Tôi đồng ý với các{" "}
                <Link href="/terms" className="text-[#003f87] font-bold hover:underline">điều khoản</Link>
                {" "}và{" "}
                <Link href="/privacy" className="text-[#003f87] font-bold hover:underline">chính sách bảo mật</Link>.
              </p>
            </div>

            <button type="submit" disabled={loading} className="w-full relative group pt-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#003f87] to-[#006e25] rounded-xl blur opacity-25 group-hover:opacity-40 transition" />
              <div className="relative w-full py-4 bg-[#003f87] hover:bg-[#002f67] text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span>Tạo tài khoản</span>}
              </div>
            </button>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              {"Đã có tài khoản? "}
              <Link href="/auth/login" className="text-[#003f87] font-bold hover:underline underline-offset-4">
                Đăng nhập ngay
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
