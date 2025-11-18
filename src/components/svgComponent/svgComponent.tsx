// ConeIcon.tsx
import React, { useMemo } from 'react';
// ConeIcon.types.ts
export interface ConeIconProps {
  /**
   * El código SVG en formato string o un componente React que renderice un SVG.
   * Por ejemplo: '<svg viewBox="0 0 24 24"><path d="..."/></svg>'
   */
  svgContent?: string;
  /**
   * El color principal del cono (relleno). Puede ser un nombre de color CSS, un valor hexadecimal, RGB, etc.
   * Por defecto será 'orange'.
   */
  primaryColor?: string;
  /**
   * El color de las franjas del cono (si el SVG las define con un atributo 'fill' específico o 'stroke').
   * Por defecto será 'white'.
   */
  stripeColor?: string;
  /**
   * El ancho del icono en píxeles u otra unidad CSS.
   * Por defecto será '24px'.
   */
  width?: string;
  /**
   * La altura del icono en píxeles u otra unidad CSS.
   * Por defecto será '24px'.
   */
  height?: string;
  /**
   * Clase CSS adicional para el contenedor SVG.
   */
  className?: string;
  /**
   * Estilos CSS adicionales para el contenedor SVG.
   */
  style?: React.CSSProperties;
}
const defaultSvgContent = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
    <rect x="5" y="18" width="14" height="4" fill="white"/>
    <rect x="7" y="14" width="10" height="2" fill="white"/>
  </svg>
`;

const ConeIcon: React.FC<ConeIconProps> = ({
  svgContent = defaultSvgContent,
  primaryColor = 'var(--text-color)',
  stripeColor = 'white',
  className,
  style,
}) => {

  // Reemplaza los colores placeholder en el SVG con los colores de las props
  // Esto asume que tu SVG tiene 'currentColor' para el primaryColor
  // y 'white' (o un color específico) para las franjas que quieras reemplazar.
  const processedSvg = useMemo(() => {
    let tempSvg = svgContent;

    // Si el SVG usa fill="currentColor" para el cuerpo principal, el estilo 'color' lo manejará.
    // Para las franjas, si el SVG tiene un color específico que queremos cambiar (ej. 'white'),
    // podemos hacer un reemplazo simple.
    // Esto es muy dependiente de cómo esté construido tu SVG original.
    // Para un control más robusto, podrías tener placeholders como 'VAR_PRIMARY_COLOR' y 'VAR_STRIPE_COLOR'
    // en tu SVG y reemplazarlos aquí.
    tempSvg = tempSvg.replace(/fill="currentColor"/g, `fill="${primaryColor}"`);
    tempSvg = tempSvg.replace(/fill="white"/g, `fill="${stripeColor}"`);
    // O si usas placeholders explícitos:
    // tempSvg = tempSvg.replace(/VAR_PRIMARY_COLOR/g, primaryColor);
    // tempSvg = tempSvg.replace(/VAR_STRIPE_COLOR/g, stripeColor);

    return tempSvg;
  }, [svgContent, primaryColor, stripeColor]);

  // Si el SVG es un componente React (JSX), no uses dangerouslySetInnerHTML
  // Por simplicidad, este componente asume que es un string SVG.
  // Si necesitas manejar componentes React, la lógica sería diferente.

  return (
    <div
      className={className}
      style={{
        color: primaryColor, // Esto afectará a `fill="currentColor"` dentro del SVG
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};

export default ConeIcon;