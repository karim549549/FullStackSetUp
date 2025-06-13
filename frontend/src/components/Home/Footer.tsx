"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Logo from '@/components/custom/Logo';

export default function Footer() {
  return (
    <footer className="relative bg-black/50 backdrop-blur-sm border-t border-neutral-800">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500/50 via-pink-500/50 to-blue-500/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-neutral-400 mb-4 max-w-md">
              Transform your health journey with AI-powered nutrition. Get personalized diet plans tailored to your goals.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com" 
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-[#333] dark:text-white group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-[#1DA1F2] dark:text-[#1DA1F2] group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5] dark:text-[#0077B5] group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="mailto:contact@fitai.com" 
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-[#EA4335] dark:text-[#EA4335] group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-neutral-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-neutral-200 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-neutral-400 hover:text-violet-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} FitAI. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/terms" className="text-neutral-400 hover:text-violet-500 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-neutral-400 hover:text-violet-500 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-neutral-400 hover:text-violet-500 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 