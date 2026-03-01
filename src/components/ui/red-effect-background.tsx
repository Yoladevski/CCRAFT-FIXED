import { cn } from '../../lib/utils';

type RedEffectBackgroundProps = React.ComponentProps<'div'>;

const RedEffectBackground = ({ className, style, ...props }: RedEffectBackgroundProps) => {
	return (
		<div
			className={cn('absolute inset-0 z-[-10] size-full', className)}
			style={{
				backgroundImage: 'url(https://api.combatcraft.co.uk/storage/v1/object/public/images/red.effect.PNG)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				opacity: 0.8,
				...style,
			}}
			{...props}
		/>
	);
};

RedEffectBackground.displayName = 'RedEffectBackground';
export { RedEffectBackground };
