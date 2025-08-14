"use client";

import { mockAtoms } from "../lib/chemistry/atoms";
import { Atom } from "./Atom";

export function AtomSelector() {
    return (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 h-fit rounded-2xl border-neutral-300 border-2 p-2 px-4 shadow-xl ">
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
