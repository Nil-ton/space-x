'use client'
import React from "react";

export function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
      width: globalThis?.window?.innerWidth,
      height: globalThis?.window?.innerHeight,
    });
  
    React.useEffect(() => {
      // Função de callback para atualizar o tamanho da janela
      function handleResize() {
        setWindowSize({
          width: globalThis?.window?.innerWidth,
          height: globalThis?.window?.innerHeight,
        });
      }
  
      // Adiciona um ouvinte de redimensionamento à janela
      globalThis?.window?.addEventListener('resize', handleResize);
  
      // Remove o ouvinte de redimensionamento quando o componente é desmontado
      return () => {
        globalThis?.window?.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowSize;
  }