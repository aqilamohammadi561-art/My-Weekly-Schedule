import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- MORNING ROUTINE ---------------- */
const morningPlan = [
  { time: "4:30 – 5:06", task: "Science – Deep Focus" },
  { time: "5:06 – 5:42", task: "IT – Coding Practice" },
  { time: "5:42 – 6:18", task: "English – Composition Training" },
  { time: "6:18 – 6:54", task: "Democratic Class – Concepts" },
  { time: "6:54 – 7:30", task: "Seminar – Structured Reading" },
];

/* ---------------- WEEKLY SCHEDULE ---------------- */
const weeklySchedule = {
  Sunday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–3:45", task: "Networking Course" },
    { time: "4:00–5:00", task: "Thinking About Democracy" },
    { time: "5:00–6:00", task: "Rest + Light Review" },
    { time: "6:30–7:15", task: "First-Year Seminar" },
    { time: "7:30–8:00", task: "Iftar" },
    { time: "8:00–9:00", task: "Seminar + Democracy Notes" },
    { time: "9:00–10:00", task: "Coursera / Aspire" },
  ],
  Monday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–3:45", task: "Everyday Science Seminar" },
    { time: "4:00–5:00", task: "Science Review" },
    { time: "5:00–6:00", task: "Rest" },
    { time: "7:00–7:50", task: "English Composition (Live Class)" },
    { time: "8:00–9:00", task: "English Writing Practice" },
    { time: "9:00–10:00", task: "Ethical Hacking" },
  ],
  Tuesday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–3:25", task: "IT Preparation" },
    { time: "3:30–4:15", task: "IT Live Class" },
    { time: "4:15–5:00", task: "IT Notes Review" },
    { time: "5:00–6:00", task: "Rest" },
    { time: "8:00–9:00", task: "Networking Practice" },
    { time: "9:00–10:00", task: "Coursera" },
  ],
  Wednesday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–4:00", task: "Ethical Hacking" },
    { time: "4:00–5:00", task: "Assignment Work" },
    { time: "5:00–6:00", task: "Rest" },
    { time: "6:30–7:15", task: "First-Year Seminar (Live)" },
    { time: "7:30–8:00", task: "Iftar" },
    { time: "8:00–9:00", task: "Seminar Reflection" },
    { time: "9:00–10:00", task: "Aspire Course" },
  ],
  Thursday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–4:00", task: "Networking" },
    { time: "4:00–5:00", task: "Democracy Review" },
    { time: "5:00–6:00", task: "Rest" },
    { time: "8:00–9:00", task: "English Practice" },
    { time: "9:00–10:00", task: "Coursera / Assignment Completion" },
  ],
  Friday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–4:00", task: "Ethical Hacking" },
    { time: "4:00–5:00", task: "Weekly Review" },
    { time: "5:00–6:00", task: "Rest More" },
    { time: "8:00–9:00", task: "Light Reading" },
    { time: "9:00–10:00", task: "Plan Next Week" },
  ],
  Saturday: [
    { time: "1:00–2:00", task: "Mathematics" },
    { time: "2:00–3:00", task: "Part-time Job" },
    { time: "3:00–4:00", task: "Networking Practice" },
    { time: "4:00–5:00", task: "IT Practice" },
    { time: "5:00–6:00", task: "Rest" },
    { time: "8:00–9:00", task: "Coursera / Aspire" },
    { time: "9:00–10:00", task: "English Writing Speed Practice" },
  ],
};

export default function StudyDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checked, setChecked] = useState({});
  const applauseRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayName = currentTime.toLocaleDateString("en-US", { weekday: "long" });
  const todayTasks = weeklySchedule[todayName] || [];

  const totalSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
  const dayProgress = (totalSeconds / 86400) * 100;

  const toggleTask = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalTasks = todayTasks.length + morningPlan.length;
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const taskProgress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  useEffect(() => {
    if (taskProgress === 100 && applauseRef.current) {
      applauseRef.current.play();
    }
  }, [taskProgress]);

  const CircleProgress = ({ value, label, color }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${color} ${value}%, #e5e7eb ${value}% 100%)` }} />
        <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-inner">
          <span className="text-lg font-bold text-gray-700">{Math.floor(value)}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold text-gray-600">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-sky-100 p-10 text-gray-800">
      <audio ref={applauseRef} src="https://www.soundjay.com/human/applause-8.mp3" />
      <div className="max-w-4xl mx-auto space-y-14">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Weekly Study Excellence Dashboard
          </h1>
          <p className="text-xl font-light tracking-wide">{todayName} — {currentTime.toLocaleTimeString()}</p>
          <div className="flex justify-center gap-10 mt-6">
            <CircleProgress value={dayProgress} label="Day Progress" color="#8b5cf6" />
            <CircleProgress value={taskProgress} label="Task Completion" color="#ec4899" />
          </div>
        </motion.div>

        {/* MORNING ROUTINE */}
        <Card className="rounded-3xl shadow-2xl bg-white border border-pink-100">
          <CardContent className="p-10">
            <h2 className="text-4xl font-black mb-10 text-center bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Morning Momentum Ritual
            </h2>
            <div className="relative border-l-4 border-pink-300 pl-8 space-y-8">
              {morningPlan.map((item, index) => {
                const key = `Morning-${index}`;
                return (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.03 }} className="relative">
                    <div className="absolute -left-5 top-2 w-4 h-4 bg-pink-500 rounded-full shadow-lg" />
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-yellow-50 shadow-md flex justify-between items-center">
                      <div>
                        <Badge className="mb-2 bg-pink-500 text-white">{item.time}</Badge>
                        <p className={`text-lg font-semibold tracking-wide ${checked[key] ? "line-through opacity-50" : ""}`}>{item.task}</p>
                      </div>
                      <Checkbox checked={checked[key] || false} onCheckedChange={() => toggleTask(key)} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* DAILY TASK TABLE */}
        {todayTasks.length > 0 && (
          <Card className="rounded-3xl shadow-[0_30px_80px_rgba(168,85,247,0.35)] bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200">
            <CardContent className="p-10">
              <h2 className="text-4xl font-black mb-10 text-center text-purple-800">{todayName} Execution Zone</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence>
                  {todayTasks.map((item, i) => {
                    const key = `${todayName}-${i}`;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} whileHover={{ rotate: 1, scale: 1.04 }} className="p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col items-center">
                        <Badge className="mb-2 bg-purple-600 text-white">{item.time}</Badge>
                        <p className={`text-lg font-semibold tracking-wide ${checked[key] ? "line-through opacity-50" : ""}`}>{item.task}</p>
                        <Checkbox checked={checked[key] || false} onCheckedChange={() => toggleTask(key)} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
