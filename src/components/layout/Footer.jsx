 import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { CART_CONFIG } from '../../utils/config';

function Footer() {
  const { APP_NAME,CONTACT_EMAIL,OFFICE_STATE,PIN_CODE ,OFFICE_CITY,OFFICE_ADDRESS} = CART_CONFIG;

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Intro */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-brand-dark uppercase">
              {APP_NAME}<span className="text-brand-primary">.</span>
            </h2>
            <p className="text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-widest">
              Premium lifestyle brand curated for the modern trendsetters of Lucknow. Quality meets aesthetics.
            </p>
            <div className="flex gap-4">
              <FiInstagram className="cursor-pointer hover:text-brand-primary transition-colors text-brand-dark" size={20} />
              <FiTwitter className="cursor-pointer hover:text-brand-primary transition-colors text-brand-dark" size={20} />
              <FiFacebook className="cursor-pointer hover:text-brand-primary transition-colors text-brand-dark" size={20} />
            </div>
          </div>

          {/* 2. Shop Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-brand-primary">Shop</h4>
            <ul className="space-y-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <li><Link to="/" className="hover:text-brand-dark transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-brand-dark transition-colors">Best Sellers</Link></li>
              <li><Link to="/" className="hover:text-brand-dark transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-brand-primary">Support</h4>
            <ul className="space-y-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <li><Link to="/" className="hover:text-brand-dark transition-colors">Shipping Policy</Link></li>
              <li><Link to="/" className="hover:text-brand-dark transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/" className="hover:text-brand-dark transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* 4. Contact Lucknow */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-brand-primary">{OFFICE_CITY} Office</h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-loose">
              {OFFICE_ADDRESS},<br />
              {OFFICE_CITY}, {OFFICE_STATE} {PIN_CODE}<br />
              {CONTACT_EMAIL}
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} {APP_NAME}CART. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-brand-primary">Terms of Use</span>
            <span className="cursor-pointer hover:text-brand-primary">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;