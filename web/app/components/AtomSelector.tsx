"use client";

import { mockAtoms } from "../lib/chemistry/atoms";
import { Atom } from "./Atom";

export function AtomSelector() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end w-fit gap-4 h-fit rounded-2xl border-neutral-300 border-2 p-2 px-4 shadow-xl bg-background/90 backdrop-blur">
            <ul className="flex items-center justify-center gap-3">
                {mockAtoms.map((atom) => (
                    <li key={atom.symbol}>
                        <Atom
                            symbol={atom.symbol}
                            color={atom.color}
                            name={atom.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
