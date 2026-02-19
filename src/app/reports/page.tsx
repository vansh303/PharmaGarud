"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const mockReport = {
    patient: "PG-8829-X",
    date: "2024-05-20",
    genotypes: [
        { gene: "CYP2C19", genotype: "*1/*17", phenotype: "Rapid Metabolizer", status: "actionable" },
        { gene: "CYP2D6", genotype: "*4/*4", phenotype: "Poor Metabolizer", status: "critical" },
        { gene: "DPYD", genotype: "*1/*1", phenotype: "Normal Metabolizer", status: "normal" },
        { gene: "SLCO1B1", genotype: "*5/*5", phenotype: "Low Function", status: "warning" },
    ],
    recommendations: [
        {
            drug: "Clopidogrel",
            gene: "CYP2C19",
            recommendation: "Standard dosing is recommended. Patient is a rapid metabolizer but still shows adequate active metabolite formation.",
            level: "A",
            source: "CPIC"
        },
        {
            drug: "Codeine",
            gene: "CYP2D6",
            recommendation: "AVOID USE. Genetic variation leads to lack of efficacy. Choose alternative analgesic such as morphine or non-opioid.",
            level: "A",
            source: "CPIC"
        },
        {
            drug: "Simvastatin",
            gene: "SLCO1B1",
            recommendation: "Limit dose to 20mg/day or consider alternative statin (e.g., Rosuvastatin) due to increased risk of myopathy.",
            level: "B",
            source: "DPWG"
        }
    ]
};

export default function ReportsPage() {
    return (
        /* BACKGROUND CHANGED TO DARK GREY AS PER IMAGE_98AE42.JPG */
        <main className="min-h-screen bg-[#1a1a1a] pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <Navbar />

            {/* NEON AURA EFFECT - MATCHING THE DNA PARTICLES COLORS */}
            {/* Blue Glow */}
            <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-neon-blue/20 blur-[130px] rounded-full pointer-events-none animate-pulse" />
            {/* Red/Pink Glow as seen in DNA Spline */}
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#ff0055]/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-bold font-outfit mb-2 text-white">Clinical PGx Report</h1>
                        <p className="text-zinc-400">Patient ID: <span className="text-neon-blue font-mono">{mockReport.patient}</span> | Generated: {mockReport.date}</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-xl glass hover:bg-white/10 transition-colors border-white/10 text-white">Download PDF</button>
                        <button className="px-6 py-2 rounded-xl bg-neon-blue text-black font-bold hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all">Share Results</button>
                    </div>
                </header>

                {/* Genotype Summary */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold font-outfit mb-6 flex items-center gap-3 text-white">
                        <span className="w-1 h-8 bg-neon-blue rounded-full shadow-[0_0_15px_#00f2ff]" />
                        Genotype Summary
                    </h2>
                    {/* Glassmorphism card for the table */}
                    <div className="glass bg-white/5 backdrop-blur-xl rounded-[32px] overflow-hidden border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400">Gene</th>
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400">Genotype</th>
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400">Phenotype</th>
                                    <th className="px-8 py-5 font-outfit font-bold text-zinc-400 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockReport.genotypes.map((item, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={item.gene}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-8 py-6 font-bold text-lg text-white">{item.gene}</td>
                                        <td className="px-8 py-6 font-mono text-neon-blue">{item.genotype}</td>
                                        <td className="px-8 py-6 text-zinc-300">{item.phenotype}</td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                item.status === 'critical' ? 'bg-risk-red/20 text-risk-red border border-risk-red/30' :
                                                item.status === 'warning' ? 'bg-risk-amber/20 text-risk-amber border border-risk-amber/30' :
                                                item.status === 'actionable' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30' :
                                                'bg-risk-green/20 text-risk-green border border-risk-green/30'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Recommendations */}
                <section>
                    <h2 className="text-2xl font-bold font-outfit mb-6 flex items-center gap-3 text-white">
                        <span className="w-1 h-8 bg-neon-purple rounded-full shadow-[0_0_15px_#9d00ff]" />
                        Clinical Recommendations
                    </h2>
                    <div className="grid gap-6">
                        {mockReport.recommendations.map((rec, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                key={rec.drug}
                                className="glass bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border-white/5 relative overflow-hidden group hover:border-white/20 transition-all shadow-2xl"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            💊
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-outfit text-white">{rec.drug}</h3>
                                            <p className="text-zinc-500 text-sm">Associated Gene: <span className="text-neon-blue">{rec.gene}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="px-4 py-1.5 rounded-full bg-white/5 text-zinc-400 text-xs font-bold border border-white/10 uppercase">
                                            Level: {rec.level}
                                        </span>
                                        <span className="px-4 py-1.5 rounded-full bg-neon-purple/20 text-neon-purple text-xs font-bold border border-neon-purple/30 uppercase">
                                            Source: {rec.source}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-zinc-300 leading-relaxed text-lg">
                                    {rec.recommendation}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}