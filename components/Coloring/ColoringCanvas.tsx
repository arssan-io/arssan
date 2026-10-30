"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imgBackground = "/images/coloring/background.svg";
const imgBackBtn = "/images/coloring/back-btn.svg";
const imgDoneBtn = "/images/coloring/done-btn.svg";
const imgUndoBtn = "/images/coloring/undo-btn.svg";
const imgCanvasBg = "/images/coloring/canvas-bg.svg";
const imgFooterBg = "/images/coloring/footer-bg.svg";
const imgColors = "/images/coloring/colors-palette.svg";
const imgBottomBar = "/images/coloring/bottom-bar.svg";

// Artwork Assets
const imgFlower = "/images/coloring/artwork-flower.svg";
const imgFish = "/images/coloring/artwork-fish.svg";
const imgButterfly = "/images/coloring/artwork-butterfly.svg";

// Success dialog assets
const imgOverlay = "/images/coloring/overlay.svg";
const imgDialogBg = "/images/coloring/dialog-bg.svg";
const imgDialogInner = "/images/coloring/dialog-inner.svg";
const imgStarsBg = "/images/coloring/stars-bg.svg";
const imgPaletteIcon = "/images/coloring/palette-icon.svg";
const imgSparkleIcon = "/images/coloring/sparkle-icon.svg";
const imgStar1 = "/images/coloring/star1.svg";
const imgStar2 = "/images/coloring/star2.svg";
const imgStar3 = "/images/coloring/star3.svg";

interface ColoringCanvasProps {
    artwork: "flower" | "fish" | "butterfly";
    onBack: () => void;
}

export function ColoringCanvas({ artwork, onBack }: ColoringCanvasProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    const getArtworkProps = () => {
        switch (artwork) {
            case "flower":
                return { src: imgFlower, w: "120px", h: "198px", className: "" };
            case "fish":
                return { src: imgFish, w: "264px", h: "288px", className: "" };
            case "butterfly":
                return { src: imgButterfly, w: "165.289px", h: "250.74px", className: "" };
        }
    };

    const currentArtwork = getArtworkProps();

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="relative size-full min-h-[852px] max-w-[393px] mx-auto bg-white overflow-hidden"
        >
            {/* Background */}
            <img alt="" className="absolute block max-w-none size-full pointer-events-none" src={imgBackground} />

            {/* Header */}
            <div className="absolute contents left-[24px] top-[60px] z-10">
                <div className="absolute content-stretch flex items-center justify-between left-[24px] top-[60px] w-[354px]">
                    <div className="content-stretch flex items-center relative shrink-0 cursor-pointer group" onClick={onBack}>
                        <div className="relative shrink-0 size-[48px] mr-3 group-hover:scale-105 transition-transform">
                            <div className="absolute inset-[-1.04%]">
                                <img alt="" className="block max-w-none size-full" src={imgBackBtn} />
                            </div>
                        </div>
                        <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#2d3748] text-[20px] text-center whitespace-nowrap" dir="auto">
                            وقت التلوين 🎨
                        </p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-[104px] gap-2">
                            <button onClick={() => setIsSuccess(true)} className="relative shrink-0 size-[48px] hover:scale-105 transition-transform group" title="إنهاء">
                                <div className="absolute inset-[-1.04%]">
                                    <img alt="" className="block max-w-none size-full" src={imgDoneBtn} />
                                </div>
                            </button>
                            <button className="relative shrink-0 size-[48px] hover:scale-105 active:scale-95 transition-transform" title="تراجع">
                                <img alt="" className="absolute block max-w-none size-full" src={imgUndoBtn} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="absolute contents inset-[15.26%_6.11%_28.4%_6.11%] z-0">
                <div className="absolute inset-[15.26%_6.11%_28.4%_6.11%] pointer-events-none">
                    <img alt="" className="absolute block max-w-none size-full" src={imgCanvasBg} />
                </div>
                <div className="absolute bg-white border-2 border-[rgba(244,162,97,0.3)] border-solid content-stretch flex h-[480px] items-center justify-center left-[24px] px-[27px] py-[76px] rounded-[16px] top-[130px] w-[345px]">
                    <div style={{ width: currentArtwork.w, height: currentArtwork.h }} className="relative shrink-0">
                        <div className="absolute inset-[-2%]">
                            <img alt="" className="block max-w-none size-full" src={currentArtwork.src} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Color Palette Footer */}
            <div className="absolute contents inset-[78.64%_0_0_0] z-10">
                <div className="absolute inset-[78.64%_0_0_0] pointer-events-none">
                    <img alt="" className="absolute block max-w-none size-full" src={imgFooterBg} />
                </div>
                <p className="absolute font-['Readex_Pro',sans-serif] font-bold inset-[80.52%_38.17%_16.78%_38.17%] leading-[normal] text-[#2d3748] text-[18px] text-center whitespace-nowrap" dir="auto">
                    اختر لوناً 🎨
                </p>
                <div className="-translate-x-1/2 absolute bottom-[7.39%] left-[calc(50%+0.5px)] top-[85.09%] w-[346px] cursor-pointer hover:scale-[1.02] transition-transform">
                    <div className="absolute inset-[-3.13%_-0.29%_-3.13%_-0.58%]">
                        <img alt="" className="block max-w-none size-full" src={imgColors} />
                    </div>
                </div>
                <div className="-translate-x-1/2 absolute bottom-[0.82%] left-[calc(50%+0.5px)] top-[98.59%] w-[140px] pointer-events-none">
                    <img alt="" className="absolute block max-w-none size-full" src={imgBottomBar} />
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                        {/* Modal Image Background */}
                        <div className="absolute inset-0 pointer-events-none">
                            <img alt="" className="absolute block max-w-none size-full" src={imgOverlay} />
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-[345px] h-[400px] mt-[110px]"
                        >
                            <img alt="" className="absolute block max-w-none size-full pointer-events-none" src={imgDialogBg} />
                            <div className="absolute inset-[13.15%_6.11%_40.38%_7.12%] pointer-events-none">
                                <img alt="" className="block max-w-none size-full" src={imgDialogInner} />
                            </div>

                            {/* Dialog Content */}
                            <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[20px] items-center left-[50px] top-[calc(50%-100px)] w-[248px]">
                                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                                    <div className="col-1 h-[102.5px] ml-[7.63px] mt-[15.5px] relative row-1 w-[112.732px]">
                                        <img alt="" className="absolute block max-w-none size-full" src={imgStarsBg} />
                                    </div>
                                    <div className="col-1 h-[60px] ml-[24px] mt-[28px] relative row-1 w-[80px]">
                                        <img alt="" className="block max-w-none size-full" src={imgPaletteIcon} />
                                    </div>
                                    <div className="col-1 h-[20px] ml-[34px] mt-[88px] relative row-1 w-[60px]">
                                        <img alt="" className="block max-w-none size-full" src={imgSparkleIcon} />
                                    </div>
                                    <div className="col-1 ml-[49px] mt-[43px] relative row-1 size-[30px]">
                                        <img alt="" className="absolute block max-w-none size-full" src={imgStar1} />
                                    </div>
                                    <div className="col-1 ml-[39px] mt-[63px] relative row-1 size-[20px]">
                                        <img alt="" className="absolute block max-w-none size-full" src={imgStar2} />
                                    </div>
                                    <div className="col-1 ml-[69px] mt-[63px] relative row-1 size-[20px]">
                                        <img alt="" className="absolute block max-w-none size-full" src={imgStar3} />
                                    </div>
                                    <p className="col-1 font-['Inter',sans-serif] font-normal leading-[normal] ml-[100px] mt-0 not-italic relative row-1 text-[28px] text-center whitespace-nowrap">✨</p>
                                    <p className="col-1 font-['Inter',sans-serif] font-normal leading-[normal] ml-0 mt-[70px] not-italic relative row-1 text-[28px] text-center whitespace-nowrap">🎨</p>
                                </div>

                                <div className="content-stretch flex flex-col gap-[8px] items-center leading-[normal] relative shrink-0 text-center w-full mt-4">
                                    <p className="font-['Readex_Pro',sans-serif] font-bold relative shrink-0 text-[#2d3748] text-[24px] w-full" dir="auto">
                                        لوحة فنية رائعة! 😍
                                    </p>
                                    <p className="font-['Readex_Pro',sans-serif] font-normal relative shrink-0 text-[#a0aec0] text-[15px] w-full" dir="auto">
                                        تم حفظ رسمتك في المعرض
                                    </p>
                                </div>

                                <div className="bg-[#e6fffa] content-stretch flex items-center justify-center px-[23px] py-[9px] relative rounded-[39px] shrink-0 mt-2">
                                    <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#38b2ac] text-[16px] text-center whitespace-nowrap" dir="auto">
                                        +20 نقطة
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute flex flex-col gap-[18px] items-center left-[24px] top-[410px] w-[297px]">
                                <button onClick={onBack} className="bg-[#f4a261] hover:bg-[#eb924a] active:scale-95 transition-all flex h-[56px] items-center justify-center px-[60px] py-[17px] relative rounded-[52px] shrink-0 w-full shadow-md">
                                    <p className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[18px] text-center text-white whitespace-nowrap" dir="auto">
                                        العودة للرئيسية 🏠
                                    </p>
                                </button>
                                <button onClick={() => setIsSuccess(false)} className="font-['Readex_Pro',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-center text-white hover:text-[#f4a261] transition-colors w-full" dir="auto">
                                    تلوين رسمة أخرى
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}
