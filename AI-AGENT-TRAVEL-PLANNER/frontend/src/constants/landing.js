import { MapPin, Plane, CloudSun, Sparkles, Compass, Globe, Star } from "lucide-react";

export const FEATURES = [
  {
    icon: Sparkles,
    title: "Smart Itineraries",
    desc: "AI-crafted day-by-day plans tailored to your style, budget, and travel group.",
  },
  {
    icon: Plane,
    title: "Live Flights & Rates",
    desc: "Real-time flight options and currency exchange so your budget is always accurate.",
  },
  {
    icon: CloudSun,
    title: "Weather-Aware Planning",
    desc: "Destination weather pulled at planning time so you pack right and time it well.",
  },
];

export const BG_ITEMS = [
  { icon: Plane, size: 52, color: "#38bdf8", style: { top: "12%", left: "6%" }, cls: "lbg-drift-r", delay: 0, dur: 18 },
  { icon: CloudSun, size: 80, color: "#fbbf24", style: { top: "6%", left: "70%" }, cls: "lbg-float", delay: 2, dur: 22 },
  { icon: CloudSun, size: 54, color: "#bae6fd", style: { top: "52%", left: "87%" }, cls: "lbg-float", delay: 6, dur: 28 },
  { icon: MapPin, size: 42, color: "#f43f5e", style: { top: "28%", left: "83%" }, cls: "lbg-float", delay: 1, dur: 16 },
  { icon: Compass, size: 48, color: "#f59e0b", style: { top: "62%", left: "4%" }, cls: "lbg-spin-s", delay: 0, dur: 32 },
  { icon: Globe, size: 68, color: "#34d399", style: { top: "70%", left: "66%" }, cls: "lbg-float", delay: 4, dur: 20 },
  { icon: Star, size: 28, color: "#fbbf24", style: { top: "18%", left: "44%" }, cls: "lbg-twinkle", delay: 3, dur: 14 },
  { icon: Star, size: 20, color: "#a78bfa", style: { top: "46%", left: "58%" }, cls: "lbg-twinkle", delay: 7, dur: 10 },
  { icon: Plane, size: 36, color: "#60a5fa", style: { top: "80%", left: "28%" }, cls: "lbg-drift-r", delay: 9, dur: 24 },
  { icon: MapPin, size: 32, color: "#fb923c", style: { top: "36%", left: "14%" }, cls: "lbg-float", delay: 5, dur: 19 },
];
