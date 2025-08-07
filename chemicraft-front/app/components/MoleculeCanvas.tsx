'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useMoleculeBuilder } from '@/app/hooks/useMoleculeBuilder';
import { getAtomData } from '@/lib/atomData';
import Atom from './Atom';
import { cn } from '@/libs/utils';

interface MoleculeCanvasProps {
    className?: string;
}

interface DragState {
    isDragging: boolean;
    draggedAtomId: string | null;
    offset: { x: number; y: number };
}

const MoleculeCanvas: React.FC<MoleculeCanvasProps> = ({ className }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [dragState, setDragState] = useState<DragState>({
        isDragging: false,
        draggedAtomId: null,
        offset: { x: 0, y: 0 }
    });

    const {
        atoms,
        bonds,
        selectedAtomId,
        addAtom,
        removeAtom,
        moveAtom,
        selectAtom,
        createBond,
        findNearbyAtoms,
        areAtomsClose
    } = useMoleculeBuilder();

    // Converter coordenadas do mouse para coordenadas do canvas
    const getCanvasCoordinates = useCallback((clientX: number, clientY: number) => {
        if (!canvasRef.current) return { x: 0, y: 0 };

        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }, []);

    // Handle drop de átomos do AtomSelector
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();

        const atomSymbol = e.dataTransfer.getData('atom-symbol');
        if (!atomSymbol) return;

        const atomData = getAtomData(atomSymbol);
        if (!atomData) return;

        const dropPosition = getCanvasCoordinates(e.clientX, e.clientY);
        const newAtomId = addAtom(atomData, dropPosition);

        // Verificar se há átomos próximos para criar ligações automáticas
        const nearbyAtoms = findNearbyAtoms(dropPosition, 80);
        nearbyAtoms.forEach(nearbyAtom => {
            if (nearbyAtom.id !== newAtomId && nearbyAtom.availableValence > 0) {
                // Tentar criar ligação simples
                createBond(newAtomId, nearbyAtom.id, 'single');
            }
        });
    }, [addAtom, findNearbyAtoms, createBond, getCanvasCoordinates]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    // Handle drag de átomos existentes no canvas
    const handleAtomMouseDown = useCallback((e: React.MouseEvent, atomId: string) => {
        e.preventDefault();
        const atom = atoms.find(a => a.id === atomId);
        if (!atom) return;

        const canvasCoords = getCanvasCoordinates(e.clientX, e.clientY);
        const offset = {
            x: canvasCoords.x - atom.position.x,
            y: canvasCoords.y - atom.position.y
        };

        setDragState({
            isDragging: true,
            draggedAtomId: atomId,
            offset
        });

        selectAtom(atomId);
    }, [atoms, getCanvasCoordinates, selectAtom]);

    // Handle mouse move para arrastar átomos
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!dragState.isDragging || !dragState.draggedAtomId) return;

        const canvasCoords = getCanvasCoordinates(e.clientX, e.clientY);
        const newPosition = {
            x: canvasCoords.x - dragState.offset.x,
            y: canvasCoords.y - dragState.offset.y
        };

        moveAtom(dragState.draggedAtomId, newPosition);
    }, [dragState, moveAtom, getCanvasCoordinates]);

    // Handle mouse up para finalizar drag
    const handleMouseUp = useCallback(() => {
        if (!dragState.isDragging || !dragState.draggedAtomId) return;

        // Verificar proximidade com outros átomos para criar ligações
        const draggedAtom = atoms.find(a => a.id === dragState.draggedAtomId);
        if (draggedAtom) {
            const nearbyAtoms = findNearbyAtoms(draggedAtom.position, 80);
            nearbyAtoms.forEach(nearbyAtom => {
                if (nearbyAtom.id !== dragState.draggedAtomId &&
                    nearbyAtom.availableValence > 0 &&
                    draggedAtom.availableValence > 0 &&
                    !areAtomsClose(dragState.draggedAtomId!, nearbyAtom.id)) {
                    createBond(dragState.draggedAtomId!, nearbyAtom.id, 'single');
                }
            });
        }

        setDragState({
            isDragging: false,
            draggedAtomId: null,
            offset: { x: 0, y: 0 }
        });
    }, [dragState, atoms, findNearbyAtoms, createBond, areAtomsClose]);

    // Handle double click para remover átomo
    const handleAtomDoubleClick = useCallback((atomId: string) => {
        removeAtom(atomId);
    }, [removeAtom]);

    // Handle click no canvas vazio para deselecionar
    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
        if (e.target === canvasRef.current) {
            selectAtom(null);
        }
    }, [selectAtom]);

    // Renderizar linha de ligação entre dois átomos
    const renderBond = useCallback((bond: { id: string; atom1Id: string; atom2Id: string; type: 'single' | 'double' | 'triple' }) => {
        const atom1 = atoms.find(a => a.id === bond.atom1Id);
        const atom2 = atoms.find(a => a.id === bond.atom2Id);

        if (!atom1 || !atom2) return null;

        const strokeWidth = bond.type === 'single' ? 2 : bond.type === 'double' ? 4 : 6;
        const strokeColor = '#374151';

        return (
            <line
                key={bond.id}
                x1={atom1.position.x + 24} // Offset para centro do átomo (size/2)
                y1={atom1.position.y + 24}
                x2={atom2.position.x + 24}
                y2={atom2.position.y + 24}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        );
    }, [atoms]);

    return (
        <div
            ref={canvasRef}
            className={cn(
                "relative w-full h-screen min-h-[500px] bg-gray-50 border-2 border-dashed border-gray-300",
                "transition-colors duration-200",
                "hover:border-gray-400 hover:bg-gray-100",
                className
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleCanvasClick}
        >
            {/* SVG para renderizar ligações */}
            {bonds.length > 0 && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                >
                    {bonds.map(renderBond)}
                </svg>
            )}

            {/* Renderizar átomos */}
            {atoms.map((atom) => (
                <div
                    key={atom.id}
                    className="absolute"
                    style={{
                        left: atom.position.x,
                        top: atom.position.y,
                        zIndex: selectedAtomId === atom.id ? 10 : 2
                    }}
                    onMouseDown={(e) => handleAtomMouseDown(e, atom.id)}
                    onDoubleClick={() => handleAtomDoubleClick(atom.id)}
                >
                    <Atom
                        atomData={atom.atomData}
                        size={48}
                        className={cn(
                            "cursor-move transition-all duration-200",
                            selectedAtomId === atom.id && "ring-2 ring-blue-500 ring-offset-2",
                            dragState.draggedAtomId === atom.id && "scale-110 shadow-xl",
                            atom.availableValence === 0 && "opacity-80"
                        )}
                    >
                        {/* Indicador de valência disponível */}
                        {atom.availableValence > 0 && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                {atom.availableValence}
                            </div>
                        )}
                    </Atom>
                </div>
            ))}

            {/* Indicador de área de drop */}
            {atoms.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-gray-400 text-center">
                        <div className="text-2xl mb-2">🧪</div>
                        <div className="text-lg font-medium">Área de Construção Molecular</div>
                        <div className="text-sm">Arraste átomos aqui para construir moléculas</div>
                    </div>
                </div>
            )}

            {/* Informações de debug (opcional) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
                    <div>Átomos: {atoms.length}</div>
                    <div>Ligações: {bonds.length}</div>
                    {selectedAtomId && <div>Selecionado: {selectedAtomId}</div>}
                </div>
            )}
        </div>
    );
};

export default MoleculeCanvas;