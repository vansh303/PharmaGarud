"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import FileScanner from "../components/FileScanner";
import DrugInput from "../components/DrugInput";

// 1. NAYA WOW FACTOR: Cipher Text Component (Matrix Effect)
const CipherText = ({ text }: { text: string }) => {
    const letters = "ACGTX10@#$%&^*";
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let iteration = 0;
        let interval = setInterval(() => {
            setDisplayText(
                text.split("")
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3; // Speed of decryption
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span className="font-mono">{displayText}</span>;
};

// 2. Hacker Terminal Component
const JsonTerminal = ({ data }: { data: any }) => (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto mt-12 rounded-xl overflow-hidden border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] backdrop-blur-md bg-black/80 text-left relative"
    >
        {/* Glowing Edge Effect based on Risk */}
        <div className={`absolute top-0 left-0 w-full h-1 ${data.risk_assessment.status === 'Toxic' ? 'bg-risk-red shadow-[0_0_20px_#FF003C]' : 'bg-risk-green shadow-[0_0_20px_#00FF66]'}`}></div>

        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/10">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="ml-4 text-xs font-mono text-zinc-400">root@pharmaguard:~/analysis_result</p>
            </div>
            
            {/* Decrypting Status Badge */}
            <div className={`px-3 py-1 rounded-sm text-xs font-bold font-mono tracking-widest ${data.risk_assessment.status === 'Toxic' ? 'bg-risk-red/20 text-risk-red border border-risk-red' : 'bg-risk-green/20 text-risk-green border border-risk-green'}`}>
                STATUS: <CipherText text={data.risk_assessment.status.toUpperCase()} />
            </div>
        </div>

        <div className="p-6 overflow-x-auto text-sm font-mono text-neon-cyan bg-black max-h-[400px] overflow-y-auto">
            <p className="text-zinc-500 mb-4">// DECRYPTING GENOMIC SEQUENCE FOR: <strong className="text-white"><CipherText text={data.drug_analyzed} /></strong></p>
            <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
    </motion.div>
);

export default function AnalyzePage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [resultData, setResultData] = useState<any>(null); 

    const handleAnalysisClick = async () => {
        setIsAnalyzing(true);
        setResultData(null); 

        // Fake API Delay (Voice hata diya gaya hai)
        setTimeout(() => {
            setIsAnalyzing(false);
            
            const mockResponse = {
                "patient_id": "VCF-9942",
                "drug_analyzed": "Warfarin",
                "gene_profile": {
                    "CYP2C9": "*2/*3 (Poor Metabolizer)",
                    "VKORC1": "-1639G>A (High Sensitivity)"
                },
                "risk_assessment": {
                    "status": "Toxic",
                    "clinical_recommendation": "High risk of bleeding. Consider alternative therapy or reduce starting dose by 50-70%."
                },
                "llm_explanation": "The presence of CYP2C9 *2/*3 indicates severely reduced enzyme activity..."
            };

            setResultData(mockResponse); 
        }, 2500);
    };

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8 relative overflow-hidden text-center">
            <Navbar />
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-neon-blue/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                    <h1 className="text-5xl font-bold font-outfit mb-6 neon-text">Sequence Analysis</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Upload your genomic data and specify target medications to receive a comprehensive clinical report.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col h-full">
                        <div className="flex-1 glass p-10 rounded-[40px] border-white/5 flex flex-col items-center justify-center group hover:border-neon-blue/30 transition-all">
                            <div className="w-20 h-20 rounded-3xl bg-neon-blue/20 flex items-center justify-center text-4xl mb-8">📂</div>
                            <h2 className="text-2xl font-bold mb-4 font-outfit">Upload VCF/GVCF</h2>
                            <FileScanner />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col h-full">
                        <div className="flex-1 glass p-10 rounded-[40px] border-white/5 flex flex-col items-center justify-center group hover:border-neon-purple/30 transition-all">
                            <div className="w-20 h-20 rounded-3xl bg-neon-purple/20 flex items-center justify-center text-4xl mb-8">💊</div>
                            <h2 className="text-2xl font-bold mb-4 font-outfit">Target Medications</h2>
                            <DrugInput />
                        </div>
                    </motion.div>
                </div>

                <motion.button
                    onClick={handleAnalysisClick}
                    disabled={isAnalyzing}
                    className={`glass p-1 text-center inline-block rounded-full px-12 py-5 bg-white/5 border-white/10 hover:bg-neon-blue hover:text-black transition-all group cursor-pointer ${isAnalyzing ? 'opacity-50 cursor-not-allowed border-neon-cyan animate-pulse' : ''}`}
                >
                    <span className="text-xl font-bold font-outfit flex items-center gap-3">
                        {isAnalyzing ? "[■■■□] Running Pharmacogenomic Analysis..." : "Initiate AI Analysis"}
                    </span>
                </motion.button>

                {/* Yahan Result aur Cipher Effect Render Hoga */}
                {resultData && (
                    <JsonTerminal data={resultData} />
                )}

            </div>
        </main>
    );
}