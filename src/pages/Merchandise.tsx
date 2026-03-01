import BackButton from '../components/BackButton';

interface MerchandiseProps {
  onBack: () => void;
}

const products = [
  {
    id: 1,
    name: 'COMBATCRAFT Premium Beanie',
    price: 24.99,
    image: 'https://i.postimg.cc/c4hfk817/editor-front-embroidery.jpg',
    description: 'Premium embroidered beanie featuring the COMBATCRAFT logo. Perfect for training sessions or casual wear. High-quality fabric keeps you warm and comfortable.'
  },
  {
    id: 2,
    name: 'COMBATCRAFT Classic Beanie',
    price: 22.99,
    image: 'https://i.postimg.cc/7ZQ0w82q/editor-front-embroidery.jpg',
    description: 'Classic embroidered beanie with sleek COMBATCRAFT branding. Comfortable fit with durable construction. Ideal for any weather condition.'
  }
];

export default function Merchandise({ onBack }: MerchandiseProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white relative">
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: 'url(https://api.combatcraft.co.uk/storage/v1/object/public/images/runnn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <BackButton onClick={onBack} />

        <div className="text-center mb-8 sm:mb-12 mt-8">
          <h1
            className="cc-outline-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-wide"
          >
            MERCHANDISE
          </h1>
          <div className="w-24 h-1 bg-[#B11226] mx-auto mb-6" />
          <p className="text-[#A0A0A0] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            Official COMBATCRAFT gear. Represent the grind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg overflow-hidden transition-all transform hover:scale-105"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <div className="aspect-square w-full overflow-hidden bg-[#0E0E0E]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="cc-outline-text text-lg sm:text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-[#A0A0A0] text-sm sm:text-base mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-[#B11226]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    className="button-text bg-[#B11226] text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#8B0E1C] transition-all text-sm sm:text-base"
                  >
                    COMING SOON
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12 sm:mt-16 bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-6 sm:p-8 max-w-3xl mx-auto text-center"
          style={{
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
          }}
        >
          <div className="w-16 h-16 mx-auto bg-[#B11226]/20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[#B11226]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2
            className="cc-outline-text text-xl sm:text-2xl font-bold mb-3"
          >
            STORE OPENING SOON
          </h2>
          <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
            We're finalizing our store setup. Products will be available for purchase soon. Sign up to get notified when we launch.
          </p>
        </div>
      </div>
    </div>
  );
}
