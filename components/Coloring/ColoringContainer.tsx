"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ColoringMenuScreen } from "./ColoringMenuScreen";
import { ColoringCanvas } from "./ColoringCanvas";

type ScreenState = "menu" | "flower" | "fish" | "butterfly";

export function ColoringContainer() {
    const [screen, setScreen] = useState<ScreenState>("menu");

    return (
        <div className="relative w-full h-full bg-white overflow-hidden">
            <AnimatePresence mode="wait">
                {screen === "menu" ? (
                    <ColoringMenuScreen key="menu" onSelectArtwork={setScreen} />
                ) : (
                    <ColoringCanvas
                        key="canvas"
                        artwork={screen}
                        onBack={() => setScreen("menu")}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
