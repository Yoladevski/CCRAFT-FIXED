import React from 'react';
import { cn } from '../../lib/utils';

type BGVariantType = 'dots' | 'diagonal-stripes' | 'grid' | 'horizontal-lines' | 'vertical-lines' | 'checkerboard';
type BGMaskType =
	| 'fade-center'
	| 'fade-edges'
	| 'fade-top'
	| 'fade-bottom'
	| 'fade-left'
	| 'fade-right'
	| 'fade-x'
	| 'fade-y'
	| 'none';

type BGPatternProps = React.ComponentProps<'div'> & {
	variant?: BGVariantType;
	mask?: BGMaskType;
	size?: number;
	fill?: string;
	opacity?: number;
};

const maskStyles: Record<BGMaskType, React.CSSProperties> = {
	'fade-edges': { maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 100%)' },
	'fade-center': { maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 100%)' },
	'fade-top': { maskImage: 'linear-gradient(to bottom, transparent, black)' },
	'fade-bottom': { maskImage: 'linear-gradient(to bottom, black, transparent)' },
	'fade-left': { maskImage: 'linear-gradient(to right, transparent, black)' },
	'fade-right': { maskImage: 'linear-gradient(to right, black, transparent)' },
	'fade-x': { maskImage: 'linear-gradient(to right, transparent, black, transparent)' },
	'fade-y': { maskImage: 'linear-gradient(to bottom, transparent, black, transparent)' },
	none: {},
};

function geBgImage(variant: BGVariantType, fill: string, size: number) {
	switch (variant) {
		case 'dots':
			return `radial-gradient(${fill} 1px, transparent 1px)`;
		case 'grid':
			return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
		case 'diagonal-stripes':
			return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
		case 'horizontal-lines':
			return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
		case 'vertical-lines':
			return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
		case 'checkerboard':
			return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
		default:
			return undefined;
	}
}

const BGPattern = ({
	variant = 'grid',
	mask = 'none',
	size = 24,
	fill = '#3a3a3a',
	opacity = 0.4,
	className,
	style,
	...props
}: BGPatternProps) => {
	const bgSize = `${size}px ${size}px`;
	const backgroundImage = geBgImage(variant, fill, size);

	return (
		<div
			className={cn('absolute inset-0 z-[-10] size-full', className)}
			style={{
				backgroundImage,
				backgroundSize: bgSize,
				opacity,
				...maskStyles[mask],
				...style,
			}}
			{...props}
		/>
	);
};

BGPattern.displayName = 'BGPattern';
export { BGPattern };
