"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const imgFlowerColoringScreen = "http://localhost:3845/assets/fb016ddbfa2c32d92d73001f4d55875af510c7da.svg";
const imgFrame352 = "http://localhost:3845/assets/e48e90ca4e6460e31cbc48e16e0f7dce5bd92938.svg";
const imgFrame447 = "http://localhost:3845/assets/d13d56d22bbb0a76dfbd9077a0b5d1294cf7d1f1.svg";
const imgFrame446 = "http://localhost:3845/assets/ebbf84e4a8434135aa4637cd04aadece635a4e00.svg";
const imgVector = "http://localhost:3845/assets/5094119d8fb0b6ae1bc648812fa5bd03769c86a1.svg";
const imgGroup = "http://localhost:3845/assets/750c03b62d603d95608245c3886e594730aca350.svg";
const imgVector1 = "http://localhost:3845/assets/fea384c7bec9a63e6258e74f894b04173577734d.svg";
const imgGroup1 = "http://localhost:3845/assets/db2a40324c6c408c032d0edd389b692bb8089376.svg";
const imgVector2 = "http://localhost:3845/assets/ee1309df1d00169bdc83b7a37dbf6141768ad38e.svg";

interface FlowerColoringScreenProps {
    onBack: () => void;
    onSuccess: () => void;
}

export function FlowerColoringScreen({ onBack, onSuccess }: FlowerColoringScreenProps) {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="relative size-full min-h-[852px] max-w-[393px] mx-auto bg-white overflow-hidden"
        >
            <img alt="" className="absolute block max-w-none size-full" src={imgFlowerColoringScreen} />

            {/* Header */}
            <div className="absolute contents left-[24px] top-[60px]">
                <div className="absolute content-stretch flex items-center justify-between left-[24px] top-[60px] w-[354px]">
                    <div className="content-stretch flex gap-[47px] items-center relative shrink-0 cursor-pointer" onClick={onBack}>
                        <div className="relative shrink-0 size-[48px]">
                            <div className="absolute inset-[-1.04%]">
                                <img alt="" className="block max-w-none size-full" src={imgFrame352} />
                            </div>
                        </div>
                        <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2d3748] text-[20px] text-center whitespace-nowrap" dir="auto">
                            وقت التلوين 🎨
                        </p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-[104px] gap-2">
                            <button onClick={onSuccess} className="relative shrink-0 size-[48px] hover:scale-105 transition-transform" title="Finish Coloring">
                                <div className="absolute inset-[-1.04%]">
                                    <img alt="" className="block max-w-none size-full" src={imgFrame447} />
                                </div>
                            </button>
                            <button className="relative shrink-0 size-[48px] hover:scale-105 transition-transform" title="Undo">
                                <img alt="" className="absolute block max-w-none size-full" src={imgFrame446} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="absolute contents inset-[15.26%_6.11%_28.4%_6.11%]">
                <div className="absolute inset-[15.26%_6.11%_28.4%_6.11%]">
                    <img alt="" className="absolute block max-w-none size-full" src={imgVector} />
                </div>
                <div className="absolute bg-white border-2 border-[rgba(244,162,97,0.3)] border-solid content-stretch flex h-[480px] items-center justify-center left-[24px] px-[27px] py-[76px] rounded-[16px] top-[130px] w-[345px]">
                    <div className="h-[198px] relative shrink-0 w-[120px]">
                        <div className="absolute inset-[-1.82%_-3%]">
                            <img alt="" className="block max-w-none size-full" src={imgGroup} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Color Palette Footer */}
            <div className="absolute contents inset-[78.64%_0_0_0]">
                <div className="absolute inset-[78.64%_0_0_0]">
                    <img alt="" className="absolute block max-w-none size-full" src={imgVector1} />
                </div>
                <p className="absolute font-['Readex_Pro',sans-serif] font-bold inset-[80.52%_38.17%_16.78%_38.17%] leading-[normal] text-[#2d3748] text-[18px] text-center whitespace-nowrap" dir="auto">
                    اختر لوناً 🎨
                </p>
                <div className="-translate-x-1/2 absolute bottom-[7.39%] left-[calc(50%+0.5px)] top-[85.09%] w-[346px]">
                    <div className="absolute inset-[-3.13%_-0.29%_-3.13%_-0.58%]">
                        <img alt="" className="block max-w-none size-full" src={imgGroup1} />
                    </div>
                </div>
                <div className="-translate-x-1/2 absolute bottom-[0.82%] left-[calc(50%+0.5px)] top-[98.59%] w-[140px]">
                    <img alt="" className="absolute block max-w-none size-full" src={imgVector2} />
                </div>
            </div>
        </motion.div>
    );
}
