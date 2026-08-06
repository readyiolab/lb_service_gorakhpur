import { ClipboardList, Calendar, UserCheck, CreditCard } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Choose Service",
    description: "Select the service you need from our wide range of options.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Select Date & Time",
    description: "Pick a convenient date and time slot that works for you.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Professional Visits",
    description: "Our verified technician arrives at your doorstep on time.",
  },
  {
    icon: CreditCard,
    step: "04",
    title: "Pay After Service",
    description: "Pay only after the service is completed to your satisfaction.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Booking a service with LB Services is quick and easy. 
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="text-center relative z-10">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center border-2 border-primary shadow-lg">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
