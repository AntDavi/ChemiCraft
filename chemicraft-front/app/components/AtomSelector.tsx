'use client'

import React from 'react'
import { Dock, DockIcon } from './ui/dock'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { ATOM_LIST, getAtomData } from '@/lib/atomData'
import Atom from './Atom'

function AtomSelector() {
    const handleAtomDragStart = (e: React.DragEvent, atomSymbol: string) => {
        e.dataTransfer.setData('atom-symbol', atomSymbol);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className="absolute bottom-10 left-0 w-full h-24 z-10">
            <Dock direction='middle' className="px-8 py-3 h-full gap-3">
                {ATOM_LIST.map((atomSymbol) => {
                    const atomData = getAtomData(atomSymbol);
                    if (!atomData) return null;

                    return (
                        <DockIcon key={atomSymbol} className=''>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <Atom
                                            atomData={atomData}
                                            size={48}
                                            draggable={true}
                                            onDragStart={(e) => handleAtomDragStart(e, atomSymbol)}
                                            className="shadow-lg hover:shadow-xl"
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border border-gray-700">
                                    <div className="text-center">
                                        <div className="font-semibold text-sm">{atomData.name}</div>
                                        <div className="text-xs text-gray-300">
                                            Símbolo: {atomData.symbol}
                                        </div>
                                        <div className="text-xs text-gray-300">
                                            Valência: {atomData.valence}
                                        </div>
                                        <div className="text-xs text-gray-300">
                                            Número Atômico: {atomData.atomicNumber}
                                        </div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    );
                })}
            </Dock>
        </div>
    )
}

export default AtomSelector