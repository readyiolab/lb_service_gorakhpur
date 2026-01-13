import { Phone, MessageCircle, ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Flash Banner */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-center">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base font-bold">
              Limited Time Offer: Starting Price ₹99 | Visiting Charge ₹99
            </span>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Professional home services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
        <div className="max-w-2xl">
          <span className="inline-block bg-orange-600/30 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-orange-500/40">
            #1 Trusted Home Services in Gorakhpur
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Fast & Reliable{" "}
            <span className="text-orange-500">Home Services</span>{" "}
            at Your Doorstep
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Professional technicians for AC repair, plumbing, electrical work, interior design, cleaning & more. Book trusted home services in Gorakhpur within 60 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a 
              href="tel:+919918012227" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call Now
            </a>
            <a 
              href="https://wa.me/919918012227" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white/40 text-white rounded-md font-medium hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              WhatsApp Us
            </a>
            <a 
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Get Free Estimate
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-10 text-gray-300 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
              <span>Verified Technicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
              <span>Service Warranty</span>
            </div>
          </div>

          {/* Offer Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12 bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/20">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-1">₹99</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">Starting Price</div>
            </div>
            <div className="text-center border-l border-r border-white/30">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-1">₹99</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">Visiting Charge</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500 mb-1">60 min</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-300">Quick Booking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;