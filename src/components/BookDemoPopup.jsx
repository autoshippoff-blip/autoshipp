import React, { useState } from 'react';
import { X, User, Mail, Building2, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function BookDemoPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    details: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', email: '', company: '', phone: '', details: '' });
        onClose();
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-10">
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-card border border-border w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 z-10 my-8">
        
        {/* Header */}
        <div className="bg-muted/30 px-6 py-5 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="text-xl font-bold text-foreground tracking-tight">Book a Demo</h3>
            <p className="text-sm text-muted-foreground mt-1">See how Autoshipp can scale your brand.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-background hover:bg-muted border border-border text-muted-foreground hover:text-foreground rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
              <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">Request Sent!</h4>
              <p className="text-muted-foreground">We&apos;ll be in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User size={14} className="text-muted-foreground" />
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm"
                    placeholder="John Doe"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Mail size={14} className="text-muted-foreground" />
                    Work Email <span className="text-destructive">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Building2 size={14} className="text-muted-foreground" />
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Phone size={14} className="text-muted-foreground" />
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MessageSquare size={14} className="text-muted-foreground" />
                  Additional Details
                </label>
                <textarea 
                  name="details"
                  rows="3"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50 text-sm resize-none"
                  placeholder="Tell us about your current logistics challenges..."
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending Request...
                  </span>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Demo Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="bg-muted/20 px-6 py-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground font-medium flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              We&apos;ll contact you within 24 hours to schedule your personalized demo.
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
