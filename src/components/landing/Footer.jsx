import React from 'react';
import { Phone, Mail, MapPin, Instagram, Twitter, Youtube } from 'lucide-react';

const LOGO = "src/imgs/logo.png";

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] dark:bg-[#0A1120] border-t border-gray-200 dark:border-[#334155]/40 text-white transition-colors duration-300">
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="mb-5">
                            <img src={LOGO} alt="العراب" className="h-14 w-auto object-contain hover:opacity-80 transition-opacity duration-300" />
                        </div>
                        <p className="text-[#94A3B8] leading-relaxed mb-6 text-sm">
                            منصة تعليمية متخصصة في التحضير لاختبار القدرات اللفظي. نساعدك على تحقيق أعلى الدرجات بأسلوب سهل وممتع.
                        </p>
                        <div className="flex gap-3">
                            {[Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-[#1E293B] border border-[#334155]/60 flex items-center justify-center hover:border-[#236D96]/60 hover:bg-[#236D96]/15 transition-all duration-300 group">
                                    <Icon className="w-4 h-4 text-[#94A3B8] group-hover:text-[#4FA3D1] transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-[#E2E8F0] mb-5 uppercase tracking-wider">روابط سريعة</h4>
                        <ul className="space-y-2.5">
                            {['الرئيسية', 'الدورات', 'المحاكي', 'الأسئلة الشائعة', 'تواصل معنا'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-[#94A3B8] hover:text-[#4FA3D1] transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-[#334155] group-hover:bg-[#236D96] transition-colors" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h4 className="text-sm font-bold text-[#E2E8F0] mb-5 uppercase tracking-wider">الدورات</h4>
                        <ul className="space-y-2.5">
                            {['دورة التأسيس اللفظي', 'دورة المحوسب اللفظي', 'دورة الإنقاذ اللفظي', 'تدريبات مجانية'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-[#94A3B8] hover:text-[#4FA3D1] transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-[#334155] group-hover:bg-[#236D96] transition-colors" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-[#E2E8F0] mb-5 uppercase tracking-wider">تواصل معنا</h4>
                        <ul className="space-y-4">
                            {[
                                { icon: Phone, label: "هاتف", value: "0563629802", dir: "ltr" },
                                { icon: Mail, label: "بريد إلكتروني", value: "support@el3rab.com" },
                                { icon: MapPin, label: "الموقع", value: "الرياض، المملكة العربية السعودية" }
                            ].map(({ icon: Icon, label, value, dir }, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-[#1E293B] border border-[#334155]/60 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-[#4FA3D1]" />
                                    </div>
                                    <div>
                                        <p className="text-[#475569] text-xs">{label}</p>
                                        <p className="text-[#E2E8F0] text-sm font-medium" dir={dir}>{value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#334155]/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#475569] text-sm">
                        © 2026 جميع الحقوق محفوظة -  <span className="text-[#4FA3D1] font-medium">العراب</span> - تم التطوير بواسطة عبد الرحمن القلاوي
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-[#475569] hover:text-[#4FA3D1] text-sm transition-colors">سياسة الخصوصية</a>
                        <a href="#" className="text-[#475569] hover:text-[#4FA3D1] text-sm transition-colors">الشروط والأحكام</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}