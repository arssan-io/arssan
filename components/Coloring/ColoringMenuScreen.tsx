"use client";

import React from "react";
import { motion } from "framer-motion";

const imgColoringMenuScreen = "/images/coloring/background.svg";
const imgFrame352 = "/images/coloring/back-btn.svg";
const imgVector = "/images/coloring/card-bg-1.svg";
const imgGroup = "/images/coloring/thumb-fish.svg";
const imgFrame472 = "/images/coloring/card-bg-2.svg";
const imgGroup1 = "/images/coloring/thumb-flower.svg";
const imgFrame473 = "/images/coloring/card-bg-3.svg";
const imgGroup2 = "/images/coloring/thumb-butterfly.svg";
const imgFrame471 = "/images/coloring/bottom-bar.svg";

interface ColoringMenuScreenProps {
    onSelectArtwork: (artwork: "fish" | "flower" | "butterfly") => void;
}

export function ColoringMenuScreen({ onSelectArtwork }: ColoringMenuScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative size-full min-h-[852px] max-w-[393px] mx-auto bg-white overflow-hidden"
        >
            <img alt="" className="absolute block max-w-none size-full" src={imgColoringMenuScreen} />

            {/* Header */}
            <div className="absolute contents left-[24px] top-[60px]">
                <div className="absolute content-stretch flex items-center justify-between left-[24px] top-[60px] w-[345px]">
                    <div className="relative shrink-0 size-[48px]">
                        <div className="absolute inset-[-1.04%]">
                            <img alt="" className="block max-w-none size-full" src={imgFrame352} />
                        </div>
                    </div>
                    <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2d3748] text-[24px] text-right whitespace-nowrap" dir="auto">
                        معرض التلوين 🖌️
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="absolute contents inset-[15.26%_6.11%_40.14%_6.11%]">

                {/* Fish Card */}
                <button
                    onClick={() => onSelectArtwork("fish")}
                    className="absolute inset-[15.26%_51.91%_63.62%_6.11%] text-left hover:scale-105 transition-transform"
                >
                    <div className="absolute inset-0">
                        <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[10px] items-center left-[32.5px] top-[calc(50%)] w-[100px]">
                        <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
                            <div className="bg-[#fff5eb] content-stretch flex h-[80px] items-center justify-center px-[14px] py-[4px] relative rounded-[16px] shrink-0 w-full">
                                <div className="h-[70.909px] relative shrink-0 w-[65px]">
                                    <div className="absolute inset-[-0.71%_-0.77%]">
                                        <img alt="" className="block max-w-none size-full" src={imgGroup} />
                                    </div>
                                </div>
                            </div>
                            <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2d3748] text-[18px] text-center w-full" dir="auto">
                                السمكة
                            </p>
                        </div>
                        <div className="relative shrink-0 size-[24px]">
                            <img alt="" className="absolute block max-w-none size-full" src={imgFrame472} />
                        </div>
                    </div>
                </button>

                {/* Flower Card */}
                <button
                    onClick={() => onSelectArtwork("flower")}
                    className="absolute inset-[15.26%_6.11%_63.62%_51.91%] text-left hover:scale-105 transition-transform"
                >
                    <div className="absolute inset-0">
                        <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[10px] items-center left-[32.5px] top-[calc(50%)] w-[100px]">
                        <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
                            <div className="bg-[#fff5eb] content-stretch flex h-[80px] items-center justify-center px-[30px] py-[6px] relative rounded-[16px] shrink-0 w-full">
                                <div className="h-[63px] relative shrink-0 w-[38.182px]">
                                    <div className="absolute inset-[-0.79%_-1.31%]">
                                        <img alt="" className="block max-w-none size-full" src={imgGroup1} />
                                    </div>
                                </div>
                            </div>
                            <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2d3748] text-[18px] text-center w-full" dir="auto">
                                الزهرة
                            </p>
                        </div>
                        <div className="relative shrink-0 size-[24px]">
                            <img alt="" className="absolute block max-w-none size-full" src={imgFrame473} />
                        </div>
                    </div>
                </button>

                {/* Butterfly Card */}
                <button
                    onClick={() => onSelectArtwork("butterfly")}
                    className="absolute inset-[38.73%_51.91%_40.14%_6.11%] text-left hover:scale-105 transition-transform"
                >
                    <div className="absolute inset-0">
                        <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                    </div>
                    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[10px] items-center left-[32.5px] top-[calc(50%)] w-[100px]">
                        <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
                            <div className="bg-[#fff5eb] content-stretch flex h-[80px] items-center justify-center px-[27px] py-[5px] relative rounded-[16px] shrink-0 w-full">
                                <div className="h-[69px] relative shrink-0 w-[45.485px]">
                                    <div className="absolute inset-[-0.72%_-1.1%]">
                                        <img alt="" className="block max-w-none size-full" src={imgGroup2} />
                                    </div>
                                </div>
                            </div>
                            <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2d3748] text-[18px] text-center w-full" dir="auto">
                                الفراشة
                            </p>
                        </div>
                        <div className="relative shrink-0 size-[24px]">
                            <img alt="" className="absolute block max-w-none size-full" src={imgFrame471} />
                        </div>
                    </div>
                </button>

                {/* Locked Card */}
                <div className="absolute left-[204px] top-[200px] w-[165px] h-[180px]">
                    <div className="absolute bg-[#f7f9fc] border border-[#e2e8f0] border-dashed content-stretch flex h-full items-center justify-center px-[60px] py-[38px] rounded-[16px] w-full">
                        <div className="content-stretch flex flex-col gap-[34px] items-center leading-[normal] relative shrink-0 text-center w-[60px]">
                            <p className="font-['Inter'] font-normal not-italic relative shrink-0 text-[40px] tracking-tight w-full" style={{ lineHeight: 1 }}>
                                🔒
                            </p>
                            <p className="font-['Readex_Pro',sans-serif] font-bold relative shrink-0 text-[#a0aec0] text-[16px] w-full mt-2 whitespace-nowrap" dir="auto">
                                قريباً...
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
